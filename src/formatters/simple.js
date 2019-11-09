const renderSimpleDiff = (diff, spaceCount = 2) => {
  let k = 0;
  const indent = ' '.repeat(spaceCount);
  const getPrefix = (e) => {
    let prefix;
    switch (e.status) {
      case 'common':
        prefix = `${indent}  `;
        break;
      case 'changed':
        if (k === 0) {
          k = 1;
          prefix = `${indent}- `;
        } else {
          k = 0;
          prefix = `${indent}+ `;
        }
        break;
      case 'added':
        prefix = `${indent}+ `;
        break;
      case 'removed':
        prefix = `${indent}- `;
        break;
      default:
        break;
    }
    return prefix;
  };

  const f = (e) => {
    if (e.children) {
      return `${getPrefix(e)}${e.key}: ${renderSimpleDiff(e.children, spaceCount + 4)}`;
    }

    return `${getPrefix(e)}${e.key}: ${e.value}`;
  };

  const renderList = diff.map(f);

  return `{\n${renderList.join('\n')}\n${' '.repeat(spaceCount - 2)}}`;
};

export default renderSimpleDiff;
