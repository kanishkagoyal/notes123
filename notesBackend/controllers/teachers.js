const bcrypt = require('bcryptjs');
const teachersRouter = require('express').Router();
const Teacher = require('../models/teacher');

teachersRouter.get('/', async (request, response) => {
  const teachers = await Teacher.find({});
  response.json(teachers);
});

teachersRouter.post('/', async (request, response) => {
  const body = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const teacher = new Teacher({
    username: body.username,
    name: body.name,
    passwordHash
  });
  const savedTeacher = await teacher.save();
  response.status(201).json(savedTeacher);
});

module.exports = teachersRouter;
