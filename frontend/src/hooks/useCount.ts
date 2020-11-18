import React, { ChangeEvent } from 'react';

const useCount = (initialState: number | string = 1) => {
  const [count, setCount] = React.useState<number | string>(initialState);

  const changeCount = (type: string): void => {
    let newState;

    if (count != null) {
      newState = type === 'less' ? Number(count) - 1 : Number(count) + 1;
    } else {
      newState = 1;
    }

    if (newState > 0 && newState < 100) {
      setCount(newState);
    }
  };

  const handleInputCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value = e.target.value;

    if (value === '') {
      setCount('');
    } else if (Number(value) >= 0 && Number(value) < 100) {
      setCount(Number(value));
    }
  };

  const handleBlurCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value = e.target.value;

    if (value === '' || Number(value) === 0) {
      setCount(1);
    }
  };

  return {
    count,
    changeCount,
    handleInputCount,
    handleBlurCount,
  };
};

export { useCount };
