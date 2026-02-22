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

export default router