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
import {SpecContext} from "../specification-data/SpecContext";

export default function UploadDialog({ open, onClose }) {
    const { spec, setSpec, schema, specUrl, setSpecUrl } = React.useContext(SpecContext);
    const [loading, setLoading] = React.useState(false);
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
            setError(null);
            setFileExists(false);
        }
    }, [open]);

    const handleUpload = async () => {
        setLoading(true);
        try {
            const fileUrl = await uploadFileToS3(spec); // make sure to implement this function, see below
            setSpecUrl(fileUrl);

            const fileName = fileUrl.split('/').pop();
            saveRecentSpec(spec, fileUrl);

            setSpec(spec);

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
                { fileExists && !error && !specUrl &&
                    <Alert severity="warning">
                        Specification already exists. Uploading will overwrite the file!
                    </Alert>
                }
                { error &&
                    <Alert severity="error">
                        Error uploading file: {error.message}
                    </Alert>
                }
                { specUrl &&
                    <Alert severity="success">
                        File uploaded successfully! <br />
                        <Link href={specUrl} target="_blank" rel="noopener">
                            {specUrl}
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