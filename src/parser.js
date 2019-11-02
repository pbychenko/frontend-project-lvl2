import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';

const parse = (pathToFile1, pathToFile2) => {
  // console.log(pathToFile1);
  // console.log(pathToFile2);
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

export default parse;
