const renderJsonDiff = (diff) => {
  // console.log(diff);
  const f = (e) => {
    if (e.value instanceof Array) {
      return { ...e, value: e.value.map(f) };
    }

    if (e.value instanceof Object) {
      return { ...e, value: f(e.value) };
    }

    
    const intValue = parseInt(e.value, 10);
    return { ...e, value: (!Number.isNaN(intValue) ? intValue : e.value) };
  };

  const renderList = diff.map(f);

  return JSON.stringify(renderList);
};

export default renderJsonDiff;
