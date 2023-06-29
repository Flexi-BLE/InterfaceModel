import {useState} from "react";
import { Box, FormControl, Select, MenuItem } from "@mui/material";


export const ExampleSelect = ({ options, onSelection }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        onSelection(event.target.value);
    };

    return (
        <Box display="flex" gap={2} alignItems="center">
            <FormControl>
                {/*<InputLabel id="example-select-label">Create from example</InputLabel>*/}
                <Select
                    labelId="example-select-label"
                    id="example-select"
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={() => 'Add from example'}
                    sx={{ minWidth: 200, m: 1 }}
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}