import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Collapse, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArchiveIcon from '@mui/icons-material/Archive';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/StarBorder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import StreamIcon from '@mui/icons-material/Stream';
import TagIcon from '@mui/icons-material/Tag';

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
    width: open ? drawerWidthOpen : drawerWidthClosed,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
        width: open ? drawerWidthOpen : drawerWidthClosed,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        height: '100vh',
    },
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
}));

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isSpecOpen, setIsSpecOpen] = React.useState(true);

    const handleDrawer = () => {
        setIsSpecOpen(false);
        setIsOpen(!isOpen);
    };

    const handleSpecClick = () => {
        setIsSpecOpen(!isSpecOpen);
    };

    const list = () => (
        <List>
            <ListItem button component={Link} to="/">
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="Home" />}
            </ListItem>
            <ListItemButton onClick={handleSpecClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Editor" />
                {isSpecOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isSpecOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/spec-editor/general">
                        <ListItemIcon>
                            <FormatAlignLeftIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="General" />}
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/spec-editor/ble-details">
                        <ListItemIcon>
                            <BluetoothIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="BLE Details" />}
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/spec-editor/config-values">
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="Configurations" />}
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/spec-editor/commands">
                        <ListItemIcon>
                            <TagIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="Commands" />}
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/spec-editor/data-streams">
                        <ListItemIcon>
                            <StreamIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="Data Streams" />}
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/spec-editor/raw">
                        <ListItemIcon>
                            <DataObjectIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="Raw JSON Editor" />}
                    </ListItemButton>
                </List>
            </Collapse>
            <ListItem button component={Link} to="/artifacts">
                <ListItemIcon>
                    <ArchiveIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="Artifacts" />}
            </ListItem>
        </List>
    );

    return (
        <StyledDrawer variant="permanent" open={isOpen}>
            <Box display="flex" flexDirection="column" style={{marginTop: 65}}>
                {list()}
                <Box mt="auto"> {/* This will push the ToggleButton to bottom */}
                    <ToggleButton onClick={handleDrawer}>
                        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </ToggleButton>
                </Box>
            </Box>
        </StyledDrawer>
    );
}

export default Sidebar;
