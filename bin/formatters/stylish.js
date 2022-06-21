import _ from 'lodash';
import { optionsOfObject } from '../findDissimilarities.js'

const FIX_TAB_SIZE = 4;
const FIX_TAB_FOR_SIGN = 2;

const countNumberOfSpaces = (path, options = {}) => {
	let numberOfSpace;

	if (optionsOfObject.isPlainObject) {
		numberOfSpace = path.length * FIX_TAB_SIZE;

		if (options.withSign === true) {
			numberOfSpace = (path.length * FIX_TAB_SIZE) - FIX_TAB_FOR_SIGN;
		}

		return numberOfSpace;
	}

	if (options.withSign === true) {
		numberOfSpace = (path.length - 1) * FIX_TAB_SIZE;
		return numberOfSpace;
	}

	numberOfSpace = (path.length - 1) * FIX_TAB_SIZE + FIX_TAB_FOR_SIGN;
	return numberOfSpace;
}

const formatStatusToSignForSimpleData = ([key, value, status, newValue], path) => {
	const numberOfSpaces = countNumberOfSpaces(path)
	const numberOfSpaceWithSign = countNumberOfSpaces(path, { withSign: true })
	if (status === "added") {
		return `\n${' '.repeat(numberOfSpaceWithSign)}+ ${key}: ${value}`
	}
	if (status === "deleted") {
		return `\n${' '.repeat(numberOfSpaceWithSign)}- ${key}: ${value}`
	}
	if (status === "not_changed") {
		return `\n${' '.repeat(numberOfSpaces)}${key}: ${value}`
	}
	if (status === "changed") {
        return `\n${' '.repeat(numberOfSpaceWithSign)}- ${key}: ${value}\n${' '.repeat(numberOfSpaceWithSign)}+ ${key}: ${newValue}`
	}

	return;
}

const statusToSignForNotchangedObjects = (data, path) => {

	const formatStatus = (partOfData, newPath) => {
		const entries = Object.entries(partOfData);
		let formatedData = [];

		entries.forEach((item) => {
			const [keyItem, valueItem] = item
			const pathItem = [...newPath, keyItem]
			const numberOfSpaces = countNumberOfSpaces(pathItem)

			if (!_.isObject(valueItem.value)) {
				const formatedString = `\n${' '.repeat(numberOfSpaces)}${valueItem.key}: ${valueItem.value}`
				formatedData = [...formatedData, formatedString]
				return
			}

			formatedData = [...formatedData, `\n${' '.repeat(numberOfSpaces)}${valueItem.key}: {${formatStatus(valueItem.value, pathItem)}\n${' '.repeat(numberOfSpaces)}}`]
			return
		})

		return `${formatedData.join('')}`;
	}

	return formatStatus(data, path);
}


const convertInnersIfObjectHasChangeStatus = (valueString, path) => {
	const value = valueString.valueIsJson === true ? JSON.parse(valueString.value) : valueString.value
	const newValue = valueString.newValueIsJson === true ? JSON.parse(valueString.newValue) : valueString.newValue
	const numberOfSpaces = countNumberOfSpaces(path)
	const numberOfSpaceWithSign = countNumberOfSpaces(path, { withSign: true })


	if (_.isObject(value)) {
		const dataWithDiffStatusFirst = `${' '.repeat(numberOfSpaceWithSign)}- ${valueString.key}: {${statusToSignForNotchangedObjects(value, path)}\n${' '.repeat(numberOfSpaces)}}`
		const dataWithDiffStatusSecond = `${' '.repeat(numberOfSpaceWithSign)}+ ${valueString.key}: ${newValue}`
		const result = `\n${dataWithDiffStatusFirst}\n${dataWithDiffStatusSecond}`
		return result;
	}

	if (_.isObject(newValue)) {
		const dataWithDiffStatusFirst = `${' '.repeat(numberOfSpaceWithSign)}- ${valueString.key}: ${value}`
		const dataWithDiffStatusSecond = `${' '.repeat(numberOfSpaceWithSign)}+ ${valueString.key}: {${statusToSignForNotchangedObjects(newValue, path)}\n${' '.repeat(numberOfSpaces)}}`
		const result = `\n${dataWithDiffStatusFirst}\n${dataWithDiffStatusSecond}`
		return result;	
	}

}

export const stylishFormatter = (data) => {

	const formatData = (partOfData, path) => {

		let mainFormatedData = [];
		const entries = Object.entries(partOfData);

		entries.forEach((item) => {
			const [keyItem, valueData] = item;
			const pathItem = [...path, keyItem]
			const numberOfSpaces = countNumberOfSpaces(pathItem)
			const numberOfSpaceWithSign = countNumberOfSpaces(pathItem, { withSign: true })

			if (!_.isObject(valueData.value) && valueData.valueIsJson == undefined && valueData.newValueIsJson == undefined) {
				const simpleDataString = formatStatusToSignForSimpleData([valueData.key, valueData.value, valueData.status, valueData.newValue], [...path, valueData.key])
				mainFormatedData = [...mainFormatedData, simpleDataString]
				return
			}
			
			if (valueData.status === 'added' || valueData.status === 'deleted') {
				const singBeforeObject = valueData.status === 'added' ? '+ ' : '- ';
				const stringForData = `\n${' '.repeat(numberOfSpaceWithSign)}${singBeforeObject}${keyItem}: {${statusToSignForNotchangedObjects(valueData.value, [...path, valueData.key])}\n${' '.repeat(numberOfSpaces)}}`
				mainFormatedData = [...mainFormatedData, stringForData]
				return
			}
			if (valueData.status === 'changed') {
				const dataString = convertInnersIfObjectHasChangeStatus(valueData, [...path, valueData.key])
				mainFormatedData = [...mainFormatedData, dataString]
				return 
			}

			const stringForData = `\n${' '.repeat(numberOfSpaces)}${keyItem}: {${formatData(valueData.value, [...path, keyItem])}\n${' '.repeat(numberOfSpaces)}}`
			mainFormatedData = [...mainFormatedData, stringForData]
		})

		return `${mainFormatedData.join('')}`;
	}

	const result = formatData(data, []);
    return `{${result}\n}`;
}

