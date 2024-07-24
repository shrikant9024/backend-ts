import mongoose, { Schema } from "mongoose";


interface User{
    firstname:string;
    lastname:String;
    email:String,
    password:String,
}

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},
    {timestamps:true}
)

const User = mongoose.model("User",userSchema)

export default User
