const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
  title: String,
  chapterCount: Number,
  author: String,
  genres: String,
  source: String,
  isHoanThanh: String,
  isTop: Boolean
});

const DetailTruyen = mongoose.model('DetailTruyen', detailSchema);

module.exports = DetailTruyen;