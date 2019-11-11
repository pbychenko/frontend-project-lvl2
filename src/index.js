import _ from 'lodash';
import path from 'path';
import parse from './parser';
import renderSimpleDiff from './formatters/simple';
import renderPlainDiff from './formatters/plain';
import renderJsonDiff from './formatters/json';

const getAst = (beforeContent, afterContent) => {
  const uniqKeys = _.union(Object.keys(beforeContent), Object.keys(afterContent));
  const f = (key) => {
    if (_.has(beforeContent, key) && _.has(afterContent, key)) {
      if (beforeContent[key] instanceof Object && afterContent[key] instanceof Object) {
        return { key, state: 'common', value: getAst(beforeContent[key], afterContent[key]) };
      }
      if (beforeContent[key] instanceof Object) {
        return { key, state: 'changed', value: getAst(beforeContent[key], beforeContent[key]), newValue: afterContent[key] };
      }
      if (afterContent[key] instanceof Object) {
        return { key, state: 'changed', value: beforeContent[key], newValue: getAst(afterContent[key], afterContent[key]) };
      }
      if (beforeContent[key] === afterContent[key]) {
        return { key, state: 'common', value: beforeContent[key] };
      }
      return { key, value: beforeContent[key], state: 'changed', newValue: afterContent[key] };
    }

    if (_.has(beforeContent, key)) {
      if (beforeContent[key] instanceof Object) {
        return { key, state: 'removed', value: getAst(beforeContent[key], beforeContent[key]) };
      }
      return { key, state: 'removed', value: beforeContent[key] };
    }

    if (afterContent[key] instanceof Object) {
      return { key, state: 'added', value: getAst(afterContent[key], afterContent[key]) };
    }
    return { key, state: 'added', value: afterContent[key] };
  };
  return uniqKeys.map(f);
};

const render = (data, type) => {
  const renderTypes = {
    simple: renderSimpleDiff(data, 2),
    plain: renderPlainDiff(data),
    json: renderJsonDiff(data),
  };
  return renderTypes[type];
};

const genDiff = (pathToFile1, pathToFile2, type) => {
  const extname1 = path.extname(pathToFile1);
  const extname2 = path.extname(pathToFile2);
  const errorMessage = 'Different extnames of files, please compare only files with equal extname';

  if (extname1 === extname2) {
    const { beforeContent, afterContent } = parse(pathToFile1, pathToFile2, extname1);
    const ast = getAst(beforeContent, afterContent);
    return render(ast, type);
  }

  return errorMessage;
};

export default genDiff;
