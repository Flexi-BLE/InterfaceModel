import React, {useEffect} from 'react';
import {Button, Menu, MenuItem, IconButton, Tooltip} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';

import { SpecContext } from "../specification-data/SpecContext";
import { downloadSpec } from "../utilities/SpecificationUtils";
import UploadDialog from "./UploadDialog";
import SpecificationLoader from "./SpecificationLoader";
import {getCurrentSpec} from "../utilities/CookieUtils";

function SpecMenu() {
    const { spec, setSpec, specUrl } = React.useContext(SpecContext);
    const [specCookie, setSpecCookie] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
    const [configDialogOpen, setConfigDialogOpen] = React.useState(false);

    useEffect(() => {

        setSpecCookie(getCurrentSpec());

    }, [spec, specUrl])

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(specCookie.url);
            console.log('linked copied');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        setAnchorEl(null);
    };

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
                <>
                    { spec && spec.name ? spec.name : "New Spec"}
                    { (!specCookie || !specCookie.url) &&
                        <Tooltip title="Specification not saved to cloud">
                            <SdCardAlertIcon sx={{ ml: 1 }} />
                        </Tooltip>
                    }
                </>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {specCookie && specCookie.url &&
                    <MenuItem onClick={handleCopyLink}>
                        <IconButton
                            color="primary"
                            aria-label="upload specification"
                            component="span"
                        >
                            <ContentCopyIcon />
                        </IconButton>
                        Copy Spec URL
                    </MenuItem>
                }
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
            <UploadDialog open={uploadDialogOpen} onClose={() => { setUploadDialogOpen(false) }} />
            <SpecificationLoader open={configDialogOpen} onClose={() => { setConfigDialogOpen(false) }} />
        </div>
    );
}

export default SpecMenu;