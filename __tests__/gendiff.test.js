import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {expect, test} from '@jest/globals';
import fs from 'fs';
import { parser } from '../bin/parsers/parsers.js'
import { dissimilarity } from '../bin/findDissimilarities.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__tests__','__fixtures__', filename);

const result = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
+ timeout: 20
- timeout: 50
+ verbose: true
}`


test ('test function findSimilarString()', () => {
  const file1 = getFixturePath('file1.json');
  const content1 = fs.readFileSync(file1).toString();
  const file2 = getFixturePath('file2.json');
  const content2 = fs.readFileSync(file2).toString();
  const path1 = parser(content1, file1)
  const path2 = parser(content2, file2)

  expect(dissimilarity(path1, path2)).toEqual(result);
})

