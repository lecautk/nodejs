const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  category: String,
  title: String,
  url: String,
  isCrawl: Boolean,
  reCrawl: Boolean,
  isHoanTat: Boolean,
  isTamNgung: Boolean,
});

const ListTruyen = mongoose.model('ListTruyen', dataSchema);

module.exports = ListTruyen;