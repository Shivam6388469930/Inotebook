import React, { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/noteContext';
import Alert from './Alert';

const Addnote = () => {
  const { addNote } = useContext(noteContext);
  const [mess,setMess]=useState("Welcome to Add Note page")

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = () => {
    setMess("Add a note successfully")
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" }); 
    setTimeout(()=>{
      setMess("Welcome to Add NOTE PAGE")
    },1000)
    // Clear form after submission
  };

  const handleChange = (e) => {
    
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
   <Alert alert={mess} />
    <div className="container">
      <h1>Add Notes</h1>
      <form >
      <div className="mb-3">
        <label htmlFor="titleInput" className="form-label">TITLE</label>
        <input
          type="text"
          className="form-control"
          id="titleInput"
          placeholder="Please enter the text"
          name="title"
          value={note.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descriptionInput" className="form-label">DESCRIPTION</label>
        <textarea
          className="form-control"
          id="descriptionInput"
          rows="3"
          placeholder="Write your description"
          name="description"
          value={note.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-3 ">
        <label htmlFor="tagInput" className="form-label">TAG</label>
        <input
          type="text"
          className="form-control"
          id="tagInput"
          placeholder="Please enter the tag"
          name="tag"
          value={note.tag}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <button type="button" disabled={note.title.length<5||note.description.length<5||note.tag.length<3} className="btn btn-primary" onClick={handleClick}>ADD</button>
      </div>
      </form>
    </div>
    
    </>
  );
};

export default Addnote;


