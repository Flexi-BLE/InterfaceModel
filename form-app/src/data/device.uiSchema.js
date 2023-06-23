import { React } from "react";
import {Empty, CollapsableField, ArrayFieldTitleName, ArrayFieldItem, CollapsableArrayItem, ArrayFieldItemTemplate} from "../form/customFields";

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
    'name': {
        "ui:widget": "hidden"
    },
    'description': {
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
    'ui:title': "FlexiBLE Device: Data Streams",
    'data_streams': {
        'ui:ArrayFieldItemTemplate': ArrayFieldItemTemplate,
        'items': {
            'ui:TitleFieldTemplate': Empty,
            'ui:FieldTemplate': CollapsableArrayItem
        }
    },
    'name': {
        "ui:widget": "hidden"
    },
    'description': {
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