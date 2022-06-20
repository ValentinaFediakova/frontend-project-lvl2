import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';

import { parser } from '../bin/parsers/parsers.js'
import { dissimilarities } from '../bin/findDissimilarities.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

// console.log('__filename = import.meta.url', import.meta.url)
// console.log('dirname(__filename)', __dirname)

const result1 = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}`

const result2 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`

let file1;
let file2;
let content1;
let content2;
let path1;
let path2;

beforeEach(() => {
  file1 = getFixturePath('rFile1.json');
  content1 = fs.readFileSync(file1).toString();
  path1 = parser(content1, file1)

  file2 = getFixturePath('rFile2.json');
  content2 = fs.readFileSync(file2).toString();
  path2 = parser(content2, file2)
});

test('test stylish formatter', () => {
  expect(dissimilarities(path1, path2, 'stylish')).toEqual(result1);
})

test('test plain formatter', () => {
  expect(dissimilarities(path1, path2, 'plain')).toEqual(result2);
})