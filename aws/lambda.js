exports.handler = function(event, context) {
    
  var responseCode = 200;
  
  var response = {
      statusCode: responseCode,
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "OPTIONS, POST",
          "Access-Control-Allow-Methods" : "OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
      body: JSON.stringify(event)
  };
  
  context.succeed(response);
};