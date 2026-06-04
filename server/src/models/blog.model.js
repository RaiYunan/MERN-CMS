import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title:{ 
        type:String,
        required:true
    },
    subTitle:{
        type:String
    },
    description:{
        type:String
    }
}, { timestamps: true })

export const Blog = mongoose.model("Blog", blogSchema)