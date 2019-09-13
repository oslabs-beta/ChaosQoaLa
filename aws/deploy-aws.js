const fs = require('fs');
const chaosDeployer = require('./chaos-website-deployer');
const AdmZip = require('adm-zip');

const awsVars = require('./common-aws');

(async () => {
  try {
    await chaosDeployer.init();

    const s3CreationParameters = [
      {
        ParameterKey: 'chaosDomain',
        ParameterValue: awsVars.DOMAIN_NAME,
      },
      {
        ParameterKey: 'chaosLambdaS3Bucket',
        ParameterValue: awsVars.LAMBDA_S3_BUCKET,
      }];

    await chaosDeployer.createStack(awsVars.S3_STACK_NAME, './cloud-formation-s3.yml', s3CreationParameters);

    const indexContents = fs.readFileSync('../client/index.html', 'utf8');
    const bundleContents = fs.readFileSync('../client/build/bundle.js', 'utf8');
    await chaosDeployer.createObject(awsVars.DOMAIN_NAME, 'index.html', indexContents, {ContentType: "text/html", ACL: "public-read"});
    await chaosDeployer.createObject(awsVars.DOMAIN_NAME, 'build/bundle.js', bundleContents, {ContentType: "text/javascript", ACL: "public-read"});

    const zip = new AdmZip();
    zip.addLocalFile('./lambda.js');
    const lambdaZip = zip.toBuffer();
    await chaosDeployer.createObject(awsVars.LAMBDA_S3_BUCKET, 'lambda.zip', lambdaZip);
    
    const apiCreationParameters = [
      { ParameterKey: 'chaosLambdaS3Bucket', ParameterValue: awsVars.LAMBDA_S3_BUCKET,},
      { ParameterKey: 'regionalCertificateArn', ParameterValue: awsVars.REGIONAL_CERTIFICATE_ARN,},
      { ParameterKey: 'customHostedZoneId', ParameterValue: awsVars.CUSTOM_DOMAIN_HOSTED_ZONE_ID,},
      { ParameterKey: 'regionHostedZoneId', ParameterValue: awsVars.REGION_HOSTED_ZONE_ID,},
      { ParameterKey: 'chaosDomainApi', ParameterValue: awsVars.API_END_POINT,},
    ];
    await chaosDeployer.createStack(awsVars.API_STACK_NAME, './cloud-formation-lambda-api.yml', apiCreationParameters);
    
  } catch (err) {
    console.log(err);
  }
})();
