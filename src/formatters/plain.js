const formatValue = (value) => {
  if (value instanceof Array) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getPlainDiffByPath = (data, path) => {
  const f = (e) => {
    const value = formatValue(e.value);
    const fullPath = (path === '') ? e.key : `${path}.${e.key}`;
    const statePrefix = {
      common: e.value instanceof Array ? `${getPlainDiffByPath(e.value, fullPath)}` : '',
      added: `Property '${fullPath}' was added with value: ${value}`,
      removed: `Property '${fullPath}' was removed`,
      changed: `Property '${fullPath}' was updated. From ${value} to ${formatValue(e.newValue)}`,
    };

    return statePrefix[e.state];
  };

  const renderList = data.map(f).filter((e) => e !== '');
  return renderList.join('\n');
};

const renderPlainDiff = (diff) => getPlainDiffByPath(diff, '');

export default renderPlainDiff;
