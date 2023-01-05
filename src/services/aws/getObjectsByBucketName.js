const { S3Client, GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const { env } = require('../../configs/env');
/* 
(async (args) => {
    try {
        const s3Client = new S3Client({
            region: env.aws.REGION,
            // endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: env.aws.ACCESS_KEY_ID,
                secretAccessKey: env.aws.SECRET_ACCESS_KEY
            }
        });

        console.log('1:', new Date().toISOString());
        const files = await s3Client.send(
            new ListObjectsV2Command({
                Bucket: 'convert-text-1',
            })
        );
        console.log('2:', args, new Date().toISOString());
        const getPromises = [];
        
                if (files.Contents) {
                    for (const file of files.Contents) {
                        if (file.Key) {
                            getPromises.push(
                                s3Client.send(
                                    new GetObjectCommand({
                                        Bucket: 'convert-text-1',
                                        Key: file.Key,
                                    })
                                )
                            );
                        }
                    }
                }
                const result = await Promise.all(getPromises);
                
        console.log('files:', files);
        return files;
    } catch (e) {
        console.log('ListObjectsV2Command:', e);
    }
})();
 */
module.exports = async (backetName, value2) => {
   
    try {
        const s3Client = new S3Client({
            region: env.aws.REGION,
            // endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: env.aws.ACCESS_KEY_ID,
                secretAccessKey: env.aws.SECRET_ACCESS_KEY
            }
        });

        const object = await s3Client.send(
            new ListObjectsV2Command({
                Bucket: backetName,
            })
        );

        if (object.Contents) {
            for (const file of object.Contents) {
                if (file.Key) {
                    console.log('file.Key:',file.Key)
                }
            }
        }

        // console.log('result:', result);
        return object;
    } catch (e) {
        console.log('ListObjectsV2Command:', e);
    }
}