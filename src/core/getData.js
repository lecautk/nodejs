const express = require('express');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const app = express();
app.get('/data', async (req, res) => {
  try {
    const response = await axios.get(stringData.urlGet);
    const data = response.data;
    const jsonData = JSON.stringify(data);
    const dom = new JSDOM(jsonData);
    res.json(dom.window.document);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
});

