import yaml from 'js-yaml';

export const parser = (content, filePath) => {
  // console.log('parser filePath', filePath.includes('.json'))

  if (filePath.includes('.json')) {
    // console.log('content', content)
    return JSON.parse(content);
  }

  if (filePath.includes('.yml')) {
    // console.log('content', parseYml(content))
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
