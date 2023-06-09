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
    const totalPages = 10; // Specify the number of pages you want to crawl
    const dataList = [];

    for (let page = 1; page <= totalPages; page++) {
      const response = await axios.get(`https://truyenfull.vn/danh-sach/truyen-hot/trang-${page}`);
      const $ = cheerio.load(response.data);
      const items = $("h3[itemprop='name'] a");
      const paginationItems = $('ul.pagination li');
      const lastPageNumber = parseInt(paginationItems.last().prev().text());
      console.log('paginationItems',paginationItems)
      items.each((index, element) => {
        const category = $(element).text().trim();
        const title = $(element).text().trim();
        const url = $(element).attr('href');
        // Create the story object with details
        const story = {
          category,
          title,
          url,
          isCrawl: false,
          reCrawl: false,
          isHoanTat: false,
          isTamNgung: false,
        };

        dataList.push(story);
      });
    }

    await ListTruyen.insertMany(dataList);
    res.status(201).json(dataList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
};
