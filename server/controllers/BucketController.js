const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
const { Readable } = require('stream');
const multer = require('multer');
const upload = multer()
const { v4: uuidv4 } = require('uuid');
let dbConnection = require('./DatabaseController')


const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: process.env.PROJECT_ID, 
    keyFilename: './config/keyfile.json',
});

const bucketName = process.env.BUCKET_NAME

const saveProductImages = async (req, res) => { 

    try {
        upload.array('files')(req, res, async (err) => {
      
          const files = req.files;
      
          try {
            const bucket = storage.bucket(bucketName);
            const fileUrls = [];
      
            for (let i = 0; i < files.length; i++) {
              const file = files[i];              
              const destinationFilename = uuidv4() + req.query.adID;
              const fileOptions = {
                destination: destinationFilename,
                metadata: {
                  contentType: file.mimetype,
                },
              };

              const readableStream = new Readable();
              readableStream.push(file.buffer);
              readableStream.push(null);

              const writeStream = bucket.file(destinationFilename).createWriteStream(fileOptions);

                await new Promise((resolve, reject) => {
                readableStream.pipe(writeStream)
                    .on('error', reject)
                    .on('finish', resolve);
                });

                let fileUrl = `https://storage.googleapis.com/${bucketName}/${destinationFilename}`

                fileUrls.push(fileUrl);
            }

            savePhotosInDB(fileUrls, req.query.adID)


            return res.status(200).json({ message: 'Files uploaded successfully', fileUrls });
          } catch (error) {

            return res.status(500).json({ error: 'Failed to upload files' });
          }
        });
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }
}

const savePhotosInDB = async (urls, id) => {

    let statement = `UPDATE ads SET urls='${JSON.stringify(urls)}' WHERE id='${id}'`; 
    await dbConnection(statement); 

}

module.exports = {saveProductImages}