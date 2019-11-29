import renderSimpleDiff from './simple';
import renderPlainDiff from './plain';

const render = (data, type) => {
  const renderTypes = {
    simple: renderSimpleDiff,
    plain: renderPlainDiff,
    json: JSON.stringify,
  };

  return renderTypes[type](data);
};

export default render;
