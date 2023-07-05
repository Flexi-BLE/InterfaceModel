import { useState, useEffect, useContext } from 'react';
import Editor from '@monaco-editor/react';
import {SpecContext} from "../specification-data/SpecContext";

import { Tab, Tabs, Box, Paper } from "@mui/material";
import {NotificationContext} from "../notification/NotificationContext";

import { files } from './GeneratedFiles';

export const CodeViewer = () => {
	const { spec } = useContext(SpecContext);
	const { addNotification } = useContext(NotificationContext);
	const [tabIndex, setTabIndex] = useState(0);
	const [code, setFileCode] = useState('');

	// Extract code generation function from files array
	useEffect(() => {
		const selectedFile = files[tabIndex];
		if (selectedFile && typeof selectedFile.code === 'function') {
			selectedFile.code(spec, setFileCode);
			addNotification({
				'message': 'rendered code for ' + selectedFile.name,
				'severity': 'info',
				'duration': 1000
			});
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

			<Box mt={2}>
				<Editor
					height="80vh"
					theme="dark"
					language={files[tabIndex].language}
					value={code}
					onChange={(newCode) => setFileCode(newCode)}
				/>
			</Box>
		</div>
	);
};