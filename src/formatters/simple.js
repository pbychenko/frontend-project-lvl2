const renderSimpleDiff = (diff, spaceCount = 2) => {
  let isFirstChanged = true;
  const indent = ' '.repeat(spaceCount);

  const f = (e) => {
    let prefix;
    switch (e.status) {
      case 'common':
        prefix = `${indent}  `;
        break;
      case 'changed':
        if (isFirstChanged) {
          isFirstChanged = false;
          prefix = `${indent}- `;
        } else {
          isFirstChanged = true;
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

    if (e.children) {
      return `${prefix}${e.key}: ${renderSimpleDiff(e.children, spaceCount + 4)}`;
    }

    return `${prefix}${e.key}: ${e.value}`;
  };

  const renderList = diff.map(f);

  return `{\n${renderList.join('\n')}\n${' '.repeat(spaceCount - 2)}}`;
};

export default renderSimpleDiff;
