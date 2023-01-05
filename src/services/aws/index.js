const fs = require('fs');
const { S3Client, GetObjectCommand, ListBucketsCommand, ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3');
// https://developers.cloudflare.com/r2/examples/aws-sdk-js-v3/
const { env } = require('../../configs/env');
const { writeDataIntoTile } = require('./writeDataToFile')
var inspect = require('util').inspect;

const getFilesFromS3Bucket = async (BucketName, ObjectName) => {

    const s3Client = new S3Client({
        region: env.aws.REGION,
        // endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: env.aws.ACCESS_KEY_ID,
            secretAccessKey: env.aws.SECRET_ACCESS_KEY
        }
    });

    // write the data into a file
    // const downloadFileFromS3Bucket 
    try {
        // Get the object from the Amazon S3 bucket. It is returned as a ReadableStream.
        const data = await s3Client.send(
                new GetObjectCommand({
                    Bucket: "convert-text-2", // BucketNameHere
                    Key: "Archaeology.txt", // ObjectNameHere
                })
            )
            .then( (data) => {
                
                return data
            })
            .catch((error) => {
                console.log("Error ReadableStream:\n", error);
                throw new Error(error.message)
            })
            .finally(() => {
                // finally.
            });
             return data;

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