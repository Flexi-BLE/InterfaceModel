import React from "react";
export const SpecContext = React.createContext({
    spec: null,
    setSpec: () => {},
    schema: null,
    specUrl: null,
    setSpecUrl: () => {},
});