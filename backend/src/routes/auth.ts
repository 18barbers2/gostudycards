import { Router } from "express";
import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = Router();


// Register the user
router.post('/register', async (req, res) => {

    const { email, username, password } = req.body;

    // Validate data is all complete
    if ( !email || ! username || !password ){
        return res.status(400).json({ error: 'Please fill in required fields'})
    }
    
    // Look for any email, username already, if so then return a response
    try {
        const existing = await prisma.user.findFirst({ 
            where: { OR: [{email}, {username}] }
        });

        if(existing){
            return res.status(409).json({ error: 'Email/Username already exists'})
        };

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);


        // Create user
        const user = await prisma.user.create({ 
            data: {email, username, passwordHash}
        });

        // Sign the token so user doesnt need to login right after
        const token = jwt.sign(
            { userId: user.id, email: user.email},
            process.env.JWT_SECRET!,
            {expiresIn: '7d'}
        );
        
        res.status(201).json({token, userId: user.id, username: user.username})


    } catch (err) {
        res.status(500).json({ error: 'Registration Failed'});
    }

});

export default router;