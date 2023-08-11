import { User } from "../entities/User"
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

/**
 * Encrypting the user's password
 * @param password inputted password
 * @returns the hashed password as a promise
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
        password: hashedPassword,
        session: req.sessionID
    })

    try {
        await User.insert(user)
        // create cookie and session id and save it to the db
        req.session.authenticated = true
        req.session.username = username
        res.status(200).send(req.session)
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
            user.session = req.sessionID
    
            await User.save({
                ...user,
            })
            
            res.status(200).send(req.session)
        }else{
            res.status(401).json({error: "invalid", status: 401, valid: false})
        }
    }else{
        res.status(401).json({error: "invalid", status: 401, valid: false})
    }
}

/**
 * Logout user by removing session from database
 * @param req request
 * @param res response
 */
export const logout = async(req: Request, res:Response) => {
    const user = await User.findOne({
        where: { 
            session: req.sessionID
        }
    })

    user.session = null
    req.session.authenticated = false
    req.session.username = null

    await User.save({
        ...user,
    })

    res.status(200).send({user: user, req: req.session})
}



