import yaml from 'js-yaml';
import ini from 'ini';

const convertNumbers = (obj) => {
  const keys = Object.keys(obj);
  const iter = (list, acc) => {
    if (list.length === 0) {
      return acc;
    }

    const [key, ...rest] = list;

    if (obj[key] instanceof Object) {
      return iter(rest, { ...acc, [key]: convertNumbers(obj[key]) });
    }

    const intValue = parseInt(obj[key], 10);
    const newValue = (!Number.isNaN(intValue) ? intValue : obj[key]);
    return iter(rest, { ...acc, [key]: newValue });
  };

  return iter(keys, {});
};

const parseIni = (fileData) => convertNumbers(ini.parse(fileData));

const formatParsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: parseIni,
};

const parse = (fileData, extname) => {
  if (extname !== 'ini') {
    return formatParsers[extname](fileData);
  }
  return convertNumbers(formatParsers[extname](fileData));
};

export default parse;
