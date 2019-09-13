const chaosDeployer = require('./chaos-website-deployer');
const awsVars = require('./common-aws');

(async () => {
  try {
    await chaosDeployer.init();

    const s3Exists = await chaosDeployer.stackExists(awsVars.S3_STACK_NAME);
    const apiExists = await chaosDeployer.stackExists(awsVars.API_STACK_NAME);

    if (s3Exists) {
      await chaosDeployer.deleteS3Objects(awsVars.DOMAIN_NAME);
      await chaosDeployer.deleteS3Objects(awsVars.LAMBDA_S3_BUCKET);
      await chaosDeployer.deleteStack(awsVars.S3_STACK_NAME);
    }

    if (apiExists) await chaosDeployer.deleteStack(awsVars.API_STACK_NAME);
  } catch (err) {
    console.log(err);
  }
})();
