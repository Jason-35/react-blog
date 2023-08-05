import { User } from "../entities/User"
import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

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
            req.session.authenticated = true
            req.session.username = username
            res.status(200).json({status: 200, valid: true, session: req.session})
        }else{
            res.status(401).json({error: "invalid", status: 401, valid: false})
        }
    }else{
        res.status(401).json({error: "invalid", status: 401, valid: false})
    }
}


export const test = async(req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body
    if(username && password){
        if(password == "123"){
            req.session.authenticated = true
            req.session.username = username
            res.json(req.session)
        }
        else{
            res.status(401).json({msg: "bad credentials"})
        }
    }
    res.status(200)
}



