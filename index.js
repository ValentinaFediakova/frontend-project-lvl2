import path from 'path';
import fs from 'fs';

import { dissimilarities } from './bin/findDissimilarities.js'

const gendiff = (path1, path2, formatter = 'stylish') => {
	const filePath1 = path.resolve(path1);
	const filePath2 = path.resolve(path2);
	const data1 = fs.readFileSync(filePath1).toString();
	const data2 = fs.readFileSync(filePath2).toString();


	const diff = dissimilarities(data1, data2, formatter);
	return diff;
}

export default gendiff;