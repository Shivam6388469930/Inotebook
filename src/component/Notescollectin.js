import React, { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import NoteItem from './NoteItem';
import noteContext from '../context/noteContext';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const NotesCollection = () => {
  const navigate = useNavigate();
  const { notes, getNote, editNote } = useContext(noteContext);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    } else {
      navigate('/login');
    }
  }, [getNote, navigate]); // Added dependency array to avoid unnecessary re-renders

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1> {/* Meaningful modal title */}
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitleInput" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="etitleInput"
                  name="etitle"
                  value={note.etitle}
                  onChange={handleChange}
                  placeholder="Enter the title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescriptionInput" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="edescriptionInput"
                  rows="3"
                  name="edescription"
                  value={note.edescription}
                  onChange={handleChange}
                  placeholder="Enter the description"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="etagInput" className="form-label">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="etagInput"
                  name="etag"
                  value={note.etag}
                  onChange={handleChange}
                  placeholder="Enter the tag"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 3} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container ">
        <h1>Your Notes</h1>
      </div>
        <div className="container">
           {notes.length === 0 && 'No notes to display'}
        </div>
     
      <div className="container">  <div className="row" style={{justifyContent:"space-around"}}>
        {Array.isArray(notes) ? (
          notes.map((note) => (
            <div className="col-md-4" key={note._id}> {/* Correct placement of the key */}
              <NoteItem updateNote={updateNote} note={note} />
            </div>
          ))
        ) : (
          
              null
        
          
        )}</div>
    
      </div>
    </>
  );
};

export default NotesCollection;
