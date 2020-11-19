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

//----------search----------\\

router.get("/characters/search", async (req, res) => {
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${req.query.nameStartsWith}&orderBy=name&limit=100&ts=${timestamp}&apikey=${process.env.MARVEL_API_KEY}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/comics/search", async (req, res) => {
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?titleStartsWith=${req.query.titleStartsWith}&orderBy=onsaleDate&limit=100&offset=${req.query.offset}&ts=${timestamp}&apikey=${process.env.MARVEL_API_KEY}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
