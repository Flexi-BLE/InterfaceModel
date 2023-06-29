import React from 'react';
import Form from "@rjsf/mui";
import {Container} from "@mui/material";
import { customizeValidator } from '@rjsf/validator-ajv8';

import schema from '../specification-data/v4.0.0/device.schema.json';
import { GeneralUISchema } from '../specification-data/v4.0.0/device.uiSchema.js'

// initialize validator based on draft-06 (generated from quick)
const metaSchemaDraft06 = require('ajv/lib/refs/json-schema-draft-06.json');
const validator = customizeValidator({
    additionalMetaSchemas: [metaSchemaDraft06],
});

function Specification({ spec, setSpec }) {
    // You will replace this with your form logic
    return (
        <main>
            <Container maxWidth="lg">
                <Form
                    schema={schema}
                    uiSchema={GeneralUISchema}
                    formData={spec}
                    validator={validator}
                    onChange={({ formData }) => setSpec(formData)}
                    onSubmit={() => console.log('form submitted')}
                />
            </Container>
        </main>
    );
}

export default Specification;