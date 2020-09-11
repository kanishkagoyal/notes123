import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Note from './components/Note';
import NoteT from './components/NoteT';
import loginService from './services/login';
import loginTService from './services/loginT';
import notesTService from './services/notesT';
import noteService from './services/notes';
import './App.css';
import './index.css';

const Notification = ({ Message }) => {
  if (Message === null) {
    return null;
  }
  return <div className='successerror'>{Message}</div>;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [Message, setMessage] = useState(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);
  const handleUsername = event => {
    setUsername(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };
  const handleSelect = event => {
    setDesignation(event.value);
  };
  const handleLogout = async event => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem('loggedNoteappUser');
  };
  const handleLogin = async event => {
    event.preventDefault();
    if (designation === 'Student') {
      try {
        const user = await loginService.login({
          username,
          password
        });
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
        noteService.setToken(user.token);
        setUser(user);
      } catch (exception) {
        setMessage('Invalid username or password');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } else if (designation === 'Teacher') {
      try {
        const user = await loginTService.loginT({
          username,
          password
        });
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
        notesTService.setToken(user.token);
        setUser(user);
      } catch (exception) {
        setMessage('Invalid username or password');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } else {
      window.alert('Select a designation');
    }
  };
  if (user === null && designation === '') {
    return (
      <div>
        <Notification Message={Message} />
        <Login
          handleLogin={handleLogin}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleSelect={handleSelect}
        />
      </div>
    );
  }

  if (user && designation === 'Student') {
    return (
      <div>
        <p>{user.name} logged in </p>
        <Note user={user} />
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }
  if (user && designation === 'Teacher') {
    return (
      <div>
        <p>{user.name} logged in </p>
        <NoteT user={user} />
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }
  return <button onClick={handleLogout}>Log Out</button>;
};
export default App;
//
