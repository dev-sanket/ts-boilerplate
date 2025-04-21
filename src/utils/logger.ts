import winston from 'winston';

class Logger {
  private static customLevels = {
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    },
    colors: {
      error: 'red bold',
      warn: 'yellow bold',
      info: 'green',
      http: 'magenta',
      debug: 'blue',
    },
  };

  private static instance: winston.Logger;

  private constructor() {} // Private constructor to prevent instantiation

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        levels: this.customLevels.levels,
        format: winston.format.combine(
          // winston.format.colorize({
          //   colors: this.customLevels.colors,
          //   all: true
          // }),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          // winston.format.json(),
          winston.format.printf(({ timestamp, level, message, ...meta }) => {
            const metaString =
              Object.keys(meta).length > 0 ? `\n${JSON.stringify(meta, null, 2)}` : '';
            return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
          })
        ),
        transports: [
          new winston.transports.Console(),
          //   new winston.transports.File({ filename: "app.log" }),
        ],
      });
    }
    return Logger.instance;
  }
}

export default Logger;
