import { React } from "react";
import {
    Empty,
    CollapsableField,
    ArrayFieldTitleName,
    ArrayFieldItem,
    CollapsableArrayItem,
    BasicArrayFieldItemTemplate,
    EmptyWithChildren, BasicArrayFieldTemplate,
} from "../../form/custom-fields/CustomFormTemplates";
import {
    DataStreamArrayFieldTemplate, DataStreamCollapsableArrayItem, DataStreamConfigTitleField,
    DataStreamFieldTitle,
    DataStreamTitleField
} from "../../form/custom-fields/DataStream";

export const uiSchema = {
    "data_streams": {
      "items": {
        "ui:FieldTemplate": CollapsableField
      }
    },
    "ble": {
      "ui:FieldTemplate": CollapsableField
    }
  }

export const GeneralUISchema = {
    'ui:title': "FlexiBLE Device: General Information",
    'ui:globalOptions': { copyable: true },
    'config_values': {
        "ui:widget": "hidden"
    },
    'commands': {
        "ui:widget": "hidden"
    },
    'ble': {
        "ui:widget": "hidden"
    },
    'data_streams': {
        "ui:widget": "hidden"
    }
};

export const BLEDetailUISchema = {
    'ui:title': "FlexiBLE Device: BLE Details",
    'ui:globalOptions': { copyable: true },
    'ble': {
        'ui:TitleFieldTemplate': Empty,
        'ui:title': null
    },
    'name': {
        "ui:widget": "hidden"
    },
    'description': {
        "ui:widget": "hidden"
    },
    'can_group': {
        "ui:widget": "hidden"
    },
    'flexible_version': {
        "ui:widget": "hidden"
    },
    'config_values': {
        "ui:widget": "hidden"
    },
    'commands': {
        "ui:widget": "hidden"
    },
    'data_streams': {
        "ui:widget": "hidden"
    }
};

export const ConfigUISchema = {
    'ui:title': "FlexiBLE Device: Global Configurations",
    'name': {
        "ui:widget": "hidden"
    },
    'description': {
        "ui:widget": "hidden"
    },
    'can_group': {
        "ui:widget": "hidden"
    },
    'flexible_version': {
        "ui:widget": "hidden"
    },
    'ble': {
        "ui:widget": "hidden"
    },
    'commands': {
        "ui:widget": "hidden"
    },
    'data_streams': {
        "ui:widget": "hidden"
    }
}

export const CommandUISchema= {
    'ui:title': "FlexiBLE Device: Commands",
    'commands': {
        'ui:ArrayFieldItemTemplate': EmptyWithChildren,
        'items': {
            'ui:TitleFieldTemplate': Empty,
            'ui:FieldTemplate': CollapsableArrayItem,
        }
    },
    'name': {
        "ui:widget": "hidden"
    },
    'description': {
        "ui:widget": "hidden"
    },
    'can_group': {
        "ui:widget": "hidden"
    },
    'flexible_version': {
        "ui:widget": "hidden"
    },
    'ble': {
        "ui:widget": "hidden"
    },
    'config_values': {
        "ui:widget": "hidden"
    },
    'data_streams': {
        "ui:widget": "hidden"
    }
}

export const DataStreamUISchema= {
    'ui:TitleFieldTemplate': DataStreamTitleField,
    'data_streams': {
        'ui:ArrayFieldTemplate': BasicArrayFieldTemplate,
        'ui:ArrayFieldItemTemplate': Empty,
        'items': {
            'ui:FieldTemplate': DataStreamCollapsableArrayItem,
            'ui:TitleFieldTemplate': Empty,
            'id': {
                'ui:readonly': true
            },
            'ble': {
                'ui:readonly': true
            },
            'config_values': {
                'ui:TitleFieldTemplate': DataStreamConfigTitleField,
                'ui:ArrayFieldItemTemplate': EmptyWithChildren,
                'items': {
                    'ui:TitleFieldTemplate': Empty,
                    'ui:FieldTemplate': CollapsableArrayItem,
                    'uiid': "config_values",
                    'ui:order': [
                        'name',
                        'description',
                        'unit',
                        'length',
                        'multiplier',
                        'data_type',
                        'selection_type',
                        'range',
                        'options',
                        'default_value',
                        'variable_type',
                        'depends_on'
                    ]
                },
            },
            'data_values': {
                'ui:ArrayFieldItemTemplate': EmptyWithChildren,
                'items': {
                    'ui:TitleFieldTemplate': Empty,
                    'ui:FieldTemplate': CollapsableArrayItem,
                    'uiid': "config_values",
                    'ui:order': [
                        'name',
                        'description',
                        'unit',
                        'length',
                        'multiplier',
                        'data_type',
                        'selection_type',
                        'range',
                        'options',
                        'default_value',
                        'variable_type',
                        'depends_on'
                    ]
                }
            }
        }
    },
    'name': {
        "ui:widget": "hidden"
    },
    'description': {
        "ui:widget": "hidden"
    },
    'can_group': {
        "ui:widget": "hidden"
    },
    'flexible_version': {
        "ui:widget": "hidden"
    },
    'ble': {
        "ui:widget": "hidden"
    },
    'config_values': {
        "ui:widget": "hidden"
    },
    'commands': {
        "ui:widget": "hidden"
    }
}