// Service A - app.js

const express = require('express');
const uuid = require('uuid'); // For generating trace IDs
const app = express();
const port = 5001;
const logger = require('./logger');

app.use((req, res, next) => {
  // Check if a trace ID is present in the request header
  const traceId = req.header('trace-id') || uuid.v4(); // Generate a new trace ID if not present
  req.traceId = traceId;
  console.log(`Service A - Trace ID ${traceId}: Incoming request`);
  // logger.info(`Service A - Trace ID ${traceId}: Incoming request`);
  next();
});

app.get('/api/data', (req, res) => {
  // Replace this with your actual datas or data retrieval logic
  const data = { message: 'Data from Service A' };
  // console.log(`Service A - Trace ID ${req.traceId}: Data request received`);
  logger.info({
    message: data,
    Process_Name: 'prototype stream log service-a',
    Developer_Team: 'devops_team',
    Route: '/api/data',
    Send_Alert : 'false/true',
    traceCode: req.traceId,
    Data: { 'key': 'value', 'key2': 'value', 'key3': 'value', 'key3': 'value', 'key5': 'value'  },
  });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Service A listening on port ${port}`);
});
