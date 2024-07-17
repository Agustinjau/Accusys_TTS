const express = require("express");
const cors = require("cors");
const { logger } = require("./controllers/log.controller");

const speechRoutes = require("./routes/speech.route");

const app = express();
app.use(cors());
const port = process.env.TTS_HOST || 9000;

(async () => {})();

app.use(express.json());
app.use(express.static("frontStream"));
app.use("/tts", speechRoutes);

//error handling
app.use((err, req, res, next) => {
  logger(err, "error");
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  logger("Server running on port " + port, "success");
});
