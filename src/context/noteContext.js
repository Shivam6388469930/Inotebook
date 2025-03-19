import { createContext } from 'react';

const noteContext = createContext({
  notes: [], 
  getNote: () => {},
  addNote: () => {},
  deleteNote: () => {},
  editNote: () => {}
});

export default noteContext;
