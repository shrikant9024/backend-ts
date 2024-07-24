import express from 'express'
import router from './routes/user';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
const app = express();
const PORT=  8000

mongoose.connect("mongodb://127.0.0.1:27017/user-ts").then(()=>console.log('mongodb connected')).catch(err=>console.log('Mongo error',err))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(cookieParser())

app.use("/",router)








app.listen(PORT, ()=>console.log(`Server is started at PORT: ${PORT}`))



