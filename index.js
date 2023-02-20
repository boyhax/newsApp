const express = require("express");
const axios = require("axios");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('59f7f1aa546a481aa8fa18ce49c64b64');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static('public'))

app.use(cors({
    origin: "*",
}));
app.get("/", (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});
app.get("/hi", (req, res) => {
  const params = req.params;
  console.log("params :>> ", params);
  console.log("body :>> ", req.body);

  res.send("<div><h1>heloooo</h1></div>");
});
app.get("/news/topHeadlines/:page", (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  newsapi.v2.topHeadlines({
    q: '',
    category: 'sports',
    language: 'ar',
    pageSize: 10,
    page: req.params.page??1,
    // country: 'ar'
  }).then(response => {
    console.log('top headlines');
    res.send(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });
});
app.get("/news/search/:text/:page", (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  newsapi.v2.topHeadlines({
    q: req.params.text??'',
    category: 'sports',
    language: 'ar',
    pageSize: 10,
    page: req.params.page??1,
    // country: 'ar'
  }).then(response => {
    console.log('searched ');
    res.send(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
