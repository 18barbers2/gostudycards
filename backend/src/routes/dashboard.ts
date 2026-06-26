import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

// Get all dashboard stats from the base dashboard endpoint
router.get('/', async (req, res) => {

    const userId = req.user?.userId;
    
    if(!userId){
        return res.status(400).json({ error: 'undefined'});
    }

    try {
        // Get total decks for this user
        const deckCount = await prisma.deck.count({
            where: { ownerId: String(userId) },
        });
    
        // Get total cards for this user
        const totalCards = await prisma.cardEntry.count({
            where: {
                deck: {
                    ownerId: userId
                }
            }
        })
    
        // Get due cards for this user
        const dueCards = await prisma.cardEntry.findMany({
            where: {
                deck: {
                    ownerId: userId
                },
                nextReviewAt: { lte: new Date() },
            }
        })
    
        // Calculate date from 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
        // Get reviewed in the last 7 days
        const reviewedLast7Days = await prisma.reviewLog.findMany({
            where: {
                userId: userId,
                reviewedAt: { gte: sevenDaysAgo }
            },
        })
    
        // Group data by days
        const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().slice(0, 10);
        });
    
        const weeklyActivity = days.map(date => ({
            date,
            count: reviewedLast7Days.filter(l => l.reviewedAt.toISOString().slice(0, 10) === date).length,
        }));
    
        const allCards = await prisma.cardEntry.findMany({
        where: {
            deck: { ownerId: userId }
        }
        })
    
        let learningCount = 0;
        let masteredCount = 0;
        let newCount = 0;
    
        for (const card of allCards){
            if (card.masteredAt){
                masteredCount += 1;
            }
            else if (card.reviewCount === 0) {
                newCount += 1;
            }
            else if (card.interval < 21){
                learningCount += 1;
            }
        }
    
        res.json({
            deckCount, 
            totalCards, 
            dueCount: dueCards.length, 
            weeklyActivity, 
            masteryDistribution: { new: newCount, learning: learningCount, mastered: masteredCount }
        })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats'});
    }

})
