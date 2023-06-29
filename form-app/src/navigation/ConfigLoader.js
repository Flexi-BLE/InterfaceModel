import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MonacoEditor from '@monaco-editor/react';

function ConfigLoader({ open, onClose }) {
    const [tabValue, setTabValue]   = useState(0);
    const [specURL, setSpecURL] = useState("");
    const [specJSON, setSpecJSON] = useState("");

    const handlTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLoad = () => {

    }

    return (
        <Dialog open={open} onClose={onClose} sz={{ p:4 }}>
            <DialogTitle>Load Configuration</DialogTitle>
            <DialogContent sx={{ p:4 }} >
                <Tabs value={tabValue} onChange={handlTabChange}>
                    <Tab label="URL" />
                    <Tab label="JSON" />
                    <Tab label="Examples" />
                </Tabs>
                {tabValue === 0 && (
                    <TextField label="Enter URL" fullWidth variant="outlined" margin="normal" id="url" value={specURL}/>
                )}
                {tabValue === 1 && (
                    <MonacoEditor language="json" theme="vs-dark" height="50vh" />
                )}
                {tabValue === 2 && (
                    <div>Examples</div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleLoad}>Load</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfigLoader;