import _ from 'lodash';
import parse from './parser';
import renderSimpleDiff from './formatters/simple';
import renderPlainDiff from './formatters/plain';
import renderJsonDiff from './formatters/json';

const getAst = (beforeContent, afterContent) => {
  const uniqKeys = _.union(Object.keys(beforeContent), Object.keys(afterContent));
  const f = (key) => {
    if (_.has(beforeContent, key) && _.has(afterContent, key)) {
      if (beforeContent[key] instanceof Object && afterContent[key] instanceof Object) {
        return { key, status: 'common', children: getAst(beforeContent[key], afterContent[key]) };
      }
      if (beforeContent[key] instanceof Object) {
        return [{ key, status: 'changed', children: getAst(beforeContent[key], beforeContent[key]) }, { key, value: afterContent[key], status: 'changed' }];
      }
      if (afterContent[key] instanceof Object) {
        return [{ key, value: beforeContent[key], status: 'changed' }, { key, status: 'changed', children: getAst(afterContent[key], afterContent[key]) }];
      }
      if (beforeContent[key] === afterContent[key]) {
        return { key, value: beforeContent[key], status: 'common' };
      }
      return [{ key, value: beforeContent[key], status: 'changed' }, { key, value: afterContent[key], status: 'changed' }];
    }

    if (_.has(beforeContent, key)) {
      if (beforeContent[key] instanceof Object) {
        return { key, status: 'removed', children: getAst(beforeContent[key], beforeContent[key]) };
      }
      return { key, value: beforeContent[key], status: 'removed' };
    }

    if (afterContent[key] instanceof Object) {
      return { key, status: 'added', children: getAst(afterContent[key], afterContent[key]) };
    }
    return { key, value: afterContent[key], status: 'added' };
  };
  return _.flatten(uniqKeys.map(f));
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
  const { beforeContent, afterContent } = parse(pathToFile1, pathToFile2);
  const ast = getAst(beforeContent, afterContent);
  return render(ast, type);
};

export default genDiff;
