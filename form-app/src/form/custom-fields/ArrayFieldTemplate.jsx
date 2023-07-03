import {useContext} from "react";
import {SpecContext} from "../../SpecContext";
import {parseObject, setProperyWithSchemaId} from "../../utilities/JSONSchemaFormUtils";
import {Box, Button, Divider, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ExampleSelect} from "./ExampleSelect";
import {ExampleDataStreams} from "../../specification-data/v4.0.0/examples/DataStream/DataStream";
import Grid from "@mui/material/Unstable_Grid2";

export const ArrayFieldTemplate = (props) => {
    const { spec, setSpec } = useContext(SpecContext);
    const { idSchema, schema, uiSchema, registry } = props;

    const examples = uiSchema.items['ui:examples'];

    const handleExampleChange = (selection) => {
        const newSpec = JSON.parse(JSON.stringify(spec));
        console.log('selection', selection);
        const newItem = parseObject(selection.spec, spec, idSchema.$id);
        console.log('newItem: ', newItem);
        setProperyWithSchemaId(newSpec, idSchema.$id, newItem, 0)

        setSpec(newSpec);
    };

    const handleAdd = (event) => {
        const { schemaUtils } = registry;
        const newSpec = JSON.parse(JSON.stringify(spec));

        const newItem = parseObject(
            schemaUtils.getDefaultFormState(schema.items),
            spec,
            idSchema.$id
        );
        setProperyWithSchemaId(newSpec, idSchema.$id, newItem, 0)

        setSpec(newSpec);
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{schema.title}</Typography>
                <Box display="flex" gap={2} alignItems="center" sx={{m:2}}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                    { examples &&
                     <ExampleSelect
                         values={examples}
                         optionTitleKey={"title"}
                         onSelection={handleExampleChange}
                     />
                    }
                </Box>
            </Box>
            <Divider />
            <Grid>
                <div>
                    {props.items.map((element) =>
                        <Box component="span" display="flex" key={element.key} className={element.className}>
                            {element.children}
                        </Box>
                    )}
                </div>
            </Grid>
        </>
    )
}