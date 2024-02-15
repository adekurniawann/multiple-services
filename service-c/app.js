const express = require('express');
const axios = require('axios');
const logger = require('./logger'); // Import the logger
const uuid = require('uuid');
const app = express();
const PORT = 5003;

app.use((req, res, next) => {
     // Generate a unique trace ID for each incoming request to Service B
    const traceId = req.header('Trace-Code') || uuid.v1(); // Generate a new trace ID if not present
    req.traceId = traceId;
    console.log(`Service A - Trace ID ${traceId}: Incoming request`);
    // logger.info(`Service C - Trace ID ${traceId}: Incoming request`);
    next();
  });

app.get('/getCombinedInfo', async (req, res) => {
    try {
      // Call Service B's API to get combined information
      const responseBody = {
        traceId: req.traceId,
        message: 'This is my service-c respone!',
      };
      const headers = { 'Trace-Code': req.traceId };
      const responseB = await axios.get('http://localhost:5002/api/data-from-service-a', { headers});
      const combinedInfo = responseB.data.combinedInfo;
      console.log('Service C: Received combined info from Service B');
      logger.info({
        message: "combinedInfo",
        Process_Name: 'prototype stream log service-c',
        Developer_Team: 'devops_team',
        Route: '/api/getCombinedInfo',
        Send_Alert : 'false/true',
        traceCode: req.traceId,
        Data: "anything (can be payload, json, object, response body)",
      });
      res.json({ 
        message: 'Data fetched from Service B by Service C', });
    } catch (error) {
      console.error(error);
      logger.error('Error while fetching data', { error, TraceCode: req.traceId,
        Process_Name:'error handling' }); // Log error event
      res.status(500).json({ error: 'Error while fetching data' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Service C is listening on port ${PORT}`);
  });