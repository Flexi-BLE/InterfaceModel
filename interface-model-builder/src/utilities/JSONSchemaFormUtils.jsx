import React from "react";
import { v4 as uuidv4 } from 'uuid';

export const incrementUUIDFirstSet = (uuid, increment = 1) => {
    return uuid.replace(/([0-9a-f]{8})-/, (match, firstSet) => {
        const incrementedFirstSet = (parseInt(firstSet, 16) + increment).toString(16).padStart(8, '0');
        return `${incrementedFirstSet}-`;
    });
};

const schemaIdToPath = (schemaId) => {
    return schemaId
        .replace('root_', '')
        .split('_')
        .filter((item) => item !== '');
}

const getPropertyAtPath = (obj, path) => {
    let current = obj;
    for (let i = 0; i < path.length; i++) {
        const key = Number.isNaN(Number.parseInt(path[i])) ? path[i] : Number.parseInt(path[i]);
        current = current[key];
    }

    return current;
}

export const getPropertyWithSchemaId = (obj, schemaId) => {
    return getPropertyAtPath(obj, schemaIdToPath(schemaId));
}

const setProperty = (obj, path, value, index = null) => {
    let current = obj;
    for (let i = 0; i < path.length - 1; i++) {
        const key = Number.isNaN(Number.parseInt(path[i])) ? path[i] : Number.parseInt(path[i]);
        current = current[key];
    }

    const lastKey = Number.isNaN(Number.parseInt(path[path.length - 1])) ? path[path.length - 1] : Number.parseInt(path[path.length - 1]);

    if (index !== null && Array.isArray(current[lastKey])) {
        current[lastKey].splice(index, 0, value);
    } else {
        current[lastKey] = value;
    }
}

export const setProperyWithSchemaId = (obj, schemaId, value, index = null) => {
    setProperty(obj, schemaIdToPath(schemaId), value, index);
}

const moveItemAtPath = (obj, path, increment) => {
    let current = obj;
    for (let i = 0; i < path.length - 1; i++) {
        const key = Number.isNaN(Number.parseInt(path[i])) ? path[i] : Number.parseInt(path[i]);
        current = current[key];
    }

    const lastKey = Number.isNaN(Number.parseInt(path[path.length - 1])) ? path[path.length - 1] : Number.parseInt(path[path.length - 1]);
    const array = current;
    const newIndex = lastKey + increment;

    if (Array.isArray(array) && array.length > newIndex) {
        const item = array.splice(path[path.length - 1], 1)[0];
        array.splice(newIndex, 0, item);
    }
};

export const moveItemAtSchemaId = (obj, schemaId, newIndex) => {
    moveItemAtPath(obj, schemaIdToPath(schemaId), newIndex);
};

const removeItemAtPath = (obj, path) => {
    let current = obj;
    for (let i = 0; i < path.length - 1; i++) {
        const key = Number.isNaN(Number.parseInt(path[i])) ? path[i] : Number.parseInt(path[i]);
        current = current[key];
    }

    const lastKey = Number.isNaN(Number.parseInt(path[path.length - 1])) ? path[path.length - 1] : Number.parseInt(path[path.length - 1]);
    const array = current

    if (Array.isArray(array)) {
        array.splice(lastKey, 1);
    }
};

export const removeItemAtSchemaId = (obj, schemaId) => {
    removeItemAtPath(obj, schemaIdToPath(schemaId));
}

export const parseObject = (json, spec, schemaId) => {
    var str = JSON.stringify(json);

    // replace __UUID__ with new uuid
    const uuidRegex = /"__UUID__"/g;

    const uuid = uuidv4();
    str = str.replace(uuidRegex, `"${uuid}"`);

    // find any occurance of __UUID+1__ and replace with incremented uuid (but "1" could be any number)
    const uuidRegex2 = /"__UUID\+([0-9]+)__"/g;
    str = str.replace(uuidRegex2, (match, increment) => {
        return `"${incrementUUIDFirstSet(uuid, Number.parseInt(increment))}"`;
    });

    const element = getPropertyWithSchemaId(spec, schemaId);

    if (Array.isArray(element)) {
        const indexToken = "__INDEX__";
        str = str.replace(indexToken, element.length);
    }

    if (Array.isArray(element)) {
        const indexToken = "__POSITION__";
        str = str.replace(indexToken, element.length+1);
    }

    return JSON.parse(str);
}