import {useContext, useState} from 'react';
import { titleId } from '@rjsf/utils';
import { styled } from '@mui/material/styles';
import {
    Container,
    Card,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Button, IconButton
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ArrowForward, ArrowDownward, Delete, ArrowUpward} from "@mui/icons-material";
import {SpecContext} from "../../SpecContext";
import Grid from "@mui/material/Unstable_Grid2";

export const CollapsableField = (props) => {
    const {id, classNames, label, help, required, description, errors, children} = props;
    const [open, setOpen] = useState(true);

    console.log('collaposableFieldProps', props);

    return (
        <Accordion className={classNames}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={classNames + "-content"}
            id={id}
            >
            <Typography>{label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {children}
            </AccordionDetails>
        </Accordion>
    );
}

export const CollapsableArrayItem = (props) => {
    const { id, classNames, label, help, required, description, errors, children, formData } = props;

    console.log('CollapsableArrayItemProps', props);

    const onMoveUp = (event) => {
        event.stopPropagation();
    }

    const onMoveDown = (event) => {
        event.stopPropagation();
    }

    const onDelete = (event) => {
        event.stopPropagation();
    }

    return (
        <Accordion className={classNames} defaultExpanded={false} sx={{ m:2 }}>
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
    );
}

export const ArrayFieldItem = (props) => {
    const { children, className } = props;
    console.log('arrayFieldItemProps', props);
    return <div className={className}><h1>{ props.children.props.formData.name ? props.children.props.formData.name : props.index }</h1>{children}</div>;
}

export const Empty = (props) => {
    return (
        <span></span>
    )
}

export const EmptyWithChildren = ({ children, className }) => {
    return (
        <div className={className}>{children}</div>
    )
}

export const BasicArrayFieldTemplate = (props) => {
    return (
        <Grid>
            <div>
                {props.items.map((element) =>
                    <Box component="span" display="flex" key={element.key} className={element.className}>
                        {element.children}
                    </Box>
                )}
            </div>
        </Grid>
    );
}