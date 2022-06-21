import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
import { parser } from './bin/parsers/parsers.js'
import { dissimilarities } from './bin/findDissimilarities.js'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getAbsolutePath = (filename) => join(__dirname, filename);

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (filepath) => {
  const absoluteFilePath = getAbsolutePath(filepath);
  return fs.readFileSync(absoluteFilePath, 'utf-8');
};

// const getFileData = (filepath) => {
//   const absoluteFilePath = getAbsolutePath(filepath);
//   return fs.readFileSync(absoluteFilePath, 'utf-8').toString();
// };

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
	const content1 = getFileData(filepath1);
  const content2 = getFileData(filepath2);
	const data1 = parser(content1, filepath1)
	const data2 = parser(content2, filepath2)

	const diff = dissimilarities(data1, data2, formatName);
	return diff;
};

export default genDiff;