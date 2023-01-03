const { getFilesFromS3Bucket } = require('../../services/aws/index');
const { listBucketsName } = require('../../services/aws/listBuckets');

// const { createBlogpost } = blogService

/*
 * call other imported services, or same service but different functions here if you need to
*/
const readFilesFromAWSS3 = async (req, res, next) => {
 
  try {
    const message = await listBucketsName()
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    if (message) {
        res.status(200).json({message: message})
    } else {
        res.status(400).json({message: message})
    }
    
    
  } catch(error) {
    console.log("e.message:", error.message)
    next(error)
  }
}

module.exports = {
    readFilesFromAWSS3
}