import { useState, useEffect, useContext } from 'react';
import Editor from '@monaco-editor/react';

import _ from 'lodash';

import { serializeSpec } from '../artifacts/TemplateSerializer';
import { createEmptySpec } from "../utilities/SpecificationUtils";
import schema from "../specification-data/v4.0.0/device.schema.json";
import {SpecContext} from "../specification-data/SpecContext";

export const IntermediateSpecificationEditor = () => {
    const { spec, setSpec, schema } = useContext(SpecContext);

    const [editorJson, setEditorJSON] = useState(null);

    useEffect(() => {
        var newSpec = _.cloneDeep(spec);
        serializeSpec(newSpec);
        console.log('serialized spec', newSpec);
        setEditorJSON(JSON.stringify(newSpec, null, 2));
    }, [spec])

    return (
        <main>
            { editorJson &&
                <Editor
                    height="90vh"
                    defaultLanguage="json"
                    defaultValue={editorJson}
                />
            }
        </main>
    );
}


