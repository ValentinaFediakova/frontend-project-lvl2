import _ from 'lodash';

const checkString = (value) => {
    if (_.isString(value)) {
        return `'${value}'`;
    }

    return value;
};

const convertStatusToFormatInPlainData = (data, path, isFirstPlainValue) => {
    const pathWay = path.join('.');
    const enter = isFirstPlainValue ? '' : '\n';

    if (data.status === 'changed') {
        return `${enter}Property '${pathWay}' was updated. From ${checkString(data.value)} to ${checkString(data.newValue)}`;
    }

    if (data.status === 'added') {
        return `${enter}Property '${pathWay}' was added with value: ${checkString(data.value)}`;
    }

    if (data.status === 'deleted') {
        return `${enter}Property '${pathWay}' was removed`;
    }

    if (data.status === 'not_changed') {
        return;
    }

    console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
    return;
};

const convertStatusToFormatInObject = (data, path) => {
    const pathWay = path.join('.');

    if (data.status === 'added') {
        return `\nProperty '${pathWay}' was added with value: [complex value]`;
    }

    if (data.status === 'deleted') {
        return `\nProperty '${pathWay}' was removed`;
    }

    if (data.status === 'changed') {
        const value = data.valueIsJson === true ? JSON.parse(data.value) : data.value;
        const newValue = data.newValueIsJson === true ? JSON.parse(data.newValue) : data.newValue;

        if (_.isObject(value)) {
            return `\nProperty '${pathWay}' was updated. From [complex value] to '${newValue}'`;
        }

        if (_.isObject(newValue)) {
            return `\nProperty '${pathWay}' was updated. From ${value} to [complex value]`;
        }
    }

    console.log('%c Oh my heavens! ', 'background: red; color: #bada55');
    return;
};


export const plainFormatter = (data) => {
    let isFirstPlainValue = true;

    const formatData = (partOfData, path) => {
        let formattedData = [];
        const entriesData = Object.entries(partOfData);

        entriesData.forEach((item) => {
            const [keyItem, valueData] = item;
            const pathItem = [...path, keyItem];

            // console.log('[keyItem, valueData]', [keyItem, valueData])

            const value = valueData.valueIsJson === true ? JSON.parse(valueData.value) : valueData.value;
            const newValue = valueData.newValueIsJson === true ? JSON.parse(valueData.newValue) : valueData.newValue;

            if (!_.isObject(valueData.value) && !_.isObject(value) && !_.isObject(newValue)) {
                formattedData = [...formattedData, convertStatusToFormatInPlainData(valueData, pathItem, isFirstPlainValue)];
                isFirstPlainValue = false;
                return;
            }

            if (valueData.status === 'added' || valueData.status === 'deleted' || valueData.status === 'changed') {
                formattedData = [...formattedData, convertStatusToFormatInObject(valueData, pathItem)];
                return;
            }

            formattedData = [...formattedData, formatData(valueData.value, pathItem, isFirstPlainValue)];
        });

        return formattedData.join('');
    };


    const result = formatData(data, []);
    return result;
};