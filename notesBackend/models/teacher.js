const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex', true);
const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  passwordHash: {
    type: String,
    minlength: 3,
    required: true
  }
});

teacherSchema.plugin(uniqueValidator);

teacherSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
