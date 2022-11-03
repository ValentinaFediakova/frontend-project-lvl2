/*  eslint import/no-cycle: [2, { maxDepth: 1 }]  */

// Выбор форматеров реализуйте в файле formatters/index.js.
import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const whichFormatterUse = (data, formatterFlag) => {
  if (formatterFlag === 'stylish') {
    return stylishFormatter(data);
  }

  if (formatterFlag === 'plain') {
    return plainFormatter(data);
  }

  if (formatterFlag === 'json') {
    return jsonFormatter(data);
  }

  return `Unfortunately, we dont have instructions for ${formatterFlag}.`;
};

export default whichFormatterUse;
