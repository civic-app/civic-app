import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

export const createSnapshot = (Component, props) => {
  const renderer = new ShallowRenderer();
  renderer.render(<Component {...props} />);
  return renderer.getRenderOutput();
};
