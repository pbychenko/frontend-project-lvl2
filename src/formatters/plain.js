const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getPlainDiffByPath = (data, path) => {
  const func = (e) => {
    const value = e.children ? '[complex value]' : formatValue(e.value);
    const fullPath = (path === '') ? e.key : `${path}.${e.key}`;
    const statePrefix = {
      common: e.children ? `${getPlainDiffByPath(e.children, fullPath)}` : '',
      added: `Property '${fullPath}' was added with value: ${value}`,
      removed: `Property '${fullPath}' was removed`,
      changed: `Property '${fullPath}' was updated. From ${value} to ${e.newChildren ? '[complex value]' : formatValue(e.newValue)}`,
    };

    return statePrefix[e.state];
  };

  const renderList = data.map(func).filter((e) => e !== '');
  return renderList.join('\n');
};

const renderPlainDiff = (diff) => getPlainDiffByPath(diff, '');

export default renderPlainDiff;
