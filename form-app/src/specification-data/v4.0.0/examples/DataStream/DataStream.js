import React from 'react'

import AccelDataStream from './Acceleration.json'
import RandomNumberDataStream from './RandomNumber.json'

import { v4 as uuid } from 'uuid';
import { incrementUUIDFirstSet } from "../../../../Utils";

export const dataStreamRecycleUUID = (dataStream) => {
    const baseUUID = uuid();
    dataStream.id = baseUUID;
    dataStream.ble.service_uuid = incrementUUIDFirstSet(baseUUID, 0);
    dataStream.ble.data_char_uuid = incrementUUIDFirstSet(baseUUID, 1);
    dataStream.ble.config_char_uuid = incrementUUIDFirstSet(baseUUID, 2);
    return dataStream;
}

export const defaultDataStream = () => {

}

export const ExampleDataStreams = {
    "Acceleration": AccelDataStream,
    "Random Number": RandomNumberDataStream
}
