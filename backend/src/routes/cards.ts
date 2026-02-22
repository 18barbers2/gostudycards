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