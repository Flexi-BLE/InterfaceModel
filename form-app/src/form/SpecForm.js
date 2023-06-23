import { useState } from 'react';
import { Container } from '@mui/material';
import Form from '@rjsf/mui';
import { customizeValidator } from '@rjsf/validator-ajv8';

import schema from '../data/device.schema.json';

// initialize validator based on draft-06 (generated from quick)
const metaSchemaDraft06 = require('ajv/lib/refs/json-schema-draft-06.json');
const validator = customizeValidator({
  additionalMetaSchemas: [metaSchemaDraft06],
});


function SpecForm(props) {

    const handleFormChange = ({ formData }) => {
        console.log('new spec: ', formData);
        props.setSpec(formData);
    }

    const handleFormSubmit = ({formData}, e) => {
        console.log('form submitted');
    }

    console.log('spec: ', props)

    return (
        <Container maxWidth="md">
            <Form
                sx={{ p: 10 }}
                schema={schema}
                uiSchema={props.uiSchema}
                formData={props.spec}
                validator={validator}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
              />
        </Container>
    );
}

export default SpecForm;
