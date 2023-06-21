const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  story_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
  },
  chapter_url:{
    type: String,
  },
  chapter_number: {
    type: String,
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
