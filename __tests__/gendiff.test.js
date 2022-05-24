import { fileURLToPath } from 'url';
import fs from 'fs';
// import path from 'path';
import { dirname, join } from 'path';
import { dissimilarity } from '../bin/findDissimilarities.js'
import {expect, test} from '@jest/globals';
// import codegen from 'babel-plugin-codegen/macro';

// const DIRNAME = dirname(fileURLToPath(codegen `module.exports = process.env.NODE_ENV === "test" ? "file:///home/valentina/work/hexlet/projects/frontend-project-lvl2/__tests__/__fixtures__/gendiff.test.js" : "import.meta.url"`))

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__tests__','__fixtures__', filename);

const result = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
+ rokoko: 1234
+ timeout: 20
- timeout: 50
+ verbose: true
- viki: 3456
}`


test ('test function findSimilarString()', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const content1 = fs.readFileSync(file1).toString();
  const content2 = fs.readFileSync(file2).toString();
  const jsonPath1 = JSON.parse(content1);
  const jsonPath2 = JSON.parse(content2);

  expect(dissimilarity(jsonPath1, jsonPath2)).toEqual(result);
})