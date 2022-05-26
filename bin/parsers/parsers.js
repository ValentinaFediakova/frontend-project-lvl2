import yaml from 'js-yaml';
import _ from 'lodash';
import fs from 'fs';

export const parser = (filePath) => {
  const content = fs.readFileSync(filePath).toString();

  if (filePath.includes('.json')) {
    return JSON.parse(content);
  }

  if (filePath.includes('.yml')) {
    return parseYml(content);
  }
}


const parseYml = (string) => {
  const ymlPath = yaml.load(string);
  const entries = Object.entries(ymlPath)
  const data = entries
    .map((item) => {
      return [item[0], item[1].toString()]
    })
    .reduce((accum, item) => {
      accum[item[0]] = item[1]
      return accum;
    }, {});

  return data;
}
