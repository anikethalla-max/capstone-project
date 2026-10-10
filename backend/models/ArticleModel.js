import mongoose from 'mongoose'


const userCommentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    strict:"throw"
})

const articleSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    comments:[userCommentSchema],
    isArticleActive:{
        type:Boolean,
        default:true
    }
},{ timestamps: true })

export const Article=mongoose.model("Article",articleSchema)
