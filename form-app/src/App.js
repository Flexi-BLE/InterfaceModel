// App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from './navigation/Sidebar';
import Header from './navigation/Header';
import Home from './home/Home';
import { useState, useEffect } from 'react';

import SpecForm from "./form/SpecForm";
import { SpecContext } from "./SpecContext";

import {
    GeneralUISchema,
    BLEDetailUISchema,
    ConfigUISchema,
    CommandUISchema,
    DataStreamUISchema
} from "./specification-data/v4.0.0/device.uiSchema.js";

import RAWJSONEditor from "./form/RawJSONEditor";

import {FlexiBLEDefaultVersion} from "./specification-data/FlexiBLESpecification";
function App() {
    const [spec, setSpec] = useState({});
    const [version, setVersion] = useState(FlexiBLEDefaultVersion);

    useEffect(() => {
        console.log('spec changed', spec);
    }, [spec])

    return (
        <SpecContext.Provider value={{spec, setSpec}}>
            <Router>
                <Box display="flex" flexDirection="column" height="100vh">
                    <Header spec={spec} setSpec={setSpec} version={version} setVersion={setVersion} />
                    <Box display="flex" flexGrow={1} overflow="hidden" style={{marginTop: 65}}>
                        <Sidebar />
                        <Box flexGrow={1} p={3} overflow="auto">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/spec-editor/general"
                                       element={<SpecForm spec={spec} setSpec={setSpec} uiSchema={GeneralUISchema} />}
                                />
                                <Route path="spec-editor/ble-details"
                                       element={<SpecForm spec={spec} setSpec={setSpec} uiSchema={BLEDetailUISchema} />}
                                />
                                <Route path={"spec-editor/config-values"}
                                       element={<SpecForm spec={spec} setSpec={setSpec} uiSchema={ConfigUISchema} />}
                                />
                                <Route path={"spec-editor/commands"}
                                       element={<SpecForm spec={spec} setSpec={setSpec} uiSchema={CommandUISchema} />}
                                />
                                <Route path={"spec-editor/data-streams"}
                                       element={<SpecForm spec={spec} setSpec={setSpec} uiSchema={DataStreamUISchema} />}
                                />
                                <Route path={"spec-editor/raw"}
                                       element={<RAWJSONEditor data={spec} setData={setSpec} />}
                                />
                            </Routes>
                        </Box>
                    </Box>
                </Box>
            </Router>
        </SpecContext.Provider>
    );
}

export default App;
