const mongoose = require('mongoose');
const { Schema } = mongoose;
const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String
  },
  isFull: {
    type: Boolean
  },
  chapters: [{
    type: Schema.Types.ObjectId,
    ref: 'Chapter',
  }],
  cover_image: String,
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;