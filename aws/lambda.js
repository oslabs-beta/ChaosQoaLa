exports.handler = function(event, context) {
  const body = JSON.parse(event.body);
  const data = JSON.parse(body);
  
  const { chaosResults } = data;
  const { agentData } = data;
  
  const chaosTimes = chaosResults.map(function(element) {
    return element["timeOfResult"];  
  });
  
  const chaosData = chaosResults.map(function(element) {
    return element["result"];
  });
  
  const agentTimes = agentData.map(function(element) {
    return element["timeOfResponse"];
  });
  
  const agentFlags = agentData.map(function(element) {
    return element["chaosResponse"];
  }); 
     
  const responseCode = 200;  
  const response = {
    statusCode: responseCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type" : "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Allow" : "OPTIONS, POST",
      "Access-Control-Allow-Methods" : "OPTIONS, POST",
      "Access-Control-Allow-Headers" : "*"
    },
    body: JSON.stringify({ chaosTimes, chaosData, agentTimes, agentFlags })
  };
  context.succeed(response);
};