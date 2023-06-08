const axios = require('axios');
const cheerio = require('cheerio');
const ListTruyen = require('../models/data.model');

exports.getData = async (req, res) => {
  try {
    const data = await ListTruyen.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
};

exports.crawlData = async (req, res) => {
  try {
    const response = await axios.get('https://truyenfull.vn/');
    const $ = cheerio.load(response.data);
    const items = $('.title-list > .row > .col-md-4');
    const dataList = [];

    items.each((index, element) => {
      const category = $(element).find('.list-cat > a').text().trim();
      const title = $(element).find('.truyen-title > a').text().trim();
      const url = $(element).find('.truyen-title > a').attr('href');

      dataList.push({
        category,
        title,
        url,
        isCrawl: false,
        reCrawl: false,
        isHoanTat: false,
        isTamNgung: false,
      });
    });

    await ListTruyen.insertMany(dataList);
    res.status(201).json(dataList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
};