import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNotes = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleClick = (e) => {
        e.preventDefault(); // stops the page from refreshing
      addNote(note.title ,note.description,note.tag);
      setNote({title:"", description:"", tag:""});//for emptying fields after adding note
     props.showAlert("note added successfully", "success");

    }



    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});

    }

    return (
        <div>
            <div className="container my-3">
                <h2> Add a note</h2>
            </div>
            <form className=' container my-3 '>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" >Title</label>
                    <input type="text" onChange={onChange} className="form-control" id="title" minLength={5} value={note.title} required name='title'/>
                    </div>
                   
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" onChange={onChange}  className="form-control" name='description' id="description " value={note.description} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" onChange={onChange} className="form-control" name='tag' id="tag" value={note.tag} minLength={5} required />
                </div>
                
                <button type="Add Note" disabled ={note.description.length <5 || note.title.length <5  } onClick={handleClick} className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default AddNotes
