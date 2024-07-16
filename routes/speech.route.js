const express = require("express");
const router = express.Router();

const speech = require("../controllers/speech.controller");

router
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
  .options("*", function (req, res) {
    res.end();
  });

router.post("/", speech.textToSpeech);
router.post("/stream", speech.textToSpeechStream);

module.exports = router;
