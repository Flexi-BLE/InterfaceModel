import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../navigation/Sidebar';
import Home from '../home/Home';
import SpecForm from "../form/SpecForm";
import RAWJSONEditor from "../form/RawJSONEditor";
import { CodeViewer } from "../artifacts/CodeViewer";
import { uiSchemaForRoute } from "../specification-data/v4.0.0/device.uiSchema.js";

export const AppRoutes = ({spec, setSpec}) => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/spec-editor/general"
				element={
					<SpecForm
						spec={spec}
						setSpec={setSpec}
						uiSchema={uiSchemaForRoute('general')}
					/>
				}
			/>
			<Route
				path="spec-editor/ble-details"
				element={
					<SpecForm
						spec={spec}
						setSpec={setSpec}
						uiSchema={uiSchemaForRoute('ble-details')}
					/>
				}
			/>
			<Route
				path={"spec-editor/config-values"}
				element={
					<SpecForm
						spec={spec}
						setSpec={setSpec}
						uiSchema={uiSchemaForRoute('config-values')}
					/>
				}
			/>
			<Route
				path={"spec-editor/commands"}
				element={
					<SpecForm
						spec={spec}
						setSpec={setSpec}
						uiSchema={uiSchemaForRoute('commands')}
					/>
				}
			/>
			<Route
				path={"spec-editor/data-streams"}
				element={
					<SpecForm
						spec={spec}
						setSpec={setSpec}
						uiSchema={uiSchemaForRoute('data-streams')}
					/>
				}
			/>
			<Route
				path={"spec-editor/raw"}
				element={
					<RAWJSONEditor data={spec} setData={setSpec} />
				}
			/>
			<Route
				path={"/artifacts"}
				element={
					<CodeViewer />
				}
			/>
		</Routes>
	);
}
