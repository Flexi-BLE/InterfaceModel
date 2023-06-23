import { useState } from 'react';
import { titleId } from '@rjsf/utils';
import { 
    Container,
    Card,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    return (
        <Accordion className={classNames} defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={classNames + "-content"}
                id={id}
            >
                <Typography>{ formData.name ? formData.name : label }</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/*<div sx={{ p: 10 }}>*/}
                    {children}
                {/*</div>*/}
            </AccordionDetails>
        </Accordion>
    );
}

export const ArrayFieldItemTemplate = (props) => {
    const { children, className } = props;
    return <Card className={className} sx={{ m:2 }}>{children}</Card>;
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