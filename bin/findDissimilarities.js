/*  eslint import/no-cycle: [2, { maxDepth: 1 }]  */
/* eslint fp/no-mutation: 0 */
/* eslint fp/no-mutating-methods: 0 */

import _ from 'lodash';
import whichFormatterUse from './formatters/index.js';

const statuses = {
  NOT_CHANGED: 'not_changed',
  ADDED: 'added',
  DELETED: 'deleted',
  CHANGED: 'changed',
};

export const optionsOfObject = { isPlainObject: true };

const checkPlaneStatus = (partOfData, path, comparedData, isCallForCompareData2) => {
  const [key, value] = partOfData;
  const valueOfComparedData = _.get(comparedData, path);

  if (_.has(comparedData, path) && value === valueOfComparedData) {
    return { key: `${key}`, value, status: statuses.NOT_CHANGED };
  }

  if (_.has(comparedData, path) && value !== valueOfComparedData) {
    return {
      key: `${key}`, value, newValue: valueOfComparedData, status: statuses.CHANGED,
    };
  }

  if (!_.has(comparedData, path)) {
    return { key: `${key}`, value, status: isCallForCompareData2 ? statuses.ADDED : statuses.DELETED };
  }

  return null;
};

const addStatusForChildren = (children) => {
  const formChildrenStatus = (child) => {
    const newData = {};
    const entriesChild = Object.entries(child);

    entriesChild.forEach((item) => {
      const [key, value] = item;
      if (!_.isObject(value)) {
        newData[key] = { key: `${key}`, value, status: statuses.NOT_CHANGED };
        return;
      }
      newData[key] = { key: `${key}`, value: formChildrenStatus(value), status: statuses.NOT_CHANGED };
    });
    return newData;
  };

  const result = formChildrenStatus(children);
  return result;
};

const sortData = (data) => {
  const cloneData = _.cloneDeep(data);

  const formSortedData = (partOfData) => {
    const entriesOfData = Object.entries(partOfData)
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([key, keyStatusValue]) => {
        if (!_.isObject(keyStatusValue.value)) {
          return [key, keyStatusValue];
        }
        return [key, { ...keyStatusValue, value: formSortedData(keyStatusValue.value) }];
      });

    return Object.fromEntries(entriesOfData);
  };

  const sortResult = formSortedData(cloneData);
  return sortResult;
};

export const dissimilarities = (data1, data2, whichFormatter = 'stylish') => {
  const formStatus = (mainData, comparedData, path, prevResult = null) => {
    const isCallCompareD2 = Boolean(prevResult);
    const entriesData = Object.entries(mainData);
    const mainDataWithStatuses = {};

    entriesData.forEach((item) => {
      const [key, value] = item;
      const valueOfComparedD = _.get(comparedData, [...path, key]);
      const pathKey = [...path, key];

      if (!_.isObject(value) && !_.isObject(valueOfComparedD)) {
        const KV = [key, value];
        const dataWithDiffStatus = checkPlaneStatus(KV, pathKey, comparedData, isCallCompareD2);
        mainDataWithStatuses[key] = dataWithDiffStatus;
        return;
      }

      optionsOfObject.isPlainObject = false;

      if (!_.isObject(value) && _.isObject(valueOfComparedD) && !isCallCompareD2) {
        const dataWithDiffStatus = {
          key: `${key}`, value, newValue: JSON.stringify(addStatusForChildren(valueOfComparedD)), newValueIsJson: true, status: statuses.CHANGED,
        };
        mainDataWithStatuses[key] = dataWithDiffStatus;
        return;
      }

      if (_.has(comparedData, pathKey) && !_.isObject(valueOfComparedD) && !isCallCompareD2) {
        const dataWithDiffStatus = {
          key: `${key}`, value: JSON.stringify(addStatusForChildren(value)), valueIsJson: true, newValue: valueOfComparedD, status: statuses.CHANGED,
        };
        mainDataWithStatuses[key] = dataWithDiffStatus;
        return;
      }

      if (!_.has(comparedData, pathKey)) {
        const dataWithDiffStatus = { key: `${key}`, status: isCallCompareD2 ? statuses.ADDED : statuses.DELETED, value: addStatusForChildren(value) };
        mainDataWithStatuses[key] = dataWithDiffStatus;
        return;
      }

      const dataWithDiffStatus = { key: `${key}`, status: statuses.NOT_CHANGED, value: formStatus(value, comparedData, [...path, key], isCallCompareD2) };
      mainDataWithStatuses[key] = dataWithDiffStatus;
    });

    return mainDataWithStatuses;
  };

  const result = formStatus(data1, data2, []);
  const result2 = formStatus(data2, data1, [], true);
  const result3 = _.merge(result2, result);
  const a = sortData(result3);

  const mainresult = whichFormatterUse(a, whichFormatter);

  return mainresult;
};
