const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

const logger = createLogger({
    level:'info',
    format:combine(
        label({ label: 'right meow!' }),
        timestamp(),
        myFormat
      ),
    transport:[
         new transports.File({filename:'debug.log',level:'info'})
    ]
});

module.exports = logger