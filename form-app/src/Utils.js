import React from "react";

export const incrementUUIDFirstSet = (uuid, increment = 1) => {
    return uuid.replace(/([0-9a-f]{8})-/, (match, firstSet) => {
        const incrementedFirstSet = (parseInt(firstSet, 16) + increment).toString(16).padStart(8, '0');
        return `${incrementedFirstSet}-`;
    });
};