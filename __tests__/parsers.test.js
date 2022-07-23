import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import parser from '../bin/parsers/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const result1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const result2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const result3 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const result4 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

test('test function parser', () => {
  const file1 = getFixturePath('file1.json');
  const content1 = fs.readFileSync(file1).toString();
  const a = parser(content1, file1);
  expect(a).toEqual(result1);

  const file2 = getFixturePath('file2.yml');
  const content2 = fs.readFileSync(file2).toString();
  const b = parser(content2, file2);
  expect(b).toEqual(result2);

  const file3 = getFixturePath('rFile1.json');
  const content3 = fs.readFileSync(file3).toString();
  const parse3 = parser(content3, file3);
  expect(parse3).toEqual(result3);

  const file4 = getFixturePath('rFile1.yml');
  const content4 = fs.readFileSync(file4).toString();
  const parse4 = parser(content4, file4);
  expect(parse4).toEqual(result4);
});
