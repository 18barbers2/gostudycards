import { Router } from "express";
import prisma from '../lib/prisma.js'

const router = Router();


// Register the user
router.post('/register', async (req, res) => {
    res.send('POST request to the homepage');
});

export default router;