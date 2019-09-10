module.exports = {
  S3_STACK_NAME : 'chaosQoaLaS3Deployment',
  S3_STACK_TEMPLATE_FILE_PATH : './cloud-formation-s3.yml',
  API_STACK_NAME : 'chaosQoaLaAPIDeployment',
  API_STACK_TEMPLATE_FILE_PATH : './cloud-formation-lambda-api.yml',
  DEFAULT_WEBSITE_S3_BUCKET_NAME : 'chaos-qoala-website-files',
  DEFAULT_LAMBDA_S3_BUCKET_NAME : 'chaos-qoala-lambda-files',
  WEBSITE_S3_BUCKET : process.env.CHAOS_WEBSITE_S3_BUCKET_NAME || DEFAULT_WEBSITE_S3_BUCKET_NAME,
  LAMBDA_S3_BUCKET : process.env.CHAOS_LAMBDA_S3_BUCKET_NAME || DEFAULT_LAMBDA_S3_BUCKET_NAME,
};