import React from 'react';

const useScrollToRef = () => {
  const refEl = React.createRef<any>();

  const handleScrollToEl = (): void => {
    if (refEl && refEl.current) {
      const offset = refEl.current.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  return {
    refEl,
    handleScrollToEl,
  };
};

export { useScrollToRef };
