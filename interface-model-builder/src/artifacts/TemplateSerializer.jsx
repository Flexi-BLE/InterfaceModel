
import _ from 'lodash';

export const serializeSpec = (spec) => {
        var _spec = _.cloneDeep(spec);

        _spec = insertProgrammaticString(_spec, 'name');
        _spec = insertSQLDataTypes(_spec);

        return _spec;
    }

const insertProgrammaticString = (obj, targetKey) => {
    var _obj = _.cloneDeep(obj);

    if (typeof _obj !== 'object' || _obj === null) return _obj;

    Object.entries(_obj).forEach(([key, value]) => {
        if (key === targetKey && typeof value === 'string') {
            _obj[`_${targetKey}`] = value.toLowerCase().replace(/ /g, '_');
        }

        if (typeof value === 'object') {
            _obj[key] = insertProgrammaticString(value, targetKey);
        }
    });

    return _obj;
};

const insertSQLDataTypes = (obj) => {
    var _obj = _.cloneDeep(obj);

    if (typeof _obj !== 'object' || _obj === null) return _obj;

    const dataType = _obj.dataType;
    const key = '_sqliteDataType';

    if (dataType) {
        switch (dataType) {
            case 'int':
            case 'uint':
                _obj['_sqliteDataType'] = 'INTEGER';
                break;
            case 'float':
                _obj['_sqliteDataType'] = 'REAL';
                break;
            case 'ascii':
            case 'utf-8':
                _obj['_sqliteDataType'] = 'TEXT';
                break;
            default:
                _obj['_sqliteDataType'] = 'TEXT';
                break;
        }
    }

    Object.entries(_obj).forEach(([key, value]) => {
        if (typeof value === 'object') {
            _obj[key] = insertSQLDataTypes(value);
        }
    });

    return _obj;
}