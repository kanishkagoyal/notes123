const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginTRouter = require('express').Router();
const Teacher = require('../models/teacher');

loginTRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await Teacher.findOne({ username: body.username });
  // console.log(user);
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }
  const teacherForToken = {
    username: user.username,
    id: user.id
  };

  const token = jwt.sign(teacherForToken, process.env.SECRET);

  response.status(200).send({
    token,
    username: user.username,
    name: user.name
  });
});

module.exports = loginTRouter;
