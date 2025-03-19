const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Route-1: Get all notes for a user
router.get('/fetchallnote', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        res.status(500).json({ error: 'Internal server error' });
    }
});
// routes-2 add a notes using post "api/notes/addnotes"
router.post('/addnotes', fetchuser,[ 
    body('title',"enter validate email").isLength({min:4}),
    body('description',"enter validate name").isLength({min:5}),
  
], async(req, res) => {
    try{
    const{title,description,tag}=req.body
    const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})

        }
        const note=new Notes({title,description,tag,user:req.user.id})
        const savenote=await note.save()
    // try {
        // Fetch all notes for the user
       

        // Send the fetched notes as a JSON response
        res.json(savenote);
    }
    catch{
        res.status(500).json({ error: 'Internal server error' });
    }
})
// routes-2 add a notes using put "api/notes/updatenotes"
router.put('/updatenotes/:id', fetchuser, async(req, res) => {
    const{title,description,tag}=req.body
    try {
        
   
    // create a new note
    newnote={}
    if(title){newnote.title=title}
    if(description){newnote.description=description}
    if(tag){newnote.tag=tag}
    // find note by id
    let note= await Notes.findById(req.params.id)
    if(!note){
        res.status(404).json({ error: 'not found' });
    }
    if (note.user.toString()!==(req.user.id) ){

        res.status(401).json({ error: 'not valid user' });
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.send(note)
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}

})
// delete note using delete
router.delete('/deletenotes/:id', fetchuser, async(req, res) => {
    const{title,description,tag}=req.body
    try {
        
   
    // create a new note
    newnote={}
    if(title){newnote.title=title}
    if(description){newnote.description=description}
    if(tag){newnote.tag=tag}
    // find note by id
    let note= await Notes.findById(req.params.id)
    if(!note){
        res.status(404).json({ error: 'not found' });
    }
    if (note.user.toString()!==(req.user.id) ){

        res.status(401).json({ error: 'not valid user' });
    }
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"sucess":"note delete",note:note})
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
})


module.exports = router;