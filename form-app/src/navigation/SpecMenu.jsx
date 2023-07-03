import React from 'react';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { SpecContext } from "../SpecContext";
import { downloadSpec } from "../utilities/SpecificationUtils";
import UploadDialog from "./UploadDialog";
import SpecificationLoader from "./SpecificationLoader";

function SpecMenu() {
    const { spec, setSpec } = React.useContext(SpecContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
    const [configDialogOpen, setConfigDialogOpen] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDownload = () => {
        console.log("DOWNLOAD");
        downloadSpec(spec);
        setAnchorEl(null);
    };

    const openUpload = () => {
        setUploadDialogOpen(true);
        setAnchorEl(null);
    };

    const openConfig = () => {
        setConfigDialogOpen(true);
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                variant="outlined"
                color="secondary"
                sx={{
                    borderColor: 'white',
                    color: 'white',
                    mr: 2
                }}
                onClick={handleClick}
            >
                {spec.name ? spec.name : "New Spec"}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDownload}>
                    <IconButton
                        color="primary"
                        aria-label="upload specification"
                        component="span"
                    >
                        <CloudDownloadIcon />
                    </IconButton>
                    Download
                </MenuItem>
                <MenuItem onClick={openUpload}>
                    <IconButton color="primary" aria-label="upload specification" component="span">
                        <CloudUploadIcon />
                    </IconButton>
                    Upload
                </MenuItem>
                <MenuItem onClick={openConfig} >
                    <IconButton color="primary" aria-label="load specification" component="span">
                        <InsertDriveFileIcon />
                    </IconButton>
                    Load
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <IconButton color="error" aria-label="delete specification" component="span">
                        <DeleteForeverIcon />
                    </IconButton>
                    Delete
                </MenuItem>
            </Menu>
            <UploadDialog open={uploadDialogOpen} onClose={() => { setUploadDialogOpen(false) }} spec={spec} />
            <SpecificationLoader open={configDialogOpen} onClose={() => { setConfigDialogOpen(false) }} />
        </div>
    );
}

export default SpecMenu;