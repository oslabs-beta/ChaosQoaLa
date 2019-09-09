var AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
    console.log("Region", process.env.AWS_REGION);
  }
});
