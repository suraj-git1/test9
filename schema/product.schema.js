import { Schema, model } from "mongoose";

const prodSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const ProdSchema = model('Product', prodSchema)
export default ProdSchema