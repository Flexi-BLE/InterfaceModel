import { useState, useContext } from "react";
import {SpecContext} from "../../specification-data/SpecContext";
import {parseObject, setProperyWithSchemaId} from "../../utilities/JSONSchemaFormUtils";
import {Box, Button, Divider, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ExampleSelect} from "./ExampleSelect";
import {ExampleDataStreams} from "../../specification-data/v4.0.0/examples/DataStream/DataStream";
import Grid from "@mui/material/Unstable_Grid2";
import {FormComponentInfo, FormComponentInfoButton} from "./FormComponentInfo";

export const ArrayFieldTemplate = (props) => {
    const { spec, setSpec } = useContext(SpecContext);
    const { idSchema, schema, uiSchema, registry } = props;
    const [ isHelpExpanded, setIsHelpExpanded ] = useState(false);

    const examples = uiSchema.items['ui:examples'];

    console.log('ArrayFieldTemplate', schema.title, props);

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
                <Box container>
                    <Typography variant="h6" sx={{ mb: 2 }}>{schema.title}</Typography>
                    <FormComponentInfoButton
                        title={schema.title}
                        isExpanded={isHelpExpanded}
                        setIsExpanded={setIsHelpExpanded}
                    />
                </Box>
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
            <FormComponentInfo title={schema.title} isExpanded={isHelpExpanded} />
            <Divider sx={{ mt:2, mb:2 }} />
            <Box>
                {props.items.map((element) =>
                    <Box component="span" display="flex" width={"100%"} key={element.key} className={element.className}>
                        {element.children}
                    </Box>
                )}
            </Box>
        </>
    )
}