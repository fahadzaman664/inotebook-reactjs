const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route:1 get all the notes uaing : GET "/api/auth/fetchnotes",  login required, 
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }

})

//Route:2 add notes using : Post "/api/auth/addnote",  login required, 
router.post('/addnote', fetchuser, [
    body('title', 'title must be atleast three character').isLength({ min: 3 }),
    body('description', ' description must be atleast Five character').isLength({ min: 5 })

], async (req, res) => {
    try {
        // if there are errors, return bad request and the errors and create notes and save in database which is inotebook mention in db.js
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        const note = new Note({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
})



//Route:3 update an existing note using : Put "/api/auth/updatenote",  login required, 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   try{
    const { title, description, tag } = req.body;
    // create a new note object
    const newnote = {};
    // if title, decription tag is coming from req.body mean user want to update then update it
    if (title) {
        newnote.title = title;
    }
    if (description) {
        newnote.description = description;
    }
    if (tag) {
        newnote.tag = tag;
    }

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id); // here it check that the note is already present for to update ir against id which is coming

    if (!note.user) {
        if (!note) {
            return res.status(404).send("Not Found");
        }

        return res.status(400).send("Note has no user associated");
    }
    // here check that the user id and the coming id is same or not , if not mean no same user then nota allowed for updation(user which is login will send updation request , this for security purpose)
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
    res.json(note);
}
 catch (error) {
        res.status(500).send("Internal Server Error");
    }

});

//Route:4 delete an existing note using : delete "/api/auth/deletenote", login required, 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // create a new note object

    try {
        // find the note to be deleted and delete it
        let note = await Note.findById(req.params.id); // here it check that the note is already present for to delete against id which is coming
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (!note.user) {
            return res.status(400).send("Note has no user associated");
        }
        // here check that the user id and the coming id is same or not , if not mean no same user then not  allowed for deletion(user which is login will send deletion request , this for security purpose)
        // and allow deletion only if user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ Success: "Note has been deleted", note: note });
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;