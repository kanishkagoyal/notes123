const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');
const Note = require('../models/note');

usersRouter.get('/', async (request, response) => {
  // console.log('trying to bring on the users');
  const users = await User.find({}).populate('notes', {
    content: 1,
    id: 1
  });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    class: body.class
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
