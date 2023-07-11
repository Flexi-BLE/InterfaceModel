import React from 'react'

import AccelDataStream from './Acceleration.json'
import RandomNumberDataStream from './RandomNumber.json'

import { v4 as uuid } from 'uuid';
import { incrementUUIDFirstSet } from "../../../../utilities/JSONSchemaFormUtils";

export const ExampleDataStreams = [
    {
        "title": "Acceleration",
        "spec": AccelDataStream
    },
    {
        "title": "Random Number",
        "spec": RandomNumberDataStream
    }
]
