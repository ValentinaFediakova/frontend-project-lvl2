import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';

import parser from '../bin/parsers/parsers.js';
import { dissimilarities } from '../bin/findDissimilarities.js';

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
}`;

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
Property 'group3' was added with value: [complex value]`;

test('test stylish formatter', () => {
  const file1 = getFixturePath('rFile1.json');
  const content1 = fs.readFileSync(file1).toString();
  const path1 = parser(content1, file1);

  const file2 = getFixturePath('rFile2.json');
  const content2 = fs.readFileSync(file2).toString();
  const path2 = parser(content2, file2);
  expect(dissimilarities(path1, path2, 'stylish')).toEqual(result1);

  expect(dissimilarities(path1, path2, 'plain')).toEqual(result2);
});

// test('test plain formatter', () => {
//   const file1 = getFixturePath('rFile1.json');
//   const content1 = fs.readFileSync(file1).toString();
//   const path1 = parser(content1, file1);

//   const file2 = getFixturePath('rFile2.json');
//   const content2 = fs.readFileSync(file2).toString();
//   const path2 = parser(content2, file2);
//   expect(dissimilarities(path1, path2, 'plain')).toEqual(result2);
// });
