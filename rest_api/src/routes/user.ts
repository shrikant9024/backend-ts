import express, { Request, Response } from 'express'
import {handleLogin,handleSignup } from '../controller/user'
import { validateToken } from '../jwt'

const router = express.Router()



router.get("/",(req:Request,res:Response)=>{
    res.send("server")
})

router.get('/login',validateToken,(req:Request,res:Response)=>{
    res.send('login')
})

router.post("/signup",handleSignup)
router.post("/login",handleLogin)


export default router