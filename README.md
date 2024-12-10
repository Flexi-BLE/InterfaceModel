# FlexiBLE JSON Spec


## Development

### Install QuickType
```bash
npm install -g quicktype
```

### Generate JSON Schema
```bash
quicktype flexible-device.json -l schema -o schema.json -t FlexiBLEDevice
```

**NOTE**: The schema `flexible.schema.json` is generated from `flexible-device.json` using [QuickType](), however many details are manually edited:
* `title` and `description` are added to all objects
* 