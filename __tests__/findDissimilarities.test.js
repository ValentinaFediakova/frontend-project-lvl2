import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import { parser } from '../bin/parsers/parsers.js'
import { dissimilarities } from '../bin/findDissimilarities.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

const result2 = `{
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


test('test function dissimilarity()', () => {
    const file1 = getFixturePath('file1.json');
    const content1 = fs.readFileSync(file1).toString();
    const file2 = getFixturePath('file2.json');
    const content2 = fs.readFileSync(file2).toString();
    const path1 = parser(content1, file1)
    const path2 = parser(content2, file2)
    
    expect(dissimilarities(path1, path2)).toEqual(result);
})

test('test function inDepthDissimilarity()', () => {
    const file1 = getFixturePath('rFile1.json');
    const content1 = fs.readFileSync(file1).toString();
    const path1 = parser(content1, file1)

    const file2 = getFixturePath('rFile2.json');
    const content2 = fs.readFileSync(file2).toString();
    const path2 = parser(content2, file2)

    expect(dissimilarities(path1, path2)).toEqual(result2);
})

