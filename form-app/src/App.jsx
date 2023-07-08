// App.js

import _ from 'lodash';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from './navigation/Sidebar';
import Header from './navigation/Header';
import {useState, useEffect, useContext} from 'react';

import { SpecContext } from "./specification-data/SpecContext";
import { getCurrentSpec, setCurrentSpec } from "./utilities/CookieUtils";

import schema from "./specification-data/v4.0.0/device.schema.json";

import { FlexiBLEDefaultVersion, createEmptySpec } from "./utilities/SpecificationUtils";
import { NotificationProvider } from "./notification/NotificationProvider";
import { Notification } from "./notification/Notification";
import {NotificationContext} from "./notification/NotificationContext";
import {AppRoutes} from "./navigation/AppRoutes";

function App() {
    const [spec, setSpec] = useState(null);
    const [specUrl, setSpecUrl] = useState(null);
    const [version, setVersion] = useState(FlexiBLEDefaultVersion);
    const { addNotification } = useContext(NotificationContext);

    useEffect(() => {
        const specCookie = getCurrentSpec();
        if (specCookie) {
            setSpec(specCookie.spec);
            addNotification({
                message: `Loading existing specification ${specCookie.spec.name}`,
                severity: 'info'
            })
        }
    }, []);

    useEffect(() => {
        const specCookie = getCurrentSpec();

        if ( spec !== null && specCookie && !_.isEqual(specCookie.spec, spec) ) {
            setCurrentSpec(spec);
        }


    }, [spec])

    console.log('process.env', process.env);

    return (
        <SpecContext.Provider value={{spec, setSpec, schema, specUrl, setSpecUrl}}>
            <NotificationProvider>
                <Router>
                <Box display="flex" flexDirection="column" height="100vh">
                    <Header spec={spec} setSpec={setSpec} version={version} setVersion={setVersion} />
                    <Box display="flex" flexGrow={1} overflow="hidden" style={{marginTop: 65}}>
                        <Sidebar />
                        <Box flexGrow={1} p={3} overflow="auto">
                            <AppRoutes spec={spec} setSpec={setSpec} />
                        </Box>
                    </Box>
                </Box>
                <Notification />
            </Router>
            </NotificationProvider>
        </SpecContext.Provider>
    );
}

export default App;
