import Home from './components/Home';
import About from './components/About';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useState } from 'react';
import Profile from './components/Profile';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />        
            <div className='container'>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About  />} />

              <Route  path="/login" element={<Login showAlert={showAlert} />} />
              <Route  path="/signup" element={<SignUp showAlert={showAlert} />} />


            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
