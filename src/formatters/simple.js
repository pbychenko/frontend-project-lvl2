import _ from 'lodash';

const formatValue = (value, indent) => {
  if (value instanceof Object) {
    return `{\n${Object.keys(value).map((key) => `${indent}${' '.repeat(4)}${key}: ${value[key]}\n`)}${indent}}`;
  }

  return value;
};

const renderSimpleDiff = (diff, spaceCount = 2) => {
  const indent = ' '.repeat(spaceCount);

  const func = (e) => {
    const statePrefix = {
      common: `${indent}  `,
      added: `${indent}+ `,
      removed: `${indent}- `,
      equal: `${indent}  `,
    };

    if (e.state === 'common') {
      return `${statePrefix[e.state]}${e.key}: ${renderSimpleDiff(e.value, spaceCount + 4)}`;
    }

    if (e.state === 'changed') {
      return [
        `${statePrefix.removed}${e.key}: ${formatValue(e.value, ' '.repeat(spaceCount + 2))}`,
        `${statePrefix.added}${e.key}: ${formatValue(e.newValue, ' '.repeat(spaceCount + 2))}`,
      ];
    }

    return `${statePrefix[e.state]}${e.key}: ${formatValue(e.value, ' '.repeat(spaceCount + 2))}`;
  };

  const renderList = _.flatten(diff.map(func));

  return `{\n${renderList.join('\n')}\n${' '.repeat(spaceCount - 2)}}`;
};

export default renderSimpleDiff;
