const fs = require('fs');
const chaosDeployer = require('./chaos-website-deployer');
const awsVars = require('./common-aws');

(async () => {
  try {
    await chaosDeployer.init();

    const s3CreationParameters = [
      {
        ParameterKey: 'chaosWebsiteS3Bucket',
        ParameterValue: awsVars.WEBSITE_S3_BUCKET,
      },
      {
        ParameterKey: 'chaosLambdaS3Bucket',
        ParameterValue: awsVars.LAMBDA_S3_BUCKET,
      }];

    await chaosDeployer.createStack(awsVars.S3_STACK_NAME, awsVars.S3_STACK_TEMPLATE_FILE_PATH, s3CreationParameters);

    const index = fs.readFileSync('../client/index.html', 'utf8');
    const bundle = fs.readFileSync('../client/build/bundle.js', 'utf8');
    const lambda = fs.readFileSync('../client/build/bundle.js', 'utf8');
    
    await chaosDeployer.createObject(awsVars.WEBSITE_S3_BUCKET, 'index.html', index, {ContentType: "text/html", ACL: "public-read"});
    await chaosDeployer.createObject(awsVars.WEBSITE_S3_BUCKET, 'bundle.js', bundle, {ContentType: "text/javascript", ACL: "public-read"});
    await chaosDeployer.createObject(awsVars.LAMBDA_S3_BUCKET, 'lambda.js', lambda);

    await chaosDeployer.createStack(awsVars.API_STACK_NAME, awsVars.API_STACK_TEMPLATE_FILE_PATH);
  } catch (err) {
    console.log(err);
  }
})();
