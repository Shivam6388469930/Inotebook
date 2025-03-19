import React, { useContext } from 'react';
import noteContext from '../context/noteContext';
import './style.css';

const NoteItem = (props) => {
  const color='#FC8EAC'
  const { deleteNote } = useContext(noteContext);
  const { note, updateNote } = props;

  return (
    <>
    <div className="container">
      <div className="card my-3" style={{width:"18rem"}}>
        <div className="card-body">
          

            <h5 className="card-title ">{ note.title }</h5>
            <p className="card-text ">{ note.description }</p>
            <p className={`card-tag  card-tag-${color}`}>{ `TAG-${note.tag}` }</p>
            <i className="fa fa-trash me-3" aria-hidden="true" onClick={ () => deleteNote(note._id) }></i>
            <i className="fa fa-pencil" aria-hidden="true" onClick={ () => updateNote(note) }></i>
          </div>
        </div>
        </div>
      
    </>
  );
};

export default NoteItem;
