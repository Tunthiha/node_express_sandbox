import winston from "winston";
import fs from "fs";
import path from "path";

// Ensure logs directory exists
const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Configure Winston Logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Log errors to a file
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    // Log all messages to a file
    new winston.transports.File({ filename: "logs/combined.log" })
  ],
});

// If we're in development, log to the console too
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
