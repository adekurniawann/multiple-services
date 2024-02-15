// Service B - app.js

const express = require('express');
const axios = require('axios');
const uuid = require('uuid'); // For generating trace IDs
const logger = require('./logger');
const app = express();
const port = 5002;

app.use((req, res, next) => {
  // Generate a unique trace ID for each incoming request to Service B
  const traceId = req.header('trace-id') || uuid.v4(); // Generate a new trace ID if not present
  req.traceId = traceId;
  // console.log(`Service A - Trace ID ${traceId}: Incoming request`);
  // logger.info(`Service B - Trace ID ${traceId}: Incoming request`);
  next();
});

app.get('/api/data-from-service-a', async (req, res) => {
  try {
    // Make a GET request to Service A and include the trace ID in the headers
    const response = await axios.get('http://127.0.0.1:5001/api/data', {
      headers: { 'trace-id': req.traceId },
    });

    // You can process the response from Service A or return it directly
    const responseData = response.data;
    logger.info({
      message: responseData,
      Process_Name: 'prototype stream log service-b',
      Developer_Team: 'devops_team',
      Route: '/api/data-from-service-a',
      Send_Alert : 'false/true',
      traceCode: req.traceId,
      Data: "anything (can be payload, json, object, response body)",
    });

    res.json({
      message: 'Data fetched from Service A by Service B',
      dataFromServiceA: responseData,
    });
  } catch (error) {
    // console.error(`Service B - Trace ID ${req.traceId}: An error occurred while calling Service A`);
    console.error(error);
    logger.error('Error while fetching data', { error, TraceCode: req.traceId, 
      Process_Name:'error handling' }); // Log error event
    res.status(500).json({ error: 'An error occurred while calling Service A' });
  }
});

app.listen(port, () => {
  console.log(`Service B listening on port ${port}`);
});
