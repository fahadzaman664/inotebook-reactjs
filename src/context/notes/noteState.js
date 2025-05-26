import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState([]);
    // getnote method
    const getNotes = async () => {

        // Api call
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const json = await response.json();

        if (Array.isArray(json)) {
            setNotes(json);
        } else {
            console.error("Expected an array but got:", json);
            setNotes([]); // fallback to empty array to avoid breaking the UI
        }
        // const json = await response.json();
        // console.log("Fetched notes:", json); // Add this line

        // setNotes(json);
    }

    // add notes , todo api calls
    const addNote = async (title, description, tag) => {

        // Api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        // todo notes mean adding note
        setNotes(notes.concat(note));

    }

    // deletes notes
    const deleteNotes = async (id) => {
        // TODO api calls
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const json = await response.json();

        const newNotes = notes.filter((json) => {
            return json._id !== id;
        })
        setNotes(newNotes);
    }

    // edit notes
    const editNote = async (id, title, description, tag) => {
        // Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];

            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
            }

            setNotes(newNotes);
        }

    }

    // getuser method
    const getUser = async () => {

        // Api call
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const data = await response.json();
        setUser(data); // data should be { name: "...", email: "...", _id: "..." }

    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNotes, getNotes, editNote, getUser, user, setUser }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;