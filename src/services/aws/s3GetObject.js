const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

// const { blogpostDb } = require('../db')
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const getFilesFromS3Bucket = async (user, content) => {



    try {
/* 
        // Set the AWS Region.
        const REGION = "us-east-1";
        // Create an Amazon S3 service client object.
        const client = new S3Client({});
        const s3Client = new S3Client({ region: REGION });

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