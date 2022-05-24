#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import fs from 'fs';

import { dissimilarity } from '../bin/findDissimilarities.js'

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>')


program.parse();

const filePath1 = path.resolve(program.args[0]);
const filePath2 = path.resolve(program.args[1]);
const content1 = fs.readFileSync(filePath1).toString();
const content2 = fs.readFileSync(filePath2).toString();
const jsonPath1 = JSON.parse(content1);
const jsonPath2 = JSON.parse(content2);

console.log('import.meta.url', import.meta.url)

console.log(dissimilarity(jsonPath1, jsonPath2))