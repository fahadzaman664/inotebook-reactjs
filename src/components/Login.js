import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'


const Login = (props) => {
    const context = useContext(NoteContext);
    const { getUser } = context;
    const host = "http://localhost:5000"

    const [credentials, setCredentails] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO api calls
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();

        if (json.success) // success is set in routes./auth inside response res
        {
            localStorage.setItem('token', json.authToken);
            await getUser();
            navigate('/');
            props.showAlert("loged in successfully", "success");

        }
        else {
            props.showAlert("invalid credentials")
        }
    }
    const onChange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value });

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" aria-describedby="emailHelp" name='email' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="Password" value={credentials.password
                    } className="form-control" onChange={onChange} name={'password'} id="Password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
