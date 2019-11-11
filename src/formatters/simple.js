import _ from 'lodash';

const renderSimpleDiff = (diff, spaceCount = 2) => {
  const indent = ' '.repeat(spaceCount);

  const f = (e) => {
    const statePrefix = {
      common: `${indent}  `,
      added: `${indent}+ `,
      removed: `${indent}- `,
    };

    if (e.value instanceof Array) {
      if (e.state === 'changed') {
        return [`${statePrefix.removed}${e.key}: ${renderSimpleDiff(e.value, spaceCount + 4)}`, `${statePrefix.added}${e.key}: ${e.newValue}`];
      }
      return `${statePrefix[e.state]}${e.key}: ${renderSimpleDiff(e.value, spaceCount + 4)}`;
    }

    if (e.state === 'changed') {
      if (e.newValue instanceof Array) {
        return [`${statePrefix.removed}${e.key}: ${e.value}`, `${statePrefix.added}${e.key}: ${renderSimpleDiff(e.newValue, spaceCount + 4)}`];
      }
      return [`${statePrefix.removed}${e.key}: ${e.value}`, `${statePrefix.added}${e.key}: ${e.newValue}`];
    }

    return `${statePrefix[e.state]}${e.key}: ${e.value}`;
  };

  const renderList = _.flatten(diff.map(f));

  return `{\n${renderList.join('\n')}\n${' '.repeat(spaceCount - 2)}}`;
};

export default renderSimpleDiff;
