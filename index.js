import fs from 'fs';
import path from 'path';
import { parser } from './bin/parsers/parsers.js';
import { dissimilarities } from './bin/findDissimilarities.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (filepath) => {
    const absoluteFilePath = getAbsolutePath(filepath);
    return fs.readFileSync(absoluteFilePath, 'utf-8').toString();
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
    const content1 = getFileData(filepath1);
    const content2 = getFileData(filepath2);
    const data1 = parser(content1, filepath1);
    const data2 = parser(content2, filepath2);

    const diff = dissimilarities(data1, data2, formatName);
    return diff;
};

export default genDiff;