import _ from 'lodash';
import parse from './parser';
import renderSimpleDiff from './formatters/simple';
import renderPlainDiff from './formatters/plain';

export const render = (data, type) => {
  if (type === 'simple') {
    return renderSimpleDiff(data, 2);
  }

  if (type === 'plain') {
    return renderPlainDiff(data);
  }
};

const diff = (beforeContent, afterContent) => {
  const uniqKeys = _.union(Object.keys(beforeContent), Object.keys(afterContent));
  const f = (key) => {
    if (_.has(beforeContent, key) && _.has(afterContent, key)) {
      if (beforeContent[key] instanceof Object && afterContent[key] instanceof Object) {
        return { key, value: '', status: 'common', children: diff(beforeContent[key], afterContent[key]) };
      }
      if (beforeContent[key] instanceof Object) {
        return [{ key, value: '', status: 'changed', children: diff(beforeContent[key], beforeContent[key]) }, { key, value: afterContent[key], status: 'changed' } ];
      }
      if (afterContent[key] instanceof Object) {
        return [ {key, value: beforeContent[key], status: 'changed'}, {key, value: '', status: 'changed', children: diff(afterContent[key], afterContent[key])}]
      }
      if (beforeContent[key] === afterContent[key]) {
        return { key, value: beforeContent[key], status: 'common' };
      } 
      return [{ key, value: beforeContent[key], status: 'changed' }, { key, value: afterContent[key], status: 'changed' }];
    }

    if (_.has(beforeContent, key)) {
      if (beforeContent[key] instanceof Object) {
        return { key, value: '', status: 'removed', children: diff(beforeContent[key], beforeContent[key]) };
      } 
      return { key, value: beforeContent[key], status: 'removed' };
    }

    if (afterContent[key] instanceof Object) {
      return { key, value: '', status: 'added', children: diff(afterContent[key], afterContent[key]) };
    }
    return { key, value: afterContent[key], status: 'added' };
  };
  return _.flatten(uniqKeys.map(f));
};

export const genDiff = (pathToFile1, pathToFile2) => {
  const { beforeContent, afterContent } = parse(pathToFile1, pathToFile2);
  return diff(beforeContent, afterContent);
};
