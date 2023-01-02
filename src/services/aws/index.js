const {
    S3Client,
    GetObjectCommand,
    ListBucketsCommand,
    ListObjectsV2Command,
    PutObjectCommand
} = require('@aws-sdk/client-s3');

var inspect = require('util').inspect;

// const { blogpostDb } = require('../db')
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const getFilesFromS3Bucket = async (user, content) => {

    // Set the AWS Region.
    const REGION = "Region Name";
    // Create an Amazon S3 service client object.
    /* 
        const S3 = new S3Client({
            region: "auto",
            endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: ACCESS_KEY_ID,
                secretAccessKey: SECRET_ACCESS_KEY,
            },
        });
     */
    const s3Client = new S3Client({
        region: REGION,
        credentials: {
            accessKeyId: 'ACCESS_KEY_ID',
            secretAccessKey: 'SECRET_ACCESS_KEY'
        }
    });

    const streamToString = (stream) =>
        new Promise((resolve, reject) => {
            const chunks = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });

    try {

        const command = new GetObjectCommand({
            Bucket:  "BucketNameHere",
            Key:  "ObjectNameHere"
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