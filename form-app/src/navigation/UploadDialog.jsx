import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
    Alert,
    Link
} from '@mui/material';
import { uploadFileToS3, doesFileExist } from '../utilities/S3Service' // make sure to implement this function, see below
import { saveRecentSpec } from '../utilities/CookieUtils';
export default function UploadDialog({ open, onClose, spec }) {
    const [loading, setLoading] = React.useState(false);
    const [url, setUrl] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [fileExists, setFileExists] = React.useState(false);

    const checkFileExists = async () => {
        const exist = await doesFileExist(spec);
        console.log('file exists', exist);
        setFileExists(exist);
    }

    React.useEffect(() => {
        if (open) {
            checkFileExists();
        } else {
            setLoading(false);
            setUrl(null);
            setError(null);
            setFileExists(false);
        }
    }, [open]);

    const handleUpload = async () => {
        setLoading(true);
        try {
            const fileUrl = await uploadFileToS3(spec); // make sure to implement this function, see below
            setUrl(fileUrl);

            const fileName = fileUrl.split('/').pop();
            saveRecentSpec(spec, fileUrl);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // TODO: add a CAPCHA to the upload form

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Upload Specification</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to upload your FlexiBLE specification to a public S3 bucket.
                    Meaning this will be available to anyone with the URL.
                    Do you want to proceed?
                </DialogContentText>
                { fileExists && !error && !url &&
                    <Alert severity="warning">
                        Specification already exists. Uploading will overwrite the file!
                    </Alert>
                }
                { error &&
                    <Alert severity="error">
                        Error uploading file: {error.message}
                    </Alert>
                }
                { url &&
                    <Alert severity="success">
                        File uploaded successfully! <br />
                        <Link href={url} target="_blank" rel="noopener">
                            {url}
                        </Link>
                    </Alert>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleUpload} disabled={loading}>Upload</Button>
            </DialogActions>
        </Dialog>
    );
}