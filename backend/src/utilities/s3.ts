import * as fs from 'fs';
import * as path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
import S3 from 'aws-sdk/clients/s3';

const imageBucket = process.env.S3_IMAGE_BUCKET as string;
const region = process.env.S3_REGION;
const accessKey = process.env.S3_ACCESS_KEY as string;
const secretKey = process.env.S3_SECRET_KEY as string;

const s3 = new S3({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: region,
});

export const uploadImage = (file: any) => {
  const imageStream = fs.createReadStream(file.path);
  return s3
    .upload({
      Bucket: imageBucket,
      Key: file.filename, // Name of the object in bucket
      Body: imageStream, // Content of the object
    })
    .promise();
};

export const fetchImage = (imageKey: string) => {
  return s3
    .getObject({
      Bucket: imageBucket,
      Key: imageKey,
    })
    .createReadStream();
};

export const deleteImage = (imageKey: string) => {
  return s3
    .deleteObject({
      Bucket: imageBucket,
      Key: imageKey,
    })
    .promise();
};
