const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/stories.models');
const Chapter = require('../models/chapters.models');

async function getLastPage() {
  try {
    const response = await axios.get('https://truyenfull.vn/danh-sach/truyen-hot');
    const $ = cheerio.load(response.data);
    const elements = $('.pagination li a');
    let lastHref = '';

    elements.each((index, element) => {
      const href = $(element).attr('href');
      if (href !== 'javascript:void(0)') {
        lastHref = href;
      }
    });
    const pageNumber = lastHref.match(/trang-(\d+)\//)[1];
    return pageNumber;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function getChapterContent(chapterUrl) {
  try {
    const response = await axios.get(chapterUrl);
    const $ = cheerio.load(response.data);
    const chapterContent = $('.chapter-c').text().trim();
    return chapterContent;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

exports.crawlData = async (req, res) => {
  try {
    const maxPagesToCrawl = 2; // Maximum number of pages to crawl
    const pageNumber = await getLastPage();
    const pagesToCrawl = Math.min(pageNumber, maxPagesToCrawl);

    const storyList = [];

    for (let page = 1; page <= pagesToCrawl; page++) {
      const url = `https://truyenfull.vn/danh-sach/truyen-hot/trang-${page}`;

      // Crawling data from the page
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Get the list of elements containing story information
      const itemAll = $('.col-truyen-main .list-truyen .row');

      // Iterate over each element
      for (let index = 0; index < itemAll.length; index++) {
        const element = itemAll.eq(index);

        // Get story information
        const titleElement = element.find("h3[itemprop='name'] a");
        const title = titleElement.text().trim();
        const storyUrl = titleElement.attr('href');
        const isFull = element.find('.label-full').length > 0;
        const imgTag = element.find('.col-xs-3 img.cover').attr('data-src') || element.find('.col-xs-3 img.cover').attr('src') || '';

        if (isFull) {
          continue;
        }

        // Create a Story object using the Story model
        const story = new Story({
          title: title || '',
          url: storyUrl || '',
          isFull: isFull,
          chapters: [],
          cover_image: imgTag || '',
        });

        // Crawling the detail data of the Story from its URL
        const storyResponse = await axios.get(storyUrl);
        const story$ = cheerio.load(storyResponse.data);

        // Get detailed information of the Story
        // ...

        // Crawling chapter data of the story
        const chapterElements = story$(".list-chapter li");
        for (let chapterIndex = 0; chapterIndex < chapterElements.length; chapterIndex++) {
          const chapterElement = chapterElements.eq(chapterIndex);

          // Get chapter information
          const chapterTitleElement = chapterElement.find("a");
          const chapterTitle = chapterTitleElement.text().trim();
          const chapterUrl = chapterTitleElement.attr('href');
          const chapterContent = await getChapterContent(chapterUrl);


          // Create a Chapter object using the Chapter model
          const chapter = new Chapter({
            title: chapterTitle || '',
            content: chapterContent || '',
            chapter_url: chapterUrl || '',
          });

          // Add the chapter to the list of chapters of the Story
          story.chapters.push(chapter);

          // Save the chapter to the database
          await chapter.save();
        }

        // Save the story to the database
        await story.save();
        storyList.push(story);
      }
    }

    res.status(201).json(storyList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while retrieving data');
  }
};

exports.getDetail = async (req, res) => {
  try {
    const data = await Story.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
};
