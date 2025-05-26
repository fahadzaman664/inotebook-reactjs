import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'


const SignUp = (props) => {
    const context = useContext(NoteContext);
    const { getUser } = context;
    const host = "http://localhost:5000"

    const [credentials, setCredentails] = useState({ name: '', email: '', password: '', cpassword: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        // TODO api calls
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })

        });
        const json = await response.json();
        if (json.success) // success is set in routes./auth inside response res
        {
            localStorage.setItem('token', json.authtoken);
            await getUser();
            navigate('/');
            props.showAlert("account created successfully", "success");
        }
        else {
            props.showAlert("invalid details", "danger")
        }

    }
    const onChange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value });

    }



    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"> Name</label>
                    <input type="text" className="form-control" required
                        minLength={3} id="name" aria-describedby="emailHelp" onChange={onChange} name='name' />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp" name='email' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="Password"
                        className="form-control" minLength={5} required name='password' onChange={onChange} id="Password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">Confirm password</label>
                    <input type="Password"
                        className="form-control" name='cpassword' onChange={onChange} id="cPassword" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default SignUp
