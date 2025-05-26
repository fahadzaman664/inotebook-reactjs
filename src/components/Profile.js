import React, { useContext, useEffect } from 'react'

import NoteContext from '../context/notes/noteContext'


function Profile() {

    const context = useContext(NoteContext);
    const { getUser, user } = context;

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            getUser();
        }

    }, []);
    return (
        <div className="container ">

            <div className="d-flex ">
                <div className="d-flex flex-row justify-content-between align-items-center bg-dark text-white">
                    <h6 className="display-5">{user ? user.name : "Loading..."}</h6></div>
            </div>
        </div>

    )
}

export default Profile
