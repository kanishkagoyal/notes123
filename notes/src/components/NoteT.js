import React, { useState, useEffect } from 'react';
import notesTService from '../services/notesT';

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
    const response = await notesTService.update(newObject);
    if (response) {
      setMessage('Note created successfully');
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
const NoteT = user => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    notesTService.getAll().then(initialNotes => {
      setNotes(initialNotes);
    });
  }, []);
  return (
    <div>
      <Notification message={message} />
      <h3>All Notes</h3>
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
    </div>
  );
};

export default NoteT;
//
