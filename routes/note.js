import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { allNotes, newNote,updateNote,deleteNote } from "../controllers/note.js";

const router = express.Router();

router.post("/new",isAuthenticated,newNote);

router.get("/all",isAuthenticated,allNotes);

router.route("/:id").put(isAuthenticated,updateNote).delete(isAuthenticated,deleteNote)


export default router