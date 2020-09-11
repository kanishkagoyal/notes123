const notesTRouter = require('express').Router();
const Note = require('../models/note');
const Teacher = require('../models/teacher');
const jwt = require('jsonwebtoken');

notesTRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesTRouter.put('/:id', async (request, response) => {
  const NoteRequested = await Note.findById(request.params.id);
  console.log('note requested is ', NoteRequested);
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
  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true
  });
  response.status(204).json(updatedNote);
});

module.exports = notesTRouter;
