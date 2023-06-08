const axios = require('axios');
const cheerio = require('cheerio');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const stringData = require('../core/sourceGetData');

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
    const response = await axios.get(stringData);
    const $ = cheerio.load(response.data);
    const items = $('.title-list > .row > .col-md-4');
    const dataList = [];
    console.log('items',items)

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

exports.getTruyen = async (req, res) => {
    try {
      const response = await axios.get(stringData);
      const data = response.data;
      const dom = new JSDOM(data);
      const document = dom.window.document;
      const categories = Array.from(document.querySelectorAll('.menu-lv2 a')).map((category) => category.textContent);
      const titles = Array.from(document.querySelectorAll('.title-list a')).map((title) => title.textContent);
      const urls = Array.from(document.querySelectorAll('.title-list a')).map((url) => url.href);
  
      const dataList = [];
      for (let i = 0; i < titles.length; i++) {
        const dataItem = new ListTruyen({
          category: categories[i],
          title: titles[i],
          url: urls[i]
        });
        await dataItem.save();
        dataList.push(dataItem);
      }
  
      res.json(dataList);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving data');
    }
  };