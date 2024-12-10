import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getRecentSpecs } from '../utilities/CookieUtils';

function RecentSpecsTable({ handleLoadURL }) {
    const [recentSpecs, setRecentSpecs] = useState([]);

    useEffect(() => {
        const specs = getRecentSpecs();
        setRecentSpecs(specs);
    }, []);

    const loadSpec = (url) => {
        window.open(url, "_blank"); // opens the spec URL in a new tab
    }

    return (
        <TableContainer component={Paper} sx={{ minWidth: "300px" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Load</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recentSpecs.map((recent) => (
                        <TableRow key={recent.id}>
                            <TableCell>{recent.name}</TableCell>
                            <TableCell>{new Date(recent.date).toLocaleDateString()} {new Date(recent.date).toLocaleTimeString()}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleLoadURL(recent.url)}>Load</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RecentSpecsTable;