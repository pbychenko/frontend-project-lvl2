const renderJsonDiff = (diff) => {
  const func = (e) => {
    if (e.children) {
      return { ...e, children: e.children.map(func) };
    }

    const intValue = parseInt(e.value, 10);
    return { ...e, value: (!Number.isNaN(intValue) ? intValue : e.value) };
  };

  const renderList = diff.map(func);

  return JSON.stringify(renderList);
};

export default renderJsonDiff;
