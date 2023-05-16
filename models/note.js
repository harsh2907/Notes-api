import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    isCompleted: {
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

export const Note = mongoose.model("Note", noteSchema)