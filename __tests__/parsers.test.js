import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {expect, test} from '@jest/globals';
import fs from 'fs';
import { parser } from '../bin/parsers/parsers.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__tests__','__fixtures__', filename);

const result1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  }
  
const result2 = { timeout: '20', host: 'hexlet.io', verbose: 'true' }

test ('test function parser', () => {
  const file1 = getFixturePath('file1.json');
  const content1 = fs.readFileSync(file1).toString();
  const a = parser(content1, file1)
  expect(a).toEqual(result1);

  const file2 = getFixturePath('file2.yml');
  const content2 = fs.readFileSync(file2).toString();
  const b = parser(content2, file2)
  expect(b).toEqual(result2);
})

