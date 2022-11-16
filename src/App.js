import './App.css';
import React from 'react'
import NoteProvider from './context/NoteProvider';
import Container from './components/Container/Container';

const App = () => {
  return (
    <NoteProvider>
      <Container />
    </NoteProvider>
  )
}

export default App;
