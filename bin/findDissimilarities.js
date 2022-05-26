import _ from 'lodash';

export const findSimilarString = (data1, data2) => {
  const entriesData1 = Object.entries(data1);
  const copyEntriesData1 = _.cloneDeep(entriesData1);

  const similarStrings = copyEntriesData1
    .filter(([keyData1, valueData1]) => _.has(data2, keyData1) && valueData1 === data2[keyData1])
    .map((item) => {
      const result = [];
      const [keyDataItem, valueDataItem] = item;
      result.push(keyDataItem, valueDataItem, ' ')
      return result
    })

  return similarStrings;
}
  
const findChangedStrings = (data1, data2) => {
  const entriesData1 = Object.entries(data1);
  const copyEntriesData1 = _.cloneDeep(entriesData1);

  const changedData = copyEntriesData1
    .filter(([keyData1, valueData1]) => _.has(data2, keyData1) && valueData1 !== data2[keyData1])
    .map((item) => {
      const result = [];
      const [keyData1Item, valueData1Item] = item;
      result.push([keyData1Item, valueData1Item, '-'])
      result.push([keyData1Item, data2[keyData1Item], '+'])
      return result;
    });

  return changedData;
}

const findDeletedStrings = (data1, data2) => {
  const entriesData1 = Object.entries(data1);
  const copyEntriesData1 = _.cloneDeep(entriesData1);

  const deletedStrings = copyEntriesData1
    .filter(([keyData1, ]) => _.has(data2, keyData1) === false)
    .map((item) => {
      const result = [];
      const [keyDataItem, valueDataItem] = item;
      result.push(keyDataItem, valueDataItem, '-')
      return result
    })

  return deletedStrings;
}

const findAddedStrings = (data1, data2) => {
  const entriesData2 = Object.entries(data2);
  const copyEntriesData2 = _.cloneDeep(entriesData2)

  const addedString = copyEntriesData2
  .filter(([keyData2, ]) => !_.has(data1, keyData2))
  .map(([keyData2, valueData2]) => {
    const result = [];
    result.push(keyData2, valueData2, '+');
    return result;
  })

  return addedString;
}


export const dissimilarity = (data1, data2) => {
  const similarStrings = findSimilarString(data1, data2);
  const changedStrings = findChangedStrings(data1, data2);
  const deletedStrings = findDeletedStrings(data1, data2);
  const addedStrings = findAddedStrings(data1, data2);

  const cancatArray = [similarStrings, deletedStrings, addedStrings];
  cancatArray.push(changedStrings.flat())
  const flatedConcate = cancatArray.flat()
  const sortedByAlphabet = _.sortBy(flatedConcate);
  const stringResult = resultToUsableStyle(sortedByAlphabet);
  return stringResult;
}

const resultToUsableStyle = (object) => {
  const objectToString = object.map(([key, value, sign]) => {
    return `${sign} ${key}: ${value}\n`
  })

  return `{\n${objectToString.join('')}}`
}