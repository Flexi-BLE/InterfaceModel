import React from 'react';
import { getDefaultFormState } from "@rjsf/utils";
import { parseObject } from "./JSONSchemaFormUtils";

import Ajv from 'ajv'

import { customizeValidator } from "@rjsf/validator-ajv8";
const metaSchemaDraft06 = require('ajv/lib/refs/json-schema-draft-06.json');

export const FlexiBLEVersions = [
    "v0.4.0"
];

export const FlexiBLEDefaultVersion = "v0.4.0";

export const createEmptySpec = (schema) => {

    const validator = customizeValidator({
        additionalMetaSchemas: [metaSchemaDraft06],
    });

    return parseObject(getDefaultFormState(
        validator,
        schema,
        undefined,
        schema
    ), {}, 'root_');
}

export const downloadSpec = (spec) => {
    const json = JSON.stringify(spec, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href
    link.download = `${spec.name}_${spec.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const validateJSON = (json, schema) => {
    const ajv = new Ajv({ allErrors: false });
    const validate = ajv.compile(schema);
    const valid = validate(json);

    if (!valid) {
        console.log('JSON invalid: ', validate.errors);
        throw new Error('Invalid JSON structure: ' + JSON.stringify(validate.errors));
    } else {
        console.log('JSON valid!');
        return json;
    }
}

export const fetchAndValidateJSON = async (url, schema) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const ajv = new Ajv({ allErrors: false });
        const validate = ajv.compile(schema);
        const valid = validate(data);

        if (!valid) {
            console.log('JSON invalid: ', validate.errors);
            throw new Error('Invalid JSON structure: ' + JSON.stringify(validate.errors));
        } else {
            console.log('JSON valid!');
            return data;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};