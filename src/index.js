import _ from 'lodash';
import parse from './parser';
import renderSimpleDiff from './formatters/simple';
import renderPlainDiff from './formatters/plain';
import renderJsonDiff from './formatters/json';

const getDiff = (beforeContent, afterContent) => {
  const uniqKeys = _.union(Object.keys(beforeContent), Object.keys(afterContent));
  const f = (key) => {
    if (_.has(beforeContent, key) && _.has(afterContent, key)) {
      if (beforeContent[key] instanceof Object && afterContent[key] instanceof Object) {
        return { key, status: 'common', children: getDiff(beforeContent[key], afterContent[key]) };
      }
      if (beforeContent[key] instanceof Object) {
        return [{ key, status: 'changed', children: getDiff(beforeContent[key], beforeContent[key]) }, { key, value: afterContent[key], status: 'changed' }];
      }
      if (afterContent[key] instanceof Object) {
        return [{ key, value: beforeContent[key], status: 'changed' }, { key, status: 'changed', children: getDiff(afterContent[key], afterContent[key]) }];
      }
      if (beforeContent[key] === afterContent[key]) {
        return { key, value: beforeContent[key], status: 'common' };
      }
      return [{ key, value: beforeContent[key], status: 'changed' }, { key, value: afterContent[key], status: 'changed' }];
    }

    if (_.has(beforeContent, key)) {
      if (beforeContent[key] instanceof Object) {
        return { key, status: 'removed', children: getDiff(beforeContent[key], beforeContent[key]) };
      }
      return { key, value: beforeContent[key], status: 'removed' };
    }

    if (afterContent[key] instanceof Object) {
      return { key, status: 'added', children: getDiff(afterContent[key], afterContent[key]) };
    }
    return { key, value: afterContent[key], status: 'added' };
  };
  return _.flatten(uniqKeys.map(f));
};

export const genDiff = (pathToFile1, pathToFile2) => {
  const { beforeContent, afterContent } = parse(pathToFile1, pathToFile2);
  return getDiff(beforeContent, afterContent);
};

export const render = (data, type) => {
  switch (type) {
    case 'simple':
      return renderSimpleDiff(data, 2);
    case 'plain':
      return renderPlainDiff(data);
    case 'json':
      return renderJsonDiff(data);
    default:
      return renderPlainDiff(data);
  }
};
