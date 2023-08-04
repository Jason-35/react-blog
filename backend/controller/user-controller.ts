import { User } from "../entities/User"
import { Request, Response } from 'express';

const bcrypt = require('bcrypt');

const hashing = async(password: string): Promise<string> => {
    const saltRounds: number = 10
    try {
        const hashedPassword: string = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        throw new Error("error hashing password")
    }
}

export const register = async(req: Request, res: Response): Promise<void> => {
    const { username, password } : { username: string, password: string } = req.body
    const hashedPassword: string = await hashing(password)
    
    const user: User = User.create({
        username: username,
        password: hashedPassword
    })

    try {
        await user.save()
        res.status(200).json({ success: "registered user"})
    } catch (error) {
        res.status(409).json({ error: "duplicate username"})
    }
}
