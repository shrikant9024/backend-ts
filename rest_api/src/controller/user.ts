import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { createToken } from "../jwt";



export async function handleSignup(req:Request, res:Response) {
    const {email,firstname,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(409).send('user already registered')
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const result = await User.create({
        email,password:hashedPassword,firstname
    })

    return res.status(201).json({msg:"user registration successfull"});
    
}


export async function handleLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      
        const loginUser = await User.findOne({ email });
        if (!loginUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        const match = await bcrypt.compare(password, loginUser.password);
        if (!match) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const accessToken = createToken(loginUser);

 
        res.cookie("jwt", accessToken, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true, 
        });


        return res.status(200).json({
            msg: "Login successful",
            user: {
                email: loginUser.email,
           
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

