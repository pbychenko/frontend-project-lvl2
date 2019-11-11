import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';

const parse = (pathToFile1, pathToFile2, extname) => {
  const formatActions = {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  return {
    beforeContent: formatActions[extname](fs.readFileSync(`${pathToFile1}`, 'utf8')),
    afterContent: formatActions[extname](fs.readFileSync(`${pathToFile2}`, 'utf8')),
  };
};

export default parse;
