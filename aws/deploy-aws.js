const fs = require('fs');
const chaosDeployer = require('./chaos-website-deployer');
const AdmZip = require('adm-zip');

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

    const indexContents = fs.readFileSync('../client/index.html', 'utf8');
    const bundleContents = fs.readFileSync('../client/build/bundle.js', 'utf8');
    await chaosDeployer.createObject(awsVars.WEBSITE_S3_BUCKET, 'index.html', indexContents, {ContentType: "text/html", ACL: "public-read"});
    await chaosDeployer.createObject(awsVars.WEBSITE_S3_BUCKET, 'build/bundle.js', bundleContents, {ContentType: "text/javascript", ACL: "public-read"});

    const zip = new AdmZip();
    zip.addLocalFile('./lambda.js');
    const lambdaZip = zip.toBuffer();
    await chaosDeployer.createObject(awsVars.LAMBDA_S3_BUCKET, 'lambda.zip', lambdaZip);
    
    const apiCreationParameters = [{ ParameterKey: 'chaosLambdaS3Bucket', ParameterValue: awsVars.LAMBDA_S3_BUCKET,} ];
    await chaosDeployer.createStack(awsVars.API_STACK_NAME, awsVars.API_STACK_TEMPLATE_FILE_PATH, apiCreationParameters);
    
  } catch (err) {
    console.log(err);
  }
})();
