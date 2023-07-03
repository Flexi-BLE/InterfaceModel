// App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from './navigation/Sidebar';
import Header from './navigation/Header';
import Home from './home/Home';
import { useState, useEffect } from 'react';

import SpecForm from "./form/SpecForm";
import { SpecContext } from "./SpecContext";

import { uiSchema, schemaRouteDetails, uiSchemaForRoute } from "./specification-data/v4.0.0/device.uiSchema.js";
import schema from './specification-data/v4.0.0/device.schema.json';

import RAWJSONEditor from "./form/RawJSONEditor";
import {IntermediateSpecificationEditor} from "./form/IntermediateSpecificationEditor";

import { FlexiBLEDefaultVersion, createEmptySpec } from "./utilities/SpecificationUtils";
function App() {
    const [spec, setSpec] = useState(createEmptySpec(schema));
    const [version, setVersion] = useState(FlexiBLEDefaultVersion);

    useEffect(() => {
        console.log('spec changed', spec);
    }, [spec])

    return (
        <SpecContext.Provider value={{spec, setSpec, schema}}>
            <Router>
                <Box display="flex" flexDirection="column" height="100vh">
                    <Header spec={spec} setSpec={setSpec} version={version} setVersion={setVersion} />
                    <Box display="flex" flexGrow={1} overflow="hidden" style={{marginTop: 65}}>
                        <Sidebar />
                        <Box flexGrow={1} p={3} overflow="auto">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/spec-editor/general"
                                    element={
                                        <SpecForm
                                            spec={spec}
                                            setSpec={setSpec}
                                            uiSchema={uiSchemaForRoute('general')}
                                        />
                                    }
                                />
                                <Route
                                    path="spec-editor/ble-details"
                                    element={
                                        <SpecForm
                                            spec={spec}
                                            setSpec={setSpec}
                                            uiSchema={uiSchemaForRoute('ble-details')}
                                        />
                                    }
                                />
                                <Route
                                    path={"spec-editor/config-values"}
                                    element={
                                        <SpecForm
                                            spec={spec}
                                            setSpec={setSpec}
                                            uiSchema={uiSchemaForRoute('config-values')}
                                        />
                                    }
                                />
                                <Route
                                    path={"spec-editor/commands"}
                                    element={
                                        <SpecForm
                                            spec={spec}
                                            setSpec={setSpec}
                                            uiSchema={uiSchemaForRoute('commands')}
                                        />
                                    }
                                />
                                <Route
                                    path={"spec-editor/data-streams"}
                                    element={
                                        <SpecForm
                                            spec={spec}
                                            setSpec={setSpec}
                                            uiSchema={uiSchemaForRoute('data-streams')}
                                        />
                                    }
                                />
                                <Route
                                    path={"spec-editor/raw"}
                                   element={
                                        <RAWJSONEditor data={spec} setData={setSpec} />
                                    }
                                />
                                <Route
                                    path={"/artifacts"}
                                    element={
                                        <IntermediateSpecificationEditor />
                                    }
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
