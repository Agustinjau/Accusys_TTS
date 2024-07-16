const chalk = require("chalk");
const util = require("util");

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  success: 2,
  debug: 3,
  trace: 4,
};

// Set the colors for each log level
const logColors = {
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.white,
  success: chalk.green,
  debug: chalk.cyan,
  trace: chalk.gray,
};

/**
 * Logger function to set up the log level based on an environment variable
 * and log a message to the console.
 * @param {string} message - The message to be logged
 * @param {string} logLevel - The level of the log
 */
function log(level, message) {
  // Set the minimum log level
  const minimumLogLevel =
    logLevels[global._config?.envvars?.logging_level ?? "trace"];
  if (logLevels[level] <= minimumLogLevel) {
    let timestamp = new Date().toISOString();
    //change timestamp format
    timestamp = timestamp.replace("T", " ").replace("Z", "");
    // if message is an error, convert to string
    if (message instanceof Error) {
      message = `${message}\n${message.stack}`;
    }
    // if message is an object, convert to JSON
    if (typeof message === "object") {
      try {
        message = JSON.stringify(message, null, 2);
      } catch (error) {
        // if error contains circular reference, convert to string
        if (error.message.includes("circular structure")) {
          message = util.inspect(message);
        }
      }
    }
    //Add spaces to the log level to make it 7 characters long
    const logLevelSpace = " ".repeat(7 - level.length);
    //Log the message to the console
    console.log(
      logColors[level](
        `${timestamp} ${level.toUpperCase()}${logLevelSpace} ${message}`
      )
    );
  }
}

// Function to log an error
function logger(message, logLevel = "info") {
  log(logLevel, message);
}

module.exports = {
  logger,
};
