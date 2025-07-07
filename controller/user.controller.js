import bcrypt from "bcrypt"
import UserSchema from "../schema/user.schema.js"

export const signup = async (req, res) => {
    try{
    // console.log(req.query)
    const user = new UserSchema(req.query)
    // console.log(user)
    await user.save()
    res.status(200).json(user)
    }
    catch(err){
        res.status(424).json({
            message:err.message
        })
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.query
        const checkUser = await UserSchema.findOne({email:email})
        // console.log(checkUser)
        if(!checkUser)
            return res.status(404).json({
                message:"User not found"
        })
        const checkPass = await bcrypt.compare(password, checkUser.password)
        if(!checkPass)
            return res.status(401).json({
                message:"Incorrect password"
        })
        res.status(200).json({
            message:"login success"
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}