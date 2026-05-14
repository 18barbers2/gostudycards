import { Router } from 'express'
import prisma from '../lib/prisma.js'

const router = Router()

// GET review counts per day for the last 7 days for a user
router.get('/weekly', async (req, res) => {
    const { userId } = req.query

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const logs = await prisma.reviewLog.findMany({
        where: {
            userId: String(userId),
            reviewedAt: { gte: sevenDaysAgo },
        },
        select: { reviewedAt: true },
    })

    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        return d.toISOString().slice(0, 10)
    })

    const result = days.map(date => ({
        date,
        count: logs.filter(l => l.reviewedAt.toISOString().slice(0, 10) === date).length,
    }))

    res.json(result)
})

export default router
