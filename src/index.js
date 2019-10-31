import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (pathToFile1, pathToFile2) => {
  const extname1 = path.extname(pathToFile1);
  const extname2 = path.extname(pathToFile2);

  let beforeContent = {};
  let afterContent = {};

  if (extname1 === extname2) {
    switch (extname1) {
      case '.json':
        beforeContent = JSON.parse(fs.readFileSync(`${pathToFile1}`, 'utf8'));
        afterContent = JSON.parse(fs.readFileSync(`${pathToFile2}`, 'utf8'));
        break;
      case '.yaml':
        beforeContent = yaml.safeLoad(fs.readFileSync(`${pathToFile1}`, 'utf8'));
        afterContent = yaml.safeLoad(fs.readFileSync(`${pathToFile2}`, 'utf8'));
        break;
      case '.ini':
        beforeContent = ini.parse(fs.readFileSync(`${pathToFile1}`, 'utf8'));
        afterContent = ini.parse(fs.readFileSync(`${pathToFile2}`, 'utf8'));
        break;
      default:
        break;
    }
  }
  return { beforeContent, afterContent };
};

const genDiff = (pathToFile1, pathToFile2) => {
  const { beforeContent, afterContent } = parse(pathToFile1, pathToFile2);
  const result = [];

  Object.keys(beforeContent).forEach((key) => {
    if (_.has(afterContent, key)) {
      if (beforeContent[key] === afterContent[key]) {
        result.push(`    ${key}: ${beforeContent[key]}`);
      } else {
        result.push(`  + ${key}: ${afterContent[key]}`);
        result.push(`  - ${key}: ${beforeContent[key]}`);
      }
    } else {
      result.push(`  - ${key}: ${beforeContent[key]}`);
    }
  });

  Object.keys(afterContent).forEach((key) => {
    if (!_.has(beforeContent, key)) {
      result.push(`  + ${key}: ${afterContent[key]}`);
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
