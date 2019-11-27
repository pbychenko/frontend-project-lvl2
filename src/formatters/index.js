import renderSimpleDiff from './simple';
import renderPlainDiff from './plain';
import renderJsonDiff from './json';

const render = (data, type) => {
  const renderTypes = {
    simple: renderSimpleDiff(data),
    plain: renderPlainDiff(data),
    json: renderJsonDiff(data),
  };

  return renderTypes[type];
};

export default render;