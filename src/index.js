import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import AdmZip from 'adm-zip';

export const handler = async (event) => {
  const { s3 } = JSON.parse(JSON.parse(event.Records[0].body).Message).Records[0];
  if (s3.object.key.endsWith('.zip')) {
    const client = new S3Client();
    const { Body } = await client.send(new GetObjectCommand({
        Bucket: s3.bucket.name,
        Key: s3.object.key
    }));
    const zip = new AdmZip(Buffer.concat(await Body.toArray()));
    const files = zip.getEntries();
    return Promise.all(files.map(f => {
      return client.send(new PutObjectCommand({
        Bucket: s3.bucket.name,
        Key: f.entryName,
        Body: f.getData()
    }))}));
  }
};


