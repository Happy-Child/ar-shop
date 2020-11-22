import React from 'react';

type TDeps = string | number | object | [];

const useEffectAfterRender = (callback: () => void, deps: TDeps[]): void => {
  const componentCreated = React.useRef(false);

  React.useEffect(() => {
    if (!componentCreated.current) {
      componentCreated.current = true;
      return;
    }
    callback();
  }, deps);
};

export { useEffectAfterRender };
