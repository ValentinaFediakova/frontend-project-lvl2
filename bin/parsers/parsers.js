import yaml from 'js-yaml';

const parser = (content, filePath) => {
  if (filePath.includes('.json')) {
    return JSON.parse(content);
  }

  if (filePath.includes('.yml')) {
    const result = yaml.load(content, { json: true, schema: yaml.JSON_SCHEMA });
    return result;
  }

  return 'нет такого формата';
};

export default parser;
