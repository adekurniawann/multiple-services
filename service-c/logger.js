const winston = require('winston');
const WinstonLoki = require('winston-loki');
// const { v4: uuidv4 } = require('uuid');

// const lokiTransport = new WinstonLoki({
//   host: 'http://172.17.0.1:3100', // Replace with your Loki server URL
//   labels: { 
//     service: 'service-c'
//   },
// });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
    ),
  transports: [
    new winston.transports.Console(),
    new WinstonLoki({
        host: 'http://172.17.0.1:3100', // Replace with your Loki server URL
        labels: { 
            service: 'service-c'},
        json: true,
        format: winston.format.combine(
        //         winston.format.timestamp(),
        //         winston.format.json(),
    )})
  ],
});

module.exports = logger;
