import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent } from 'react';
import DebouncePromise from 'awesome-debounce-promise';

const onChangeDebounce = DebouncePromise<(params: { fn: (text: string) => void; text: string }) => void>(
  ({ fn, text }) => fn(text),
  800,
);

export interface IAInputDebounce {
  value: string;
  label?: string;
  className: string;
  onChangeValue: (text: string) => void;
}

const AInputDebounce: React.FC<IAInputDebounce> = ({
  value: startValue,
  label,
  onChangeValue,
  className = '',
}: IAInputDebounce) => {
  const [localValue, setLocalValue] = React.useState<string>(String(startValue) || '');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChangeDebounce({
      fn: onChangeValue,
      text: e.target.value,
    });
  };

  return <TextField className={className} label={label} value={localValue} onChange={handleChange} />;
};

export { AInputDebounce };
