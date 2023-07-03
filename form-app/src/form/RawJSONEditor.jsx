import React from 'react';
import Editor from '@monaco-editor/react';

function RAWJSONEditor({ data, setData }) {
    // You will replace this with your artifacts display logic
    let obj = JSON.stringify(data, null, 2);

    const handleEditorChange = (value, event) => {
        setData(JSON.parse(value));
    }

    return (
        <main>
            <Editor
                height="90vh"
                defaultLanguage="json"
                defaultValue={obj}
                onChange={handleEditorChange} />
        </main>
    );
}

export default RAWJSONEditor;