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
    const diffItem = {
      common: e.value instanceof Array ? `${getPlainDiffByPath(e.value, fullPath)}` : '',
      equal: '',
      added: `Property '${fullPath}' was added with value: ${value}`,
      removed: `Property '${fullPath}' was removed`,
      changed: `Property '${fullPath}' was updated. From ${value} to ${formatValue(e.newValue)}`,
    };

    return diffItem[e.state];
  };

  const renderList = data.map(func).filter((e) => e !== '');
  return renderList.join('\n');
};

const renderPlainDiff = (diff) => getPlainDiffByPath(diff, '');

export default renderPlainDiff;
