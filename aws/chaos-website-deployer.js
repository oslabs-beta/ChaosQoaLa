const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

module.exports = {
  init: () => new Promise((resolve, reject) => {
    AWS.config.getCredentials((err) => {
      if (err) {
        reject(err.stack);
      } else {
        console.log('Access key:', AWS.config.credentials.accessKeyId);
        console.log('Secret access key:', AWS.config.credentials.secretAccessKey);
        console.log('Region', process.env.AWS_REGION);
        resolve();
      }
    });
  }),
  stackExists: (name) => new Promise((resolve, reject) => {
    const cloudformation = new AWS.CloudFormation({ apiVersion: '2010-05-15' });
    const currentStacksQueryParams = { StackStatusFilter: ['CREATE_COMPLETE', 'CREATE_IN_PROGRESS', 'DELETE_FAILED', 'ROLLBACK_COMPLETE'] };
    cloudformation.listStacks(currentStacksQueryParams, (err, data) => {
      if (err) {
        reject(err.stack); // an error occurred
      } else {
        for (let i = 0; i < data.StackSummaries.length; i += 1) {
          if (data.StackSummaries[i].StackName === name) {
            resolve(true);
          }
        }
        resolve(false);
      }
    });
  }),
  createStack: (name, templatePath, templateParams = []) => new Promise((resolve, reject) => {
    const template = fs.readFileSync(templatePath, 'utf8');
    const cloudformation = new AWS.CloudFormation({ apiVersion: '2010-05-15' });

    const createParams = {
      StackName: name,
      TemplateBody: template,
      Capabilities: ['CAPABILITY_IAM'],
      Parameters: templateParams,
    };

    cloudformation.createStack(createParams, (err) => {
      if (err) {
        reject(new Error(`FAILED: to create stack "${name}"\n${err.stack}`));
      } else {
        console.log(`--waiting-- while creation of stack ${name} completes`);
        cloudformation.waitFor('stackCreateComplete', { StackName: createParams.StackName }, (err, data) => {
          if (err) {
            reject(new Error(`--FAILED-- to create stack "${name}"\n${err.stack}`));
          } else {
            console.log(`--success-- created stack "${name}"`);
            resolve();
          }
        });
      }
    });
  }),
  createObject: (bucketName, objectName, objectData, options = {}) => new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    const createObjParams = {
      Body: objectData,
      Bucket: bucketName,
      Key: objectName,
      ...options
    };
    s3.putObject(createObjParams, (err, data) => {
      if (err) {
        reject(new Error(`--FAILED-- to create object "${objectName}"\n${err.stack}`));
      } else {
        console.log(`--success-- created object "${objectName}"`);
        resolve();
      }
    });
  }),
  deleteStack: (name) => new Promise((resolve, reject) => {
    const cloudformation = new AWS.CloudFormation({ apiVersion: '2010-05-15' });
    const deleteParams = {
      StackName: name,
    };
    cloudformation.deleteStack(deleteParams, (err) => {
      if (err) {
        reject(new Error(`--FAILED-- to delete stack "${name}"\n${err.stack}`));
      } else {
        console.log(`--waiting-- while deletion of stack ${name} completes`);
        cloudformation.waitFor('stackDeleteComplete', deleteParams, (err, data) => {
          if (err) {
            reject(new Error(`--FAILED-- to delete stack "${name}"\n${err.stack}`));
          } else {
            console.log(`--success-- deleted stack "${name}"`);
            resolve();
          }
        });
      }
    });
  }),
  deleteS3Objects: (bucketName) => new Promise((resolve, reject) => {
    const s3 = new AWS.S3();

    s3.listBuckets((err, data) => {
      if (err) {
        reject(new Error(`--FAILED-- to check if bucket "${bucketName}" exists\n${err.stack}`));
      } else {
        const namesOfBucketsThatExist = data.Buckets.map((element) => element.Name === bucketName);
        if (!namesOfBucketsThatExist.includes(bucketName)) resolve();
        const listObjectsParams = {
          Bucket: bucketName,
        };

        s3.listObjectsV2(listObjectsParams, (err, data) => {
          if (err) {
            reject(new Error(`--FAILED-- to get object keys for bucket "${bucketName}"\n${err.stack}`));
          } else {
            const s3BucketKeys = data.Contents.map((element) => ({ Key: element.Key }));
            const deleteObjectsParams = {
              Bucket: bucketName,
              Delete: {
                Objects: s3BucketKeys,
                Quiet: true,
              },
            };

            s3.deleteObjects(deleteObjectsParams, (err) => {
              if (err) {
                reject(new Error(`--FAILED-- to delete objects for bucket "${bucketName}"\n${err.stack}`));
              } else {
                console.log(`--success-- deleted objects for bucket "${bucketName}"`);
                resolve();
              }
            });
          }
        });
      }
    });
  }),
};
