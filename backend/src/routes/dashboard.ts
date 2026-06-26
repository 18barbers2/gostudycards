import { Router } from "express";
import prisma from "../lib/prisma.js";



const router = Router();


// Get all dashboard stats from the base dashboard endpoint
router.get('/', async (req, res) => {

    const userId = req.user?.userId;

    if(!userId){
        return res.status(400).json({ error: 'undefined'});
    }

    const deckCount = await prisma.deck.count({
        where: { ownerId: String(userId) },
    });

    const totalCards = await prisma.cardEntry.count({
        where: {
            deck: {
                ownerId: userId
            }
        }
    })

})
