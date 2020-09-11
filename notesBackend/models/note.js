const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  content: {
    type: String,
    maxlength: 200,
    reuired: true
  },
  last_update_time: Date,
  last_update_by: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Note', noteSchema);
