const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  chapterId: Number,
  contentChapter: String,
  titleChapter: String,
  totalChapterCount: Number
});

const infoSchema = new mongoose.Schema({
  truyenTitle: String,
  url: String,
  status: String,
  isHoanThanh: Boolean,
  chapter: chapterSchema,
});

const fullDataSchema = new mongoose.Schema({
  truyenId: String,
  theLoai: Array,
  info: infoSchema,
});

const FullData = mongoose.model('FullData', fullDataSchema);

module.exports = FullData;