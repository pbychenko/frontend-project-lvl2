import _ from 'lodash';

const indentTemplate = '  ';
const indentStep = 2;

const formatValue = (value, indent) => {
  if (!(value instanceof Object)) {
    return value;
  }

  const func = (key) => `{\n${indent}${indentTemplate.repeat(3)}${key}: ${value[key]}\n${indent}${indentTemplate}}`;
  return Object.keys(value).map(func);
};

const getSimpleDiffByDepth = (diff, depth) => {
  const indent = indentTemplate.repeat(depth);

  const func = (e) => {
    switch (e.state) {
      case 'nested':
        return `${indent}  ${e.key}: ${getSimpleDiffByDepth(e.children, depth + indentStep)}`;
      case 'changed':
        return [
          `${indent}- ${e.key}: ${formatValue(e.value, indent)}`,
          `${indent}+ ${e.key}: ${formatValue(e.newValue, indent)}`,
        ];
      case 'added':
        return `${indent}+ ${e.key}: ${formatValue(e.value, indent)}`;
      case 'removed':
        return `${indent}- ${e.key}: ${formatValue(e.value, indent)}`;
      case 'equal':
        return `${indent}  ${e.key}: ${formatValue(e.value, indent)}`;
      default:
        return `Incorrect ast element: ${e.key}`;
    }
  };

  const renderList = _.flatten(diff.map(func));

  return `{\n${renderList.join('\n')}\n${indentTemplate.repeat(depth - 1)}}`;
};

const renderSimpleDiff = (diff) => getSimpleDiffByDepth(diff, 1);

export default renderSimpleDiff;
