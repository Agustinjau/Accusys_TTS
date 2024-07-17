const {
  text_to_speech,
  text_to_speech_stream,
} = require("../repositories/speech.repository");
const { logger } = require("./log.controller");
const fs = require("fs");
const path = require("path");

const textToSpeech = async (req, res) => {
  const { text, apikey, voice_id } = req.body;
  const audiosDir = path.join(__dirname, "..", "audios");

  try {
    if (!fs.existsSync(audiosDir)) {
      fs.mkdirSync(audiosDir);
    }
    const file = await text_to_speech(text, apikey, voice_id);
    const fileName = `${Date.now()}.mp3`;
    const filePath = path.join(audiosDir, fileName);
    fs.writeFileSync(filePath, file);
    res
      .status(200)
      .json({ message: "Audio generated successfully", fileName: fileName });
  } catch (err) {
    logger(
      `While loading new transcription -> message: ${err.message}, stack: ${err.stack}`,
      "error"
    );
    return res.status(500).json({ message: "Error processing request" });
  }
};

const textToSpeechStream = async (req, res) => {
  const { text, apikey, voice_id } = req.body;

  try {
    // Configurar la solicitud a ElevenLabs
    const response = await text_to_speech_stream(text, apikey, voice_id);

    // Configurar el encabezado de la respuesta
    res.setHeader("Content-Type", "audio/mp3");

    // Crear un stream para pasar la respuesta
    response.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

module.exports = {
  textToSpeech,
  textToSpeechStream,
};
