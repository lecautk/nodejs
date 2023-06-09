const axios = require('axios');
const cheerio = require('cheerio');

const ListTruyen = require('../models/data.model');

exports.getStoryDetail = async (req, res) => {
  try {
    const data = await ListTruyen.find();

    const storyDetails = await Promise.all(data.map(async (story) => {
      const response = await axios.get(story.url);
      const $ = cheerio.load(response.data);
      // Extract the details
      const title = $("h3[itemprop='name']").text().trim();
      const chapterCount = $('.l-chapter a').eq(0).text().trim();
      console.log('chapterCount', chapterCount);
      const formattedChapterCount = parseInt(chapterCount.replace(/[^0-9]/g, ''));

      const author = $('.info a[itemprop="author"]').text().trim();
      const genres = $('.info a[itemprop="genre"]').map((index, element) => $(element).text().trim()).get();
      const source = $('.info span[itemprop="publisher"]').text().trim();
      const isHoanThanh = $('.info span[itemprop="updater"]').text().trim();

      // Create an object with the extracted details
      const storyDetail = {
        title,
        chapterCount: formattedChapterCount,
        author,
        genres,
        source,
        isHoanThanh,
      };

      return storyDetail;
    }));

    res.json(storyDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving story details');
  }
};

  
exports.getDetail = async (req, res) => {
    try {
      const data = await DetailTruyen.find();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving data');
    }
  };