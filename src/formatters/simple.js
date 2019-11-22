import _ from 'lodash';

const indentTemplate = '  ';
const indentStep = 2;

const formatValue = (value, indent) => {
  if (!(value instanceof Object)) {
    return value;
  }

  return `{\n${Object.keys(value).map((key) => `${indent}${indentTemplate.repeat(3)}${key}: ${value[key]}\n`)}${indent}${indentTemplate}}`;
};

const getSimpleDiffWithIndent = (diff, indentCount) => {
  const indent = indentTemplate.repeat(indentCount);

  const func = (e) => {
    switch (e.state) {
      case 'common':
        return `${indent}  ${e.key}: ${getSimpleDiffWithIndent(e.value, indentCount + indentStep)}`;
      case 'changed':
        return [
          `${indent}- ${e.key}: ${formatValue(e.value, indent)}`,
          `${indent}+ ${e.key}: ${formatValue(e.newValue, indent)}`,
        ];
      case 'added':
        return `${indent}+ ${e.key}: ${formatValue(e.value, indent)}`;
      case 'removed':
        return `${indent}- ${e.key}: ${formatValue(e.value, indent)}`;
      default:
        return `${indent}  ${e.key}: ${formatValue(e.value, indent)}`;
    }
  };

  const renderList = _.flatten(diff.map(func));

  return `{\n${renderList.join('\n')}\n${indentTemplate.repeat(indentCount - 1)}}`;
};

const renderSimpleDiff = (diff) => getSimpleDiffWithIndent(diff, 1);

export default renderSimpleDiff;
