const fs = require('fs');
const {
    S3Client,
    GetObjectCommand,
    ListBucketsCommand,
    ListObjectsV2Command,
    PutObjectCommand
} = require('@aws-sdk/client-s3');
// https://developers.cloudflare.com/r2/examples/aws-sdk-js-v3/
const { env } = require('../../configs/env');
var inspect = require('util').inspect;

// const { blogpostDb } = require('../db')
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const getFilesFromS3Bucket = async (user, content) => {

    const s3Client = new S3Client({
        region: env.aws.REGION,
        // endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: env.aws.ACCESS_KEY_ID,
            secretAccessKey: env.aws.SECRET_ACCESS_KEY
        }
    });

    const streamToString = (stream) =>
         new Promise((resolve, reject) => {
             /*
             Flags for writing: w - for write. a - for append. r - for
              */
            stream.pipe(fs.createWriteStream('/Users/eli/git_repos/full-stack/file-handling-in-nodejs/static/test_gfg.txt', {flags: 'w'}))
                .on('error', err => reject(err))
                .on('close', () => resolve())
        })
    try {

        const command = new GetObjectCommand({
            Bucket: "convert-text-2", // BucketNameHere
            Key: "Archaeology.txt", // ObjectNameHere
        });

        const { Body } = await s3Client.send(command);
        const bodyContents = await streamToString(Body);
        console.log('bodyContents:\n', bodyContents);

        /*
                const bucketParams = {
                    Bucket: "BUCKET_NAME",
                    Key: "KEY",
                };
                // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
                const data = await s3Client.send(new GetObjectCommand(bucketParams))
                    .then((data) => {
                        // process data.
                    })
                    .catch((error) => {
                        // error handling.
                    })
                    .finally(() => {
                        // finally.
                    });;
                // Convert the ReadableStream to a string.
                return await data.Body.transformToString();
         */
        return user
    } catch (error) {
        console.log("Error getFilesFromS3Bucket:\n", error);
        throw new Error(error.message)
    }
    finally {
        // finally.
    }
}

module.exports = {
    getFilesFromS3Bucket
}