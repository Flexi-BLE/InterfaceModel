import Mustache from 'mustache';
import { serializeSpec } from '../artifacts/TemplateSerializer';

import MainDBSchemaTemplate from './templates/database/main-db-schema.sql.mustache';
import DeviceDBSchemaTemplate from './templates/database/device-db-schema.sql.mustache';

export const files = [
    {
        'name': 'spec.json',
        'code': (spec, setCode) => {
            setCode(JSON.stringify(spec, null, 2));
        },
        'language': 'json'
    },
    {
        'name': 'spec.ir.json',
        'code': (spec, setCode) => {
            setCode(JSON.stringify(serializeSpec(spec), null, 2));
        },
        'language': 'json'
    },
    {
        'name': 'main-db.sql',
        'code': (spec, setCode) => {
            fetch(MainDBSchemaTemplate)
                .then((res) => res.text())
                .then((textContext) => {
                    setCode(Mustache.render(textContext, serializeSpec(spec)));
                })

        },
        'language': 'sql'
    },
    {
        'name': 'device-db.sql',
        'code': (spec, setCode) => {
            fetch(DeviceDBSchemaTemplate)
                .then((res) => res.text())
                .then((textContext) => {
                    setCode(Mustache.render(textContext, serializeSpec(spec)));
                })

        },
        'language': 'sql'
    }
]