const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (value instanceof Object) {
    return '[complex value]';
  }

  return value;
};

const getPlainDiffByPath = (data, path) => {
  const func = (e) => {
    const value = formatValue(e.value);
    const fullPath = (path === '') ? e.key : `${path}.${e.key}`;

    switch (e.state) {
      case 'common':
        return `${getPlainDiffByPath(e.value, fullPath)}`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${value} to ${formatValue(e.newValue)}`;
      case 'added':
        return `Property '${fullPath}' was added with value: ${value}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      default:
        return '';
    }
  };

  const renderList = data.map(func).filter((e) => e !== '');
  return renderList.join('\n');
};

const renderPlainDiff = (diff) => getPlainDiffByPath(diff, '');

export default renderPlainDiff;
