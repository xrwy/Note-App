import React, { useState } from 'react'
import { NOTE_DELETE, NOTE_UPDATE } from '../../action_types/ACTION_TYPES';
import { NoteContextUse } from '../../context/NoteProvider';

let form = {title:'',description:''};

const Note = ({ id, title, content, date, dateOfUpdate}) => {
    const [actionShow, setActionShow] = useState(false);
    const [isUpdateBoxShow, setIsUpdateBoxShow] = useState(false);
    const [formValues, setFormValues] = useState(form);
    const { dispatch } = NoteContextUse();

    const getFormValues = (e) => {
        setFormValues({...formValues, [e.target.name]:e.target.value})
    }

    const deleteNote = (dispatch) => {
        dispatch({type:NOTE_DELETE, payload:id});
    }

    const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dateObj = new Date();
    let date_ = dateObj.getDate() + ".".concat([weekDay[dateObj.getDay()].slice(0,3), dateObj.getFullYear()])
    
    const submitFormValues = (dispatch,e) => {
        e.preventDefault();
        if(formValues.title === '' || formValues.description === ''){
            return false;
        }
        dispatch({type:NOTE_UPDATE,payload:{id:id,...formValues,date:date_.replace(/,/gi,'.'),dateOfUpdate:date_.replace(/,/gi,'.')}});
        setFormValues(form);
    }

    const day = date.split('.')[0];
    const dayName = date.split('.')[1];
    const year = date.split('.')[2];

    return (
        <>
            <div className='note-box'>
                <h1 className='note-title'>{title}</h1>
                <p className='note-self'>{content}</p>
                <hr />
                <div className='time-note-edit-del'>
                    <div className='time-box'>
                        {
                            dateOfUpdate === '' ? <p className='time-text'>{day} {dayName} {year}</p> : 
                            <p className='time-text'>Updated on {day} {dayName} {year}</p> 
                        }
                    </div>
                    <div className='three-dot' onClick={() => setActionShow(actionShow => !actionShow)}>
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                    {
                        actionShow ?
                        <div className='actions' id={`${id}`}>
                            <button onClick={() => {
                                setIsUpdateBoxShow(isUpdateBoxShow => !isUpdateBoxShow);
                                setActionShow(actionShow => !actionShow)
                            }}>
                                <i className="fa fa-edit"></i>Edit</button>
                            <button onClick={() => deleteNote(dispatch)}>
                                <i className="fa fa-trash-o"></i>Delete
                            </button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            {
                isUpdateBoxShow ?
                    <div className='new-note-add-box'>
                        <div className='form-box'>
                            <div className='header'>
                                <div className='title-box'>
                                    <h5>Update Note</h5>
                                </div>
                                <div className='close-icon' onClick={() => setIsUpdateBoxShow(isUpdateBoxShow => !isUpdateBoxShow)}>
                                    <i className='fas fa-times'></i>
                                </div>
                            </div>
                            <div className='form-area'>
                                <form onSubmit={(e) => submitFormValues(dispatch, e)}>
                                    <div className='input-group'>
                                        <label htmlFor='title'>
                                            <h5>Title</h5>
                                            <input onChange={(e) => getFormValues(e)} value={formValues.title} type="text" id='title' name='title' required={true}/>
                                        </label>
                                    </div>
                                    <div className='input-group'>
                                        <label htmlFor='description'>
                                            <h5>Description</h5>
                                            <textarea onChange={(e) => getFormValues(e)} value={formValues.description} rows={"6"} cols="10" name='description' required={true}></textarea>
                                        </label>
                                    </div>
                                    <div className='add-note-btn'>
                                        <button type='submit'>
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>:
                null
            }
        </>
    )
}

export default Note;
