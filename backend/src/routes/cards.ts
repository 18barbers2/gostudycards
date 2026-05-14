import { Router } from 'express'
import prisma from '../lib/prisma.js'


const router = Router();

// GET count of cards in a deck that have non-empty data for a specific field.
// Much cheaper than fetching all cards just to count field usage.
router.get('/field-count', async (req, res) => {
    const { deckId, fieldName } = req.query
    const result = await prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(*) as count
        FROM "CardEntry"
        WHERE "deckId" = ${String(deckId)}
          AND TRIM(data->>${String(fieldName)}) != ''
    `
    res.json({ count: Number(result[0].count) })
})

// GET cards due for review in a deck (nextReviewAt <= now)
router.get('/due', async (req, res) => {
    const { deckId } = req.query
    const cards = await prisma.cardEntry.findMany({
        where: {
            deckId: String(deckId),
            nextReviewAt: { lte: new Date() },
        },
    })
    res.json(cards)
})

// GET all cards for a deck
router.get('/', async (req, res) => {
    const { deckId } = req.query
    const cards = await prisma.cardEntry.findMany({
        where: { deckId: String(deckId)}
    })
    res.json(cards)
})

// POST create a new card
router.post('/', async (req, res) => {
    const { templateId, deckId, data } = req.body
    const card = await prisma.cardEntry.create({
        data: { templateId, deckId, data }
    })
    res.json(card)
})

// DELETE a single card by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.cardEntry.delete({ where: { id } });
    res.status(204).send();
});

// PATCH rename a field key in the data JSON of every card in a deck.
// Removes the old key and inserts a new one with the same value in a single query.
router.patch('/rename-field', async (req, res) => {
    const { deckId, oldName, newName } = req.body
    const result = await prisma.$executeRaw`
        UPDATE "CardEntry"
        SET data = (data - ${oldName}::text)
                   || jsonb_build_object(${newName}::text, data->>${oldName}::text)
        WHERE "deckId" = ${deckId}
          AND data ? ${oldName}::text
    `
    res.json({ updatedCount: result })
})

// PATCH remove a field key from the data JSON of every card in a deck.
// Uses PostgreSQL's JSONB `-` operator to delete the key in a single query.
router.patch('/remove-field', async (req, res) => {
    const { deckId, fieldName } = req.body
    const result = await prisma.$executeRaw`
        UPDATE "CardEntry"
        SET data = data - ${fieldName}::text
        WHERE "deckId" = ${deckId}
    `
    res.json({ updatedCount: result })
})

// PATCH update a card's SRS fields after a review and write a ReviewLog entry
router.patch('/:id/review', async (req, res) => {
    const { id } = req.params
    const { rating, userId, deckId } = req.body

    const card = await prisma.cardEntry.findUnique({ where: { id } })
    if (!card) return res.status(404).json({ error: 'Card not found' })

    const previousInterval = card.interval
    let { interval, easeFactor, reviewCount } = card

    switch (rating) {
        case 'retry':
            interval = 1
            easeFactor = Math.max(1.3, easeFactor - 0.2)
            break
        case 'hard':
            interval = Math.max(1, Math.round(interval * 1.2))
            easeFactor = Math.max(1.3, easeFactor - 0.15)
            break
        case 'medium':
            interval = Math.round(interval * easeFactor)
            break
        case 'easy':
            interval = Math.round(interval * easeFactor * 1.3)
            easeFactor = Math.min(4.0, easeFactor + 0.1)
            break
        default:
            return res.status(400).json({ error: 'Invalid rating' })
    }

    interval = Math.max(1, interval)
    reviewCount += 1

    const nextReviewAt = new Date()
    nextReviewAt.setDate(nextReviewAt.getDate() + interval)

    const MASTERY_THRESHOLD = 21
    const masteredAt = !card.masteredAt && interval >= MASTERY_THRESHOLD ? new Date() : card.masteredAt

    const [updatedCard] = await prisma.$transaction([
        prisma.cardEntry.update({
            where: { id },
            data: { interval, easeFactor, reviewCount, nextReviewAt, masteredAt },
        }),
        prisma.reviewLog.create({
            data: {
                cardId: id,
                deckId: String(deckId),
                userId: String(userId),
                rating,
                previousInterval,
                newInterval: interval,
            },
        }),
    ])

    res.json(updatedCard)
})

export default router