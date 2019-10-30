import fs from 'fs';
import _ from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const beforeContent = JSON.parse(fs.readFileSync(`${pathToFile1}`, 'utf8'));
  const afterContent = JSON.parse(fs.readFileSync(`${pathToFile2}`, 'utf8'));

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
