import ErrorHandler, { catchAsyncError } from "../middlewares/error.js";
import { Note } from "../models/note.js";

export const newNote = catchAsyncError(async (req,res)=>{
    const {title,content,color} = req.body;

    await Note.create({
        title,
        content,
        color,
        createdBy:req.user
    });

    res.status(201).json({
        success:true,
        message:"Note added successfully"
    });

});

export const allNotes = catchAsyncError(async (req,res)=>{
    const user = req.user;
    const notes = await Note.find({createdBy:user._id})

    res.status(200).json({
        success:true,
        notes
    });

});

export const updateNote = catchAsyncError( async (req,res)=>{

    const {id} = req.params;
    const note = await Note.findById(id);

    if(!note) return next(new ErrorHandler("Note not found",404));

    const {title,content,color} = req.body;

    note.title = title
    note.content = content
    note.color = color
    
    await note.save();

    res.status(200).json({
        success:true,
        message:"Note Updated Successfully"
    });

});

export const deleteNote = catchAsyncError(async (req,res)=>{

    const {id} = req.params;
    const note = await Note.findById(id);

    if(!note) return next(new ErrorHandler("Note not found",404));

    await note.deleteOne()

    res.status(200).json({
        success:true,
        message:"Note Deleted Successfully"
    });

});