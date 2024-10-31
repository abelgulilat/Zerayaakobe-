

import db from "../config/config.js"
import app from "../app.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config({path:"./config/config.env"})

const display = async (req,res) =>{

        try {
            const [data] = await db.query("select * from users ")
            return res.json({data})
        } catch (error) {
            return res.json({msg:"something went wrongss"})
            
        }

}


const userregister = async (req,res) =>{
    const {username, email, firstname, lastname, password } = req.body;
    console.log("check")
// ---------------------------------------------------------------------------------------------------
if(!username||!email||!firstname||!lastname||!password)
    return res.status(201).json({msg:"It cannot be a blank fields."})
// ---------------------------------------------------------------------------------------------------
if(password.length<8)
    return res.status(201).json({msg:"The password cannot be less than 8."})
// ---------------------------------------------------------------------------------------------------


const [user] = await db.query("select username, email from users where username = ? or email = ?",[username, email])

if(user.length>0)
    return res.status(201).json({msg:"There's the same username or email.",user: user })
// ---------------------------------------------------------------------------------------------------

const salt = await bcrypt.genSalt(10);
const hashpass = await bcrypt.hash(password,salt);
// ---------------------------------------------------------------------------------------------------

try{
    await db.query("insert into users (username,firstname,lastname,email,password) values (?,?,?,?,?)" ,[username,firstname,lastname,email,hashpass])
    return res.status(200).json({ msg: "user registred successfully`````````" });

}catch(err){
    return res.json({msg:"something went wrong, try again"});
}
}


const login = async (req,res)=>{
    const {Email,Password} = req.body

    if( !Email||! Password)
        return res.status(201).json({msg:"Fill the blank,please"})
// =====================================================================================================

    try {
        const [data] = await db.query("select Password,Userid from users where Email = ?",[Email])
        if(data.length == 0)
            return res.status(201).json({msg:"Password or Email incorrect"})

    const issame = await bcrypt.compare(Password,data[0].Password)
    if(!issame)
        return res.status(201).json({msg:"Password or Email incorrect"})
    
    const Userid = data[0].Userid


    const token = await jwt.sign({Userid,Email},process.env.KEY,{expiresIn:"1h"})
        return res.status(200).json({msg:"Login",token,Userid,Email})
    } catch (error) {
        return res.json({msg:"something went wrong"})
        
    }
    
}


export {display,register,login}