import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parser';
import render from './formatters';

const getAst = (beforeContent, afterContent) => {
  const uniqKeys = _.union(Object.keys(beforeContent), Object.keys(afterContent));
  const getAstElement = (key) => {
    if (_.has(beforeContent, key) && _.has(afterContent, key)) {
      if (beforeContent[key] instanceof Object && afterContent[key] instanceof Object) {
        return {
          key, state: 'common', children: getAst(beforeContent[key], afterContent[key]),
        };
      }

      if (beforeContent[key] instanceof Object) {
        return {
          key, state: 'changed', children: getAst(beforeContent[key], beforeContent[key]), newValue: afterContent[key],
        };
      }

      if (afterContent[key] instanceof Object) {
        return {
          key, state: 'changed', value: beforeContent[key], newChildren: getAst(afterContent[key], afterContent[key]),
        };
      }

      if (beforeContent[key] === afterContent[key]) {
        return { key, state: 'common', value: beforeContent[key] };
      }

      return {
        key, state: 'changed', value: beforeContent[key], newValue: afterContent[key],
      };
    }

    if (_.has(beforeContent, key)) {
      if (beforeContent[key] instanceof Object) {
        return { key, state: 'removed', children: getAst(beforeContent[key], beforeContent[key]) };
      }
      return { key, state: 'removed', value: beforeContent[key] };
    }

    if (afterContent[key] instanceof Object) {
      return { key, state: 'added', children: getAst(afterContent[key], afterContent[key]) };
    }
    return { key, state: 'added', value: afterContent[key] };
  };

  return uniqKeys.map(getAstElement);
};

const genDiff = (pathToFile1, pathToFile2, type) => {
  const extname1 = path.extname(pathToFile1);
  const extname2 = path.extname(pathToFile2);
  const errorMessage = 'Different extnames of files, please compare only files with equal extname';

  if (extname1 === extname2) {
    const dataFile1 = fs.readFileSync(`${pathToFile1}`, 'utf8');
    const beforeContent = parse(dataFile1, extname1);

    const dataFile2 = fs.readFileSync(`${pathToFile2}`, 'utf8');
    const afterContent = parse(dataFile2, extname2);

    const ast = getAst(beforeContent, afterContent);

    return render(ast, type);
  }

  return errorMessage;
};

export default genDiff;
