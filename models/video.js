const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema, design of the structure of `Video` type.
const VideoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  date: {
    type: Date,
  },
});

VideoSchema.index({ date: -1 });

module.exports = Video = mongoose.model('video', VideoSchema);
