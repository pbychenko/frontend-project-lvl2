import _ from 'lodash';

const indentTemplate = '  ';
const indentStep = 2;

const formatValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }

  const indent = indentTemplate.repeat(depth + indentStep + 1);
  const closingIndent = indentTemplate.repeat(depth + 1);
  const func = (key) => `{\n${indent}${key}: ${value[key]}\n${closingIndent}}`;

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
          `${indent}- ${e.key}: ${formatValue(e.value, depth)}`,
          `${indent}+ ${e.key}: ${formatValue(e.newValue, depth)}`,
        ];
      case 'added':
        return `${indent}+ ${e.key}: ${formatValue(e.value, depth)}`;
      case 'removed':
        return `${indent}- ${e.key}: ${formatValue(e.value, depth)}`;
      case 'equal':
        return `${indent}  ${e.key}: ${formatValue(e.value, depth)}`;
      default:
        throw new Error(`Incorrect ast element: ${e.key}`);
    }
  };

  const renderList = _.flatten(diff.map(func));
  return `{\n${renderList.join('\n')}\n${indentTemplate.repeat(depth - 1)}}`;
};

const renderSimpleDiff = (diff) => getSimpleDiffByDepth(diff, 1);

export default renderSimpleDiff;
