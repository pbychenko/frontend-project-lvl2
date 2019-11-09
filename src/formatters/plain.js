const renderPlainDiff = (diff) => {
  const pd = (data, path) => {
    let k = 0;
    const f = (e) => {
      const value = e.children ? '[complex value]' : e.value;
      const fullPath = (path === '') ? e.key : `${path}.${e.key}`;
      let diffElement;

      switch (e.status) {
        case 'removed':
          diffElement = `Property '${fullPath}' was removed\n`;
          break;
        case 'added':
          diffElement = `Property '${fullPath}' was added with value: ${value}\n`;
          break;
        case 'changed':
          if (k === 0) {
            k = 1;
            diffElement = `Property '${fullPath}' was updated. From ${value}`;
            break;
          }
          k = 0;
          diffElement = ` to ${value}\n`;
          break;
        case 'common':
          if (e.children) {
            diffElement = pd(e.children, fullPath);
          }
          break;
        default:
          break;
      }
      return diffElement;
    };

    const renderList = data.map(f);
    return renderList.join('');
  };

  const result = pd(diff, '');
  return result.substring(0, result.length - 1);
};

export default renderPlainDiff;
