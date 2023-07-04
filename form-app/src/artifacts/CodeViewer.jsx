import { useState, useEffect, useContext } from 'react';
import Editor from '@monaco-editor/react';
import {SpecContext} from "../SpecContext";

import Mustache from 'mustache';
import SQLSchemaTemplate from './templates/flexible-db-schema.mustache.sql';

import { serializeSpec } from '../artifacts/TemplateSerializer';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const files = [
	{
		'name': 'spec.json',
		'code': (spec, setCode) => {
			setCode(JSON.stringify(spec, null, 2));
		}
	},
	{
		'name': 'spec.ir.json',
		'code': (spec, setCode) => {
			setCode(JSON.stringify(serializeSpec(spec), null, 2));
		}
	},
	{
		'name': 'spec.sql',
		'code': (spec, setCode) => {
			fetch(SQLSchemaTemplate)
				.then((res) => { res.text() })
				.then(text => {
					setCode(Mustache.render(text, serializeSpec(spec)));
				})

		}
	}
]

export const CodeViewer = () => {
	const { spec } = useContext(SpecContext);
	const [tabIndex, setTabIndex] = useState(0);
	const [code, setFileCode] = useState('');

	// Extract code generation function from files array
	useEffect(() => {
		const selectedFile = files[tabIndex];
		if (selectedFile && typeof selectedFile.code === 'function') {
			selectedFile.code(spec, setFileCode);
		}
	}, [tabIndex, spec]);

	const handleTabChange = (event, newValue) => {
		setTabIndex(newValue);
	};

	return (
		<div>
			<Tabs
				value={tabIndex}
				onChange={handleTabChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				{files.map((file, index) => (
					<Tab label={file.name} key={index} />
				))}
			</Tabs>

			<Editor
				height="90vh"
				theme="dark"
				language="javascript"
				value={code}
				onChange={(newCode) => setFileCode(newCode)}
			/>
		</div>
	);
};