exports.handler = async (event) => {
    
  // transform data into chart.js data
  const response = {
      statusCode: 200,
      body: JSON.stringify({originalData: JSON.parse(event)}),
  };
  return response;
};
