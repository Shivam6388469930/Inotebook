import React, { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
  const host = 'http://localhost:4000';
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  // Fetch all notes
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnote`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a new note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNote = await response.json(); // Await the response and get the new note

    setNotes([...notes, newNote]); // Add the new note to the state
  };

  // Delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    // Remove the deleted note from the state
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const updatedNote = await response.json(); // Get updated note

    // Update the state with the edited note
    const newNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
