const axios = require("axios");
const { logger } = require("../controllers/log.controller");

const text_to_speech = async (text, apiKey, voice_id) => {
  try {
    const options = {
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      headers: {
        accept: "audio/mp3",
        "content-type": "application/json",
        "xi-api-key": `${apiKey}`,
      },
      data: {
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      responseType: "arraybuffer",
    };
    const speechDetails = await axios.request(options);
    return Buffer.from(speechDetails.data);
  } catch (err) {
    logger(
      `While loading new tts elevenLab service -> message: ${err.message}, stack: ${err.stack}`,
      "error"
    );
    throw err;
  }
};

const text_to_speech_stream = async (text, apiKey, voice_id) => {
  try {
    const options = {
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}/stream`,
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": `${apiKey}`,
      },
      data: {
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      responseType: "stream",
    };
    const speechDetails = await axios.request(options);
    return speechDetails.data;
  } catch (err) {
    logger(
      `While loading new tts elevenLab service -> message: ${err.message}, stack: ${err.stack}`,
      "error"
    );
    throw err;
  }
};

module.exports = {
  text_to_speech,
  text_to_speech_stream,
};
