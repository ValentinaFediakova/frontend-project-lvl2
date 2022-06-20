// Выбор форматеров реализуйте в файле formatters/index.js.
import { stylishFormatter } from './stylish.js'
import { plainFormatter } from './plain.js'

export const whichFormatterUse = (data, formatterFlag) => {
	if (formatterFlag === 'stylish') {
		return 	stylishFormatter(data);
	}

  if (formatterFlag === 'plain') {
		return 	plainFormatter(data);
	}

	return `Unfortunately, we dont have instructions for ${formatterFlag}.`
}