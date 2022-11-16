import { createContext, useContext, useState } from 'react'
import { NOTE_ADD, NOTE_UPDATE, NOTE_DELETE } from '../action_types/ACTION_TYPES';

const NoteContext = createContext();

const NoteReducer = (state, action) => {
  switch (action.type) {
    case NOTE_ADD:
      const localStorage_ = JSON.parse(localStorage.getItem('notes')) || [];
      if(localStorage_.length === 0){
        localStorage.setItem('notes', JSON.stringify([action.payload]))
        return {
          ...state,
          notes:JSON.parse(localStorage.getItem('notes')),
        }
      }
      else {
        const lastIdValue = JSON.parse(localStorage.getItem('notes'))[JSON.parse(localStorage.getItem('notes')).length - 1];
        const localStorageValues = [...JSON.parse(localStorage.getItem('notes')), {id:lastIdValue.id + 1,...action.payload}]
        localStorage.setItem('notes', JSON.stringify(localStorageValues))
        
        return {
          ...state,
          notes:JSON.parse(localStorage.getItem('notes')),
        }
      }
    
    case NOTE_UPDATE:
      const findNote = state.notes.find((note) => note.id === action.payload.id);
      const indexOf = state.notes.indexOf(findNote);
      state.notes.splice(indexOf,1, action.payload);

      localStorage.setItem('notes', JSON.stringify(state.notes));

      return {
        ...state,
        notes:JSON.parse(localStorage.getItem('notes')),
      }

    case NOTE_DELETE:
      const filteredNotes = state.notes.filter((note) => parseInt(note.id) !== parseInt(action.payload))
      localStorage.setItem('notes', JSON.stringify(filteredNotes));

      return {
        ...state,
        notes:JSON.parse(localStorage.getItem('notes')),
      }
    
    default:
      return {
        ...state,
      }
  }
}

const NoteProvider = ({ children }) => {
  const [notes, setNotes ] = useState({
    notes:JSON.parse(localStorage.getItem('notes')) || [],
    dispatch:action => {
      setNotes(notes => NoteReducer(notes, action))
    },
  });

  return (
    <NoteContext.Provider value={notes}>
        { children }
    </NoteContext.Provider>
  )
}

export const NoteContextUse = () => useContext(NoteContext);

export default NoteProvider;
