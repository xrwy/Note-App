import React, { useState } from 'react'
import { NoteContextUse } from '../../context/NoteProvider';
import './container.css';
import Note from '../Note/Note';
import { NOTE_ADD } from '../../action_types/ACTION_TYPES';

let form = {title:'',description:''}

const Container = () => {
    const [formValues, setFormValues] = useState(form);
    const [isVisible, setIsVisible] = useState(false);
    const [filterText, setFilterText] = useState('');
    const { notes, dispatch } = NoteContextUse();
    
    const getFormValues = (e) => {
        setFormValues({...formValues, [e.target.name]:e.target.value})
    }
    
    const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const date = new Date();
    let date_ = date.getDate() + ".".concat([weekDay[date.getDay()].slice(0,3), date.getFullYear()])
    
    const submitFormValues = (dispatch,e) => {
        e.preventDefault();
        if(formValues.title === '' || formValues.description === ''){
            return false;
        }
        if(notes.length === 0){
            let newFormValues = {type:NOTE_ADD,payload:{id:1,...formValues,date:date_.replace(/,/gi,'.'),dateOfUpdate:''}}
            dispatch(newFormValues);
            setFormValues(form);
        }else {
            let newFormValues = {type:NOTE_ADD,payload:{...formValues,date:date_.replace(/,/gi,'.'),dateOfUpdate:''}}
            dispatch(newFormValues);
            setFormValues(form);
        }
    }

    const filteredNotes = notes.filter((note) => {
        return Object.keys(note).some((key) => {
            return note[key].toString().toLowerCase().includes(filterText.toLocaleLowerCase())
        })
    })

  return (
    <>
    <div className='filter-box'>
        <div><input type="text" onChange={(e) => setFilterText(filterText => e.target.value)} placeholder="Filter Text.." /></div>
    </div>
        <div className='container'>
            <div className='sub-container'>
                <div className='note'>
                    <div className='new-note-add'>
                        <button className='plus-icon' onClick={() => setIsVisible(isVisible => !isVisible)}>
                        <i className='fas fa-plus'></i>
                        </button>
                        <p className='text'>
                            Add New Note
                        </p>
                    </div>
                    {
                        isVisible ?
                        <div className='new-note-add-box'>
                            <div className='form-box'>
                                <div className='header'>
                                    <div className='title-box'>
                                        <h5>Add a new note</h5>
                                    </div>
                                    <div className='close-icon' onClick={() => setIsVisible(isVisible => !isVisible)}>
                                        <i className='fas fa-times'></i>
                                    </div>
                                </div>
                                <div className='form-area'>
                                    <form onSubmit={(e) => submitFormValues(dispatch,e)}>
                                        <div className='input-group'>
                                            <label htmlFor='title'>
                                                <h5>Title</h5>
                                                <input onChange={(e) => getFormValues(e)} value={formValues.title} type="text" name='title' id='title' required={true}/>
                                            </label>
                                        </div>
                                        <div className='input-group'>
                                            <label htmlFor='description'>
                                                <h5>Description</h5>
                                                <textarea onChange={(e) => getFormValues(e)} value={formValues.description} name='description' rows={"6"} cols="10" required={true}></textarea>
                                            </label>
                                        </div>
                                        <div className='add-note-btn'>
                                            <button type='submit'>
                                                Add Note
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>:
                        null
                    }
                    
                    {
                        filteredNotes.map((item, index) => {
                            return (
                                <Note 
                                key={item.id} 
                                id={item.id} 
                                title={item.title} 
                                content={item.description}
                                date={item.date}
                                dateOfUpdate={item.dateOfUpdate}
                                />
                            )
                        })
                    }

                </div>
            </div>
        </div>
    </>
  )
}

export default Container;
