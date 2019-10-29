import fs from 'fs';
import _ from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const beforeContent = JSON.parse(fs.readFileSync(`./${pathToFile1}`, 'utf8'));
  const afterContent = JSON.parse(fs.readFileSync(`./${pathToFile2}`, 'utf8'));

  const result = {};

  Object.keys(beforeContent).forEach((key) => {
    if (_.has(afterContent, key)) {
      if (beforeContent[key] === afterContent[key]) {
        result[key] = beforeContent[key];
      } else {
        result[`+ ${key}`] = afterContent[key];
        result[`- ${key}`] = beforeContent[key];
      }
    } else {
      result[`- ${key}`] = beforeContent[key];
    }
  });

  Object.keys(afterContent).forEach((key) => {
    if (!_.has(beforeContent, key)) {
      result[`+ ${key}`] = afterContent[key];
    }
  });

  return JSON.stringify(result);
};

export default genDiff;
