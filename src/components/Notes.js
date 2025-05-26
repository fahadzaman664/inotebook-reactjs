import AddNotes from './AddNotes'

import NoteItem from './NoteItem';
import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const inputref = useRef('');
    const closeref = useRef('');
    const navigate = useNavigate();
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        const token = localStorage.getItem('token');
       console.log( "token", token );
        if (!token) {
            navigate('/login');
        } else {
            getNotes();
        }
    }, []);

    const updateNote = (currentNote) => {
        inputref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    }


    const handleClick = (e) => {
        closeref.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("updated successfully", "success");


    }


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });

    }

    return (
        <div>
            <AddNotes showAlert={props.showAlert} />
            <button ref={inputref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"> Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className=' container my-3 '>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" >Title</label>
                                    <input type="text" onChange={onChange} className="form-control" minLength={5} required value={note.etitle} id="etitle" name='etitle' />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <input type="text" onChange={onChange} className="form-control" value={note.edescription} name='edescription' minLength={5} required id="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" onChange={onChange} className="form-control" value={note.etag} name='etag' id="etag" minLength={5} required />
                                    <div className="modal-footer">
                                        <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button disabled={note.edescription.length < 5 || note.etitle.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'no notes to display'}
                </div>

                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })}

            </div>

        </div>
    )
}

export default Notes
