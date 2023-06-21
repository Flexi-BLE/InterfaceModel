'use client';

import React from 'react';
import { 
  Container,
  Card,
  Collapse,
  CardHeader,
  CardContent,
  IconButton
} from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Form from '@rjsf/mui';
import { customizeValidator } from '@rjsf/validator-ajv8';

import schema from '../../../device.schema.json';

const metaSchemaDraft06 = require('ajv/lib/refs/json-schema-draft-06.json');
const validator = customizeValidator({
  additionalMetaSchemas: [metaSchemaDraft06],
});

// const schema = {
//   "title": "A registration form v2",
//   "description": "A simple form example.",
//   "type": "object",
//   "required": ["firstName", "lastName"],
//   "properties": {
//     "firstName": {
//       "type": "string",
//       "title": "First name"
//     },
//     "lastName": {
//       "type": "string",
//       "title": "Last name"
//     },
//     "currency": {
//       "type": "number",
//       "title": "Currency"
//     },
//     "select": {
//       "type": "string",
//       "title": "Example select",
//       "enum": ["Yes", "No"]
//     },
//     "react-select": {
//       "type": "string",
//       "title": "Example select",
//       "enum": ["Yes", "No"]
//     },
//     "age": {
//       "type": "integer",
//       "title": "Age"
//     },
//     "date": {
//       "type": "integer",
//       "title": "Date"
//     },
//     "password": {
//       "type": "string",
//       "title": "Password",
//       "minLength": 3
//     },
//     "telephone": {
//       "type": "string",
//       "title": "Telephone"
//     }
//   }
// }

// const givenFormData = {
//   "firstName": "Chuck",
//   "lastName": "Norris",
//   "age": 75,
//   "password": "noneed",
//   "creatableSelectTest": ["test"],
//   "selectTest": ["Yes", "No"],
//   "telephone": ""
// }

function CollapsableField(props) {
  const {id, classNames, label, help, required, description, errors, children} = props;
  const [open, setOpen] = React.useState(true);
  return (
    <Card className={classNames}>
    <CardHeader
          title={label}
          action={
              <IconButton
                  onClick={() => setOpen(!open)}
                  aria-label="expand"
                  size="small"
              >
                  {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
              </IconButton>
          }
      ></CardHeader>

<Collapse in={open} timeout="auto" unmountOnExit>
  <CardContent>
  <Container>
    {children}
  </Container>
  </CardContent>
</Collapse>
</Card>
  );
}

const uiSchema = {
  "data_streams": {
    "items": {
      "ui:FieldTemplate": CollapsableField
    }
  },
  "ble": {
    "ui:FieldTemplate": CollapsableField
  }
}

// const uiSchema = {
//   "firstName": {
//     "ui:autofocus": true,
//     "ui:emptyValue": ""
//   },
//   "selectTest": {
//     "ui:widget": "material-multiselect",
//     "mui:inputProps": {
//       "className": "money"
//     }
//   },
//   "react-select": {
//     "ui:widget": "material-select",
//     "ui:isClearable": true,
//     "ui:placeholder": "Example Placeholder"
//   },
//   "currency": {
//     "ui:options": {
//       "useLocaleString": "nl"
//     }
//   },
//   "age": {
//     "ui:widget": "updown",
//     "ui:title": "Age of person",
//     "ui:description": "(earthian year)",
//     "mui:className": "money"
//   },
//   "password": {
//     "ui:widget": "password",
//     "ui:help": "Hint: Make it strong!",
//     "ui:validations": {
//       "minLength": {
//         "value": 3,
//         "message": "'Password' must be at least 3 characters",
//         "inline": true
//       }
//     }
//   },
//   "date": {
//     "ui:activeCompColor": "red",
//     "ui:widget": "alt-datetime"
//   },
//   "telephone": {
//     "ui:options": {
//       "inputType": "tel"
//     },
//     "ui:validations": {
//       "minLength": {
//         "value": 10,
//         "message": "'Telephone' must be at least 10 digits",
//         "inline": true
//       }
//     }
//   }
// }

// const theme = {
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// };

export default () => {
  const [formData, setFormData] = React.useState({});
  return (
    <Container maxWidth="sm">
      <Form 
            schema={schema}
            uiSchema={uiSchema}
            formData={formData} 
            validator={validator}
            onChange={({ formData }) => setFormData(formData)}
            onSubmit={() => console.log('form submitted')}
          />
    </Container>
  );
};