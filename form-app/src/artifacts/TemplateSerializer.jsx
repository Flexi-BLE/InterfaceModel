
export const serializeSpec = (spec) => {
    insertProgrammaticString(spec, 'name');
    insertSQLDataTypes(spec);
}

const insertProgrammaticString = (obj, targetKey) => {
    if (typeof obj !== 'object' || obj === null) return;

    Object.entries(obj).forEach(([key, value]) => {
        if (key === targetKey && typeof value === 'string') {
            obj[`_${targetKey}`] = value.toLowerCase().replace(/ /g, '_');
        }

        if (typeof value === 'object') {
            insertProgrammaticString(value, targetKey);
        }
    });
};

const insertSQLDataTypes = (obj) => {
    if (typeof obj !== 'object' || obj === null) return;

    const dataType = obj.dataType;
    const key = '_sqliteDataType';

    if (dataType) {
        switch (dataType) {
            case 'int':
            case 'uint':
                obj['_sqliteDataType'] = 'INTEGER';
                break;
            case 'float':
                obj['_sqliteDataType'] = 'REAL';
                break;
            case 'ascii':
            case 'utf-8':
                obj['_sqliteDataType'] = 'TEXT';
                break;
            default:
                obj['_sqliteDataType'] = 'TEXT';
                break;
        }
    }

    Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object') {
            insertSQLDataTypes(value);
        }
    });
}