import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

import { dissimilarities } from './bin/findDissimilarities.js'

const gendiff = (path1, path2, formatter = 'stylish') => {

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);

	const file1 = getFixturePath(path1);
	const data1 = fs.readFileSync(file1).toString();
	const file2 = getFixturePath(path2);
	const data2 = fs.readFileSync(file2).toString();

	const diff = dissimilarities(data1, data2, formatter);
	return diff;
}

export default gendiff;