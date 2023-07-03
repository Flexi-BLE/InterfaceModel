import AWS from 'aws-sdk';


const fileNameSpec = (spec) => {
    return `${spec.name}_${spec.id}.json`;
}

const bucket = "flexible-specification-tool";

// TODO: USE ENVIRONMENT VARIABLES!
const s3 = new AWS.S3({
    forcePathStyle: false,
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: 'us-east-1',
    credentials: {
        accessKeyId: "DO00J7MVH2LXA4Q3E496",
        secretAccessKey: "6d+GEEzDSy9Bxfp0Py5uBsNgDw+5EaBpdiAt3wIBy3w"
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
        console.log(response);
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