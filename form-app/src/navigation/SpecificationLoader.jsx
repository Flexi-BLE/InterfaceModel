import { useContext, useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MonacoEditor from '@monaco-editor/react';

import { fetchAndValidateJSON, validateJSON } from '../utilities/SpecificationUtils';
import { isValidUrl } from '../utilities/GeneralUtilities';
import { SpecContext } from "../SpecContext";
import {Alert, Box, Typography} from "@mui/material";
import RecentSpecsTable from "./RecentSpecs";

function SpecificationLoader({ open, onClose }) {
    const { spec, setSpec, schema } = useContext(SpecContext);
    const [tabValue, setTabValue]   = useState(0);
    const [specURL, setSpecURL] = useState("");
    const [editorJSON, setEditorJSON] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    // effect to clear state
    useEffect(() => {
        if (!open) {
            setTabValue(0);
            setSpecURL("");
            setErrorMessage(null);
        }
    }, [open]);

    const handlTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLoadURL = async (url) => {

        setErrorMessage(null);

        // verify specURL is a valid URL
        if (!isValidUrl(url)) {
            setErrorMessage("Invalid URL: url must be a valid URL");
            return;
        }

        if (!url.endsWith('.json')) {
            setErrorMessage("Invalid URL: url must be a raw json file");
            return;
        }

        try {
            const json = await fetchAndValidateJSON(url, schema);
            setSpec(json);
            onClose();
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const handleEditorChange = (value, event) => {
        setEditorJSON(JSON.parse(value));
    }

    const loadJSON = (json) => {
        setErrorMessage(null);
        try {
            validateJSON(json, schema);
            setSpec(json);
            onClose();
        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} sz={{ p:4 }}>
            <DialogTitle>Load Configuration</DialogTitle>
            <DialogContent sx={{ p:4, m:2 }} >
                <Tabs value={tabValue} onChange={handlTabChange}>
                    <Tab label="URL" />
                    <Tab label="JSON" />
                    <Tab label="Examples" />
                </Tabs>
                {errorMessage &&
                    <Alert severity="error">{errorMessage}</Alert>
                }
                {tabValue === 0 && (
                    <Box sx={{ p:2 }}>

                        <TextField
                            label="Enter URL"
                            fullWidth variant="outlined"
                            margin="normal"
                            id="url"
                            onChange={(e) => setSpecURL(e.target.value)}
                        />
                        <Typography variant="h6">Recent Specifications</Typography>
                        <RecentSpecsTable handleLoadURL={handleLoadURL} />
                    </Box>
                )}
                {tabValue === 1 && (
                    <MonacoEditor
                        height="50vh"
                        width="50vh"
                        defaultLanguage="json"
                        defaultValue={JSON.stringify(editorJSON, null, 2)}
                        onChange={handleEditorChange}
                    />
                )}
                {tabValue === 2 && (
                    <Box sx={{ m:2 }}>
                        <Typography variant="body1">Coming Soon ... Examples</Typography>
                    </Box>

                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                {tabValue === 0 &&
                    <Button onClick={() => {handleLoadURL(specURL)}}>Load</Button>
                }
                { tabValue === 1 &&
                    <Button onClick={() => {loadJSON(editorJSON)}}>Load</Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default SpecificationLoader;