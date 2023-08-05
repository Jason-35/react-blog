import { User } from "../entities/User"
import { Request, Response } from 'express';
import { DataSource } from "typeorm"
import { getRepository } from 'typeorm';

const bcrypt = require('bcrypt');

/**
 * Encrypting the user's password
 * @param password inputted password
 * @returns 
 */
const hashing = async(password: string): Promise<string> => {
    const saltRounds: number = 10
    try {
        const hashedPassword: string = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        throw new Error("error hashing password")
    }
}

/**
 * Validating user's register input and storing it in the database
 * @param req requesting body
 * @param res responding body
 */
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
        res.status(409).json({ error: "duplicate", status: 409, dup: true})
    }
}

/**
 * Validates user's login credentials
 * @param req requesting body
 * @param res response body
 */
export const login = async(req: Request, res: Response): Promise<void> => {
    const { username, password } : { username: string, password: string } = req.body

    const user = await User.findOne({
        where: {
            username: username
        }
    })
    if(user){
        const comparePassword = await bcrypt.compare(password, user.password)
    
        if(comparePassword){
            res.status(200).json({status: 200, valid: true})
        }else{
            res.status(401).json({error: "invalid", status: 401, valid: false})
        }
    }else{
        res.status(401).json({error: "invalid", status: 401, valid: false})
    }
}
