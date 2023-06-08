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
    const response = await axios.get(`https://truyenfull.vn`);
    const $ = cheerio.load(response.data);
    const items = $("h3[itemprop='name'] a");
    const dataList = [];
    items.each((index, element) => {
      const category = $(element).text().trim();
      const title = $(element).text().trim();
      const url = $(element).attr('href');

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
