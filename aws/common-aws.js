const DOMAIN_NAME = 'lovechaos.net';
module.exports = {
  DOMAIN_NAME : DOMAIN_NAME,  
  S3_STACK_NAME : DOMAIN_NAME.replace('.', '') + '-www',
  API_STACK_NAME : DOMAIN_NAME.replace('.', '') + '-api',
  LAMBDA_S3_BUCKET : DOMAIN_NAME.replace('.', '') + '-lambda',
  API_END_POINT : 'api.' + DOMAIN_NAME,
  REGION_HOSTED_ZONE_ID : process.env.REGION_HOSTED_ZONE_ID,
  CUSTOM_DOMAIN_HOSTED_ZONE_ID : process.env.CUSTOM_DOMAIN_HOSTED_ZONE_ID,
  REGIONAL_CERTIFICATE_ARN : process.env.REGIONAL_CERTIFICATE_ARN
};
