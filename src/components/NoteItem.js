import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNotes } = context;
    const { note, updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className='d-flex align-items-center '>
                        <h5 className="card-title "> {note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => {
                            deleteNotes(note._id);
                            props.showAlert("deleted successfully", "success");

                        }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                            updateNote(note);
                        }}></i>
                    </div>
                    <p className="card-text"> {note.description}</p>
                    <div className="mb-3">
                        <p className="card-text"> {note.tag}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
