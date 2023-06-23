// App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from './navigation/Sidebar';
import Header from './navigation/Header';
import Home from './home/Home';
import { useState } from 'react';

import SpecForm from "./form/SpecForm";

import {
    GeneralUISchema,
    BLEDetailUISchema,
    ConfigUISchema,
    CommandUISchema,
    DataStreamUISchema
} from "./data/device.uiSchema.js";
import RAWJSONEditor from "./form/RawJSONEditor";
function App() {
    const [spec, setSpec] = useState({});


    const didUpdateSpec = (spec) => {
        console.log('PARENT: new spec: ', spec);
        setSpec(spec);
    }

    return (
        <Router>
            <Box display="flex" flexDirection="column" height="100vh">
                <Header />
                <Box display="flex" flexGrow={1} overflow="hidden" style={{marginTop: 65}}>
                    <Sidebar />
                    <Box flexGrow={1} p={3} overflow="auto">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/spec-editor/general"
                                   element={<SpecForm spec={spec} setSpec={didUpdateSpec} uiSchema={GeneralUISchema} />}
                            />
                            <Route path="spec-editor/ble-details"
                                   element={<SpecForm spec={spec} setSpec={didUpdateSpec} uiSchema={BLEDetailUISchema} />}
                            />
                            <Route path={"spec-editor/config-values"}
                                   element={<SpecForm spec={spec} setSpec={didUpdateSpec} uiSchema={ConfigUISchema} />}
                            />
                            <Route path={"spec-editor/commands"}
                                   element={<SpecForm spec={spec} setSpec={didUpdateSpec} uiSchema={CommandUISchema} />}
                            />
                            <Route path={"spec-editor/data-streams"}
                                   element={<SpecForm spec={spec} setSpec={didUpdateSpec} uiSchema={DataStreamUISchema} />}
                            />
                            <Route path={"spec-editor/raw"}
                                   element={<RAWJSONEditor data={spec} setData={didUpdateSpec} />}
                            />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
