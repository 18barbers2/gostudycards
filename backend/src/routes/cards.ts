import { Router } from 'express'
import prisma from '../lib/prisma.js'


const router = Router();

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

export default router