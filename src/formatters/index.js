import renderSimpleDiff from './simple';
import renderPlainDiff from './plain';
import renderJsonDiff from './json';

const render = (data, type) => {
  const renderTypes = {
    simple: renderSimpleDiff,
    plain: renderPlainDiff,
    json: renderJsonDiff,
  };

  return renderTypes[type](data);
};

export default render;
