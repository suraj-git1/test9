import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"

const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(email)
}

const userSchema = new Schema({
    sn:{
        type:Number
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        index:true,
        vaildate:{
            validator: validateEmail,
            message: "please enter correct email id"
        }
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:String,
        trim:true,
        enum:['active', 'pause', 'rejected'],
        default:'active'
    }
},{timestamps:true})

userSchema.pre('save', async function(next){
    const checkEmail = await model('User').countDocuments({email:this.email})
    if(checkEmail)
        throw next(new Error("user already Exit!"))
    next()
})

userSchema.pre('save', async function(next){
    const encryptedPassword = await bcrypt.hash(this.password, 12)
    // console.log(encryptedPassword)
    this.password = encryptedPassword
    next()
})

userSchema.pre('save', async function(next){
    let sn = 0
    const user = await model('User').find().sort({sn:1}).limit(1)
    console.log(user+"njfnnfrnfrn")
})

const UserSchema = model('User', userSchema)
export default UserSchema