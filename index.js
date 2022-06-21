import { dissimilarities } from './bin/findDissimilarities.js'

export const gendiff = (data1, data2, formatter = 'stylish') => {
	const diff = dissimilarities(data1, data2, formatter);
	return diff;
}