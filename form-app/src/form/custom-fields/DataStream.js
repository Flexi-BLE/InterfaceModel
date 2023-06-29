import {useContext, useState} from 'react';

import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    FormControl, IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import {} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Unstable_Grid2';
import { v4 as uuid } from 'uuid';

import { SpecContext } from '../../SpecContext';
import { ExampleSelect } from "./ExampleSelect";
import { incrementUUIDFirstSet } from "../../Utils";
import { dataStreamRecycleUUID, ExampleDataStreams } from "../../specification-data/v4.0.0/examples/DataStream/DataStream";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ArrowDownward, ArrowUpward, Delete} from "@mui/icons-material";

const baseDataStream = (name = "MyDataStream") => {
    var baseUUID = uuid();
    return {
        id: baseUUID,
        name: name,
        ble: {
            "service_uuid": baseUUID,
            "data_char_uuid": incrementUUIDFirstSet(baseUUID, 1),
            "config_char_uuid": incrementUUIDFirstSet(baseUUID, 2),
        },
        config_values: [],
        data_values: []
    };
};

export const DataStreamConfigTitleField = (props) => {
    const { spec, setSpec } = useContext(SpecContext);

    console.log('DataStreamConfigTitleField props', props);
    const configIndex = props.id.match(/\d+/)[0];

    const handleAdd = (event) => {
        event.stopPropagation();

        const newSpec = JSON.parse(JSON.stringify(spec));
        newSpec.data_streams[configIndex].config_values.push({
            "name": "MyConfigValue",
            "type": "uint8",
            "size": 1,
            "offset": 0,
            "access": "read-write",
            "default": 0,
            "unit": "",
            "description": ""
        });
        setSpec(newSpec);
    }

    const handleExampleChange = (event) => {


    }

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{props.title}</Typography>
                <Box display="flex" gap={2} alignItems="center">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                    <ExampleSelect options={Object.keys(ExampleDataStreams)} onSelection={handleExampleChange} />
                </Box>
            </Box>
            <Divider />
        </>
    )
}

export const DataStreamCollapsableArrayItem = (props) => {
    const { spec, setSpec } = useContext(SpecContext);
    const { id, classNames, label, help, required, description, errors, children, formData } = props;

    console.log('DataStreamCollapsableArrayItem props', props);

    const onMoveUp = (event) => {
        event.stopPropagation();

        const newSpec = JSON.parse(JSON.stringify(spec));
        const index = newSpec.data_streams.findIndex((item) => item.id === formData.id);
        if (index > 0) {
            var temp = newSpec.data_streams[index];
            newSpec.data_streams[index] = newSpec.data_streams[index - 1];
            newSpec.data_streams[index - 1] = temp;
            setSpec(newSpec);
        }
    }

    const onMoveDown = (event) => {
        event.stopPropagation();

        const newSpec = JSON.parse(JSON.stringify(spec));
        const index = newSpec.data_streams.findIndex((item) => item.id === formData.id);
        if (index < newSpec.data_streams.length - 1) {
            var temp = newSpec.data_streams[index];
            newSpec.data_streams[index] = newSpec.data_streams[index + 1];
            newSpec.data_streams[index + 1] = temp;
            setSpec(newSpec);
        }
    }

    const onDelete = (event) => {
        event.stopPropagation();

        const newSpec = JSON.parse(JSON.stringify(spec));
        const index = newSpec.data_streams.findIndex((item) => item.id === formData.id);
        if (index > -1) {
            newSpec.data_streams.splice(index, 1);
            setSpec(newSpec);
        }
    }

    return (
        <Box display="flex" flexDirection="column" width="100%" sx={{ m: 1 }}>
            <Accordion
                className={classNames}
                defaultExpanded={false}
                sx={{ p: 1, border: '1px solid grey', boxShadow: 'none' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={classNames + "-content"}
                    id={id}
                >
                    <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                        <Typography align="left">{ formData.name ? formData.name : label }</Typography>
                        <Box display="flex" alignItems="center">
                            <IconButton color="primary" onClick={onMoveUp}>
                                <ArrowUpward />
                            </IconButton>
                            <IconButton color="primary" onClick={onMoveDown}>
                                <ArrowDownward />
                            </IconButton>
                            <IconButton color="error" onClick={onDelete}>
                                <Delete />
                            </IconButton>
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box display="flex" flexDirection="column" width="100%">
                        {children}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export const DataStreamTitleField = (props) => {
    const { spec, setSpec } = useContext(SpecContext);

    console.log('data stream title field props', props);

    const handleExampleChange = (selection) => {
        const newSpec = JSON.parse(JSON.stringify(spec));
        const example = ExampleDataStreams[selection];
        newSpec.data_streams.push(dataStreamRecycleUUID(example));
        setSpec(newSpec);
    };

    const handleAdd = (event) => {
        const newSpec = JSON.parse(JSON.stringify(spec));
        // eslint-disable-next-line no-template-curly-in-string
        newSpec.data_streams.push(baseDataStream("DataStream " + spec.data_streams.length));
        setSpec(newSpec);
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Data Streams</Typography>
                <Box display="flex" gap={2} alignItems="center">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                    <ExampleSelect options={Object.keys(ExampleDataStreams)} onSelection={handleExampleChange} />
                </Box>
            </Box>
            <Divider />
        </>
    )
}