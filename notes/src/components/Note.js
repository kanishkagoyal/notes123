import React, { useState, useEffect } from 'react';
import noteService from '../services/notes';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div>{message}</div>;
};
const SingleNote = ({ note, user, setMessage }) => {
  const [content, setContent] = useState('');
  const handleContent = event => {
    setContent(event.target.value);
  };
  const handleDelete = async event => {
    event.preventDefault();
    const response = await noteService.remove(note.id);
    if (response) {
      setMessage('Note deleted successfully');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const addNote = event => {
    event.preventDefault();
    const newObject = {
      content,
      last_update_by: user.user.username,
      user: note.user,
      id: note.id
    };
    handleUpdate(newObject);
  };
  const handleUpdate = async newObject => {
    const response = await noteService.update(newObject);
    if (response) {
      setMessage('Note updated successfully');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const handleVisibility = event => {
    event.preventDefault();
    document.getElementById('editInput').style.visibility = 'visible';
  };
  return (
    <div>
      <p>
        <b>* {note.content}</b>
      </p>
      <p>
        <b>Last Update By</b> - {note.last_update_by}
      </p>
      <p>
        <b>Last Update Time</b> - {note.last_update_time}
      </p>
      <div>
        <button onClick={handleDelete}>Delete Note</button>
        <button onClick={handleVisibility}>Edit Note</button>
        <form
          id='editInput'
          onSubmit={addNote}
          style={{ visibility: 'collapse' }}
        >
          {' '}
          <h3>Enter new note</h3>
          <input type='text' onChange={handleContent} />
          <button type='submit'>Submit edited note</button>
        </form>
      </div>
    </div>
  );
};
const Note = ({ user }) => {
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    noteService.getIt().then(initialNotes => {
      setNotes(initialNotes);
    });
  }, []);
  const handleContent = event => {
    setContent(event.target.value);
  };
  const addNote = event => {
    event.preventDefault();
    const newObject = {
      content
    };
    handleCreate(newObject);
  };
  const handleCreate = async newObject => {
    const response = await noteService.create(newObject);
    if (response) {
      setMessage('Note created successfully');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  return (
    <div>
      <Notification message={message} />
      <h3>Your Notes</h3>
      <div>
        <ul>
          {notes.map(note => (
            <SingleNote
              key={note.id}
              note={note}
              user={user}
              setMessage={setMessage}
            />
          ))}
        </ul>
      </div>
      <div>
        <form onSubmit={addNote}>
          <h3>Create New Note</h3>
          <input type='text' name='newNote' onChange={handleContent}></input>
          <button type='Submit'>Create</button>
        </form>
      </div>
    </div>
  );
};

export default Note;
//
