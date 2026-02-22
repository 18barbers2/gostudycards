import { Router } from 'express'
import prisma from '../lib/prisma.js'


const router = Router()

// Get all decks for a user
router.get('/', async (req, res) => {

    const { userId } = req.query;
    const decks = await prisma.deck.findMany({
        where: { ownerId: String(userId) },
        include: { _count: { select: { cards: true } } }
    });
    res.json(decks);
}) 

// POST create a new deck
router.post('/', async (req, res) => {
    const { name, description, ownerId } = req.body;
    const deck = await prisma.deck.create({
        data: { name, description, ownerId }
    });
    res.json(deck);
});

export default router