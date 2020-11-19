require("dotenv").config();
const express = require("express");
const md5 = require("md5");
const axios = require("axios");
const router = express.Router();

const app = express();

const date = new Date();
const timestamp = Math.floor(date.getTime() / 1000);

const hash = md5(
  timestamp + process.env.MARVEL_API_SECRET + process.env.MARVEL_API_KEY
);

router.get("/comics", async (req, res) => {
  try {
    if (req.query.offset) {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&hasDigitalIssue=false&orderBy=title&limit=100&offset=${req.query.offset}&ts=${timestamp}&apikey=${process.env.MARVEL_API_KEY}&hash=${hash}`
      );
      res.json(response.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/comic", async (req, res) => {
  try {
    if (req.query.id) {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/comics/${req.query.id}?ts=${timestamp}&apikey=${process.env.MARVEL_API_KEY}&hash=${hash}`
      );

      res.json(response.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
