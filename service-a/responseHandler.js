// responseHandler.js

function sendSuccessResponse(res, message, data) {
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  }
  
  function sendErrorResponse(res, message, error) {
    res.status(500).json({
      success: false,
      message: message,
      error: error,
    });
  }
  
  module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
  };
  