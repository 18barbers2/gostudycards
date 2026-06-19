import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export function requireAuth(req: Request, res: Response, next: NextFunction){

    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ error: "auth token does not exist" });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded as { userId: string; email: string };
        next();
    } catch (error) {
        res.status(401).json({ error: "could not verify signature"});
    }
}