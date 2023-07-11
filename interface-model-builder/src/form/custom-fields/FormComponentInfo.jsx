import { useState } from "react";
import {Typography, Button, Box} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

const DataStreamDescription = () => {
	return (
		<>
			<Typography variant="body1" paragraph>
				Time Series data streams define data that is produced by the device and requires a concept of time. Usually this is data coming from a sensor, either in a raw format, or as a computed value. Examples include temperature, humidity, or acceleration.
			</Typography>

			<Typography variant="body1" paragraph>
				These data streams require the device to synchronize time over a BLE connection with a FlexiBLE client application, which happens automatically on connection. Data streams consist of <b>configurations</b>, runtime variables associated with the steam, and <b>data values</b>, the data points that are sent from the device (create an expand a data stream to learn more).
			</Typography>

			<Typography variant="body1" paragraph>
				These definitions inform both FlexiBLE's client applications and firmware interface library. Client's can use these definitions to automatically generate UIs for configuring and displaying time series data. The interface library will implement a GATT service for each data stream and provide access methods for retrieving configurations and recording data values. The developer will then use these method to implement the firmware's logic.
			</Typography>
		</>
	)
};

const DataStreamConfigurationDescription = () => {
	return (
		<>
			<Typography variant="body1" paragraph>
				Data stream configuration are runtime variables associated with a data stream, for example toggle a data stream on or off, setting the sampling rate, or adjusting a sensor calibration value like the gain of a photo-diode.
			</Typography>
		</>
	)
};

const DataStreamDataValueDescription = () => {
	return (
		<>
			<Typography variant="body1" paragraph>
				Data stream data values are the data points that are sent from the device. They are defined by a data type, which can be a primitive type like a number or string. These values are packaged and sent to the client application along with reference to a timestamp, which then allows them to be stored in the client's database.
			</Typography>
		</>
	)
}

const DeviceConfigurationDescription = () => {
	return (
		<>
			<Typography variant="body1" paragraph>
				Device configurations are runtime variables associated with the device, for example adjusting a global setting like the time synchronization interval or enabling I2C power. These configuration are controlled by the client, and then used by the firmware to adjust the device's behavior.
			</Typography>

			<Typography variant="body1" paragraph>
				This definition allows FlexiBLE client application to generate a user interface for controlling these configurations, allowing dynamic control of the device's behavior. In addition the client will store these configuration in it's database. The FlexiBle firmware library will automaticallyly generate access methods to these variables for use in the functional logic.
			</Typography>
		</>
	)
};

const CommandsDescription = () => {
	return (
		<>
			<Typography variant="body1" paragraph>
				Commands define arbitrary communication between a client application and device. Commands can be used to trigger a specific action on the device, or to request a specific piece of information. The interface library will provide a callback method for each command where logic can be implemented and a response generated. Commands can also be initiated from the device, which will be sent to the client application and stored in it's database.
			</Typography>

			<Typography variant="body1" paragraph>
				Commands are also used for FlexiBLE core functionality. For example time synchronization is a command which sends a UTC timestamp to the device. The device then uses this timestamp to calculate the offset between it's internal clock and the client's clock. This offset is then used to calculate the timestamp of data values sent from the device.
			</Typography>
		</>
	)
}

const descriptions = {
	"Time Series Data Streams": DataStreamDescription,
	"Data Stream Configurations": DataStreamConfigurationDescription,
	"Data Stream Data Values": DataStreamDataValueDescription,
	"Device Configurations": DeviceConfigurationDescription,
	"Device Commands": CommandsDescription,
};

export const FormComponentInfoButton = (props) => {
	const { title, isExpanded, setIsExpanded } = props;

	const handleExpandClick = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<>
		{ title && descriptions[title] &&
			<Button
				variant="outlined"
				size="small"
				color="primary"
				onClick={handleExpandClick}
				startIcon={<InfoIcon />}
			>
				{isExpanded ? "Hide Info" : "Show Info"}
			</Button>
		}
		</>
	)
}

export const FormComponentInfo = ({ title, isExpanded }) => {
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"stretch"}
			sx={{ mt: 2 }}
		>
			{ title && isExpanded && descriptions[title] &&
				descriptions[title]()
			}
		</Box>
	)
};