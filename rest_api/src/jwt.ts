import {sign,verify} from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser'

const secret =  crypto.randomBytes(11).toString('hex');
interface User{
    email:string,
        firstname:string,
        password:string
}



export const createToken = (user:User)=>{
    const accessToken  = sign({
        email:user.email,
        firstname:user.firstname,
        password:user.password
    },secret)
    return accessToken

}


//middleware
 
// export interface authenticatedRequest extends Request{
//             authenticated:boolean
//         }

export const validateToken = (req:Request,res:Response,next:NextFunction)=>{
const vaccessToken = req.cookies.jwt;
if(!vaccessToken){
    return res.status(401).json({error:"user is not authenticated"})

}
try{
    const validToken =  verify(vaccessToken,secret);
    if(validToken) 
    return next();
}catch(error){
    return res.status(400).json({error:error});
}
}

