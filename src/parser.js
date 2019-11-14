import yaml from 'js-yaml';
import ini from 'ini';

const formatParsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (dataFile, extname) => formatParsers[extname](dataFile);

export default parse;
