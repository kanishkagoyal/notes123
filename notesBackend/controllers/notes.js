const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

notesRouter.get('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const id = decodedToken.id;
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const notes = await Note.find({ user: id });
  response.json(notes);
});

notesRouter.post('/', async (request, response) => {
  let note = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const newnote = new Note({
    content: note.content,
    last_update_time: new Date(),
    last_update_by: user.name,
    user: user.id
  });
  const savedNote = await newnote.save();
  user.notes = user.notes.concat(savedNote.id);
  await user.save();
  response.status(201).json(savedNote);
});

notesRouter.delete('/:id', async (request, response) => {
  const NoteRequested = await Note.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, process.env.secret);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (NoteRequested.user.toString() === decodedToken.id.toString()) {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(400).json({ error: 'You are not allowed' });
  }
});

notesRouter.put('/:id', async (request, response) => {
  const NoteRequested = await Note.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, process.env.secret);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const body = request.body;
  const note = {
    content: body.content,
    last_update_time: new Date(),
    last_update_by: body.last_update_by,
    id: body.id,
    user: body.user
  };
  if (NoteRequested.user.toString() === decodedToken.id.toString()) {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
      new: true
    });
    response.status(204).json(updatedNote);
  } else {
    response.status(400).json({ error: 'You are not allowed' });
  }
});

module.exports = notesRouter;
