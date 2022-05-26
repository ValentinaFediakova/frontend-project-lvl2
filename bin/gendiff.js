#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { parser } from './parsers/parsers.js'
import { dissimilarity } from './findDissimilarities.js'

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

const path1 = parser(filePath1)
const path2 = parser(filePath2)

console.log(dissimilarity(path1, path2))