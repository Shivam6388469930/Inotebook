import React from 'react'
import NoteState from '../context/NoteState';
import NotesCollection from './Notescollectin';



const Home = () => {

  return (

      <div className='bg-dark text-white'>
       
      <NoteState>
        <NotesCollection />
      </NoteState>

      </div>



  )
}

export default Home
