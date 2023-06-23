import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute',
    top: 0,
}));

function Header() {
    return (
        <StyledAppBar>
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    FlexiBLE Device Specification Editor
                </Typography>
                <IconButton color="inherit" href="https://github.com" target="_blank">
                    <GitHubIcon />
                </IconButton>
            </Toolbar>
        </StyledAppBar>
    );
}

export default Header;
