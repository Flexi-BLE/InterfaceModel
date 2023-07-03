import { React } from "react";
import _ from 'lodash';
import { Empty } from "../../form/custom-fields/CustomFormTemplates";
import { ArrayFieldTemplate } from "../../form/custom-fields/ArrayFieldTemplate";
import { CollapsableArrayItemTemplate } from "../../form/custom-fields/CollapsableArrayItemTemplate";

import { ExampleDataStreams } from "./examples/DataStream/DataStream";


export const uiSchema = {
    'ui:TitleFieldTemplate': Empty,
    'ui:globalOptions': { copyable: true },
    'id': { },
    'name': { },
    'description': { },
    'canGroup': { },
    'flexibleVersion': { },
    'ble': {
        'ui:TitleFieldTemplate': Empty,
        'ui:title': null
    },
    'configValues': {
        'ui:ArrayFieldTemplate': ArrayFieldTemplate,
        'ui:ArrayFieldItemTemplate': Empty,
        'items': {
            'ui:FieldTemplate': CollapsableArrayItemTemplate,
            'ui:TitleFieldTemplate': Empty,
            'options': {
                'ui:ArrayFieldTemplate': ArrayFieldTemplate,
                'ui:ArrayFieldItemTemplate': Empty,
                'items': {
                    'ui:FieldTemplate': CollapsableArrayItemTemplate,
                    'ui:TitleFieldTemplate': Empty,
                }
            },
        }
    },
    'commands': {
        'ui:ArrayFieldTemplate': ArrayFieldTemplate,
        'ui:ArrayFieldItemTemplate': Empty,
        'items': {
            'ui:FieldTemplate': CollapsableArrayItemTemplate,
            'ui:TitleFieldTemplate': Empty,
        }
    },
    'dataStreams': {
        'ui:ArrayFieldTemplate': ArrayFieldTemplate,
        'ui:ArrayFieldItemTemplate': Empty,
        'items': {
            'ui:FieldTemplate': CollapsableArrayItemTemplate,
            'ui:TitleFieldTemplate': Empty,
            'ui:examples': ExampleDataStreams,
            'id': {
                'ui:readonly': true
            },
            'ble': {
                'ui:readonly': true
            },
            'configValues': {
                'ui:ArrayFieldTemplate': ArrayFieldTemplate,
                'ui:ArrayFieldItemTemplate': Empty,
                'items': {
                    'ui:TitleFieldTemplate': Empty,
                    'ui:FieldTemplate': CollapsableArrayItemTemplate,
                    'uiid': "configValues",
                    'ui:order': [
                        'id',
                        'name',
                        'description',
                        'unit',
                        'length',
                        'multiplier',
                        'dataType',
                        'selectionType',
                        'range',
                        'options',
                        'defaultValue',
                        'variableType',
                        'dependsOn'
                    ]
                },
            },
            'dataValues': {
                'ui:ArrayFieldTemplate': ArrayFieldTemplate,
                'ui:ArrayFieldItemTemplate': Empty,
                'items': {
                    'ui:TitleFieldTemplate': Empty,
                    'ui:FieldTemplate': CollapsableArrayItemTemplate,
                    'ui:order': [
                        'id',
                        'name',
                        'description',
                        'unit',
                        'length',
                        'multiplier',
                        'dataType',
                        'selectionType',
                        'range',
                        'options',
                        'defaultValue',
                        'variableType',
                        'dependsOn'
                    ]
                }
            }
        }
    },
};

export const schemaRouteDetails = {
    'general': {
        'hidden': ['ble', 'configValues', 'commands', 'dataStreams']
    },
    'ble-details': {
        'hidden': ['id', 'name', 'description', 'canGroup', 'flexibleVersion', 'configValues', 'commands', 'dataStreams']
    },
    'config-values': {
        'hidden': ['id', 'name', 'description', 'canGroup', 'flexibleVersion', 'ble', 'commands', 'dataStreams']
    },
    'commands': {
        'hidden': ['id', 'name', 'description', 'canGroup', 'flexibleVersion', 'ble', 'configValues', 'dataStreams']
    },
    'data-streams': {
        'hidden': ['id', 'name', 'description', 'canGroup', 'flexibleVersion', 'ble', 'configValues', 'commands']
    }
};

export const uiSchemaForRoute = (route) => {
    const uiSchemaForRoute = _.cloneDeep(uiSchema);

    Object.keys(uiSchemaForRoute).forEach((key) => {
        if ( schemaRouteDetails[route].hidden.includes(key) ) {
            uiSchemaForRoute[key]['ui:widget'] = "hidden";
        } else {
            if ( uiSchemaForRoute[key]['ui:widget'] ) {
                uiSchemaForRoute[key]['ui:widget'] = uiSchema[key]['ui:widget'];
            } else {
                delete uiSchemaForRoute[key]['ui:widget'];
            }
        }
    });

    return uiSchemaForRoute;
}