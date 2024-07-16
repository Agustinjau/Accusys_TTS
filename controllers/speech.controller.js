const {
  text_to_speech,
  text_to_speech_stream,
} = require("../repositories/speech.repository");
const { logger } = require("./log.controller");
const fs = require("fs");
const path = require("path");

const textToSpeech = async (req, res) => {
  const { text } = req.body;
  const apiKey = "sk_6baf2b8eefa32e0e42b93f3f54ec67d05f35b9ae31c39543";
  const audiosDir = path.join(__dirname, "..", "audios");

  try {
    if (!fs.existsSync(audiosDir)) {
      fs.mkdirSync(audiosDir);
    }
    const file = await text_to_speech(text, apiKey);
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
  const { text } = req.body;
  const apiKey = "sk_0c068eb9a1ee69d72ff77e013fd6d1b537ab3adb7005c197";

  try {
    // Configurar la solicitud a ElevenLabs
    const response = await text_to_speech_stream(text, apiKey);

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
