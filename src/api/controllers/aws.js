const { getFilesFromS3Bucket } = require('../../services/aws/index');
const { listBucketsName } = require('../../services/aws/listBuckets');
const getObjectsByBucketName = require('../../services/aws/getObjectsByBucketName');
const { createdNewDirectory, writeDataIntoTile } = require('../../services/create_directories');


// const { createBlogpost } = blogService

const readFilesFromAWSS3 = async (req, res, next) => {
 
  try {
    const object = await getObjectsByBucketName('convert-text-1', 'convert-text-2');
   createdNewDirectory(BucketName);
    const data = await getFilesFromS3Bucket(BucketName, ObjectName);
    writeDataIntoTile(data.Body, s3BucketName, fileName);

    if (object) {
        res.status(200).json({ backetName: object['Name'] })
    } else {
        res.status(400).json({ object })
    }
    
    
  } catch(error) {
    console.log("e.message:", error.message)
    next(error)
  }
}

module.exports = {
    readFilesFromAWSS3
}