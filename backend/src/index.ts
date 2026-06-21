import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import deckRoutes from './routes/decks.js'
import cardRoutes from './routes/cards.js'
import templateRoutes from './routes/templates.js'
import reviewLogRoutes from './routes/review-logs.js'
import authRoutes from './routes/auth.js'
import { requireAuth } from './middleware/auth.js'
import rateLimit from 'express-rate-limit'

const app = express()
app.set('trust proxy', 1)

const allowedOrigins = [
    'https://gostudycards.com',
    'https://www.gostudycards.com',
    'https://gostudycards.vercel.app',
    'http://localhost:5173'
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}))

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 10 : 100, 
  message: { error: 'Too many attempts, please try again later' }
});

app.use(express.json())
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/decks', requireAuth, deckRoutes)
app.use('/api/cards', requireAuth, cardRoutes)
app.use('/api/templates', requireAuth, templateRoutes)
app.use('/api/review-logs', requireAuth, reviewLogRoutes)

// Health check route — confirms server is running
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));