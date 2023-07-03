import {useContext} from "react";
import {SpecContext} from "../../SpecContext";
import {moveItemAtSchemaId, removeItemAtSchemaId} from "../../utilities/JSONSchemaFormUtils";
import {Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ArrowDownward, ArrowUpward, Delete} from "@mui/icons-material";

export const CollapsableArrayItemTemplate = (props) => {
    const { spec, setSpec } = useContext(SpecContext);
    const { id, classNames, label, children, formData } = props;

    const onMoveUp = (event) => {
        event.stopPropagation();

        const newSpec = JSON.parse(JSON.stringify(spec));
        moveItemAtSchemaId(newSpec, id, -1);

        setSpec(newSpec);
    }

    const onMoveDown = (event) => {
        event.stopPropagation();

        const newSpec = JSON.parse(JSON.stringify(spec));
        moveItemAtSchemaId(newSpec, id, 1);

        setSpec(newSpec);
    }

    const onDelete = (event) => {
        event.stopPropagation();

        const newSpec = JSON.parse(JSON.stringify(spec));
        removeItemAtSchemaId(newSpec, id);

        setSpec(newSpec);
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
                    {children}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}