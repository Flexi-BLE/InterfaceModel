import AWS from 'aws-sdk';
import {setCurrentSpec} from "./CookieUtils";


const fileNameSpec = (spec) => {
    return `${spec.name}_${spec.id}.json`;
}

const bucket = "flexible-specification-tool";

// TODO: USE ENVIRONMENT VARIABLES!
const s3 = new AWS.S3({
    forcePathStyle: false,
    endpoint: process.env.REACT_APP_SPACES_ENDPOINT,
    region: process.env.REACT_APP_SPACES_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_SPACES_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SPACES_SECRET_ACCESS_KEY
    }
});

export const uploadFileToS3 = async (spec) => {

    const params = {
        Bucket: bucket,
        Key: `public-specifications/${fileNameSpec(spec)}`,
        Body: JSON.stringify(spec, null, 2),
        ACL: 'public-read',
    }

    try {
        const response = await s3.upload(params).promise();
        setCurrentSpec(spec, response.Location);
        return response.Location;
    } catch (err) {
        throw err
    }
}

export const doesFileExist = async (spec) => {
    try {
        await s3.headObject({
            Bucket: bucket,
            Key: `public-specifications/${fileNameSpec(spec)}`
        }).promise();

        return true;
    } catch (err) {
        // ignore error assume FILE FOUND
        return false;
    }
}