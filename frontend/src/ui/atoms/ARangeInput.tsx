import React from 'react';
import Slider from '@material-ui/core/Slider';

interface IARangeInputProps {
  step?: number;
  startMin?: number;
  startMax?: number;
  min?: number;
  max?: number;
  onChangeCommitted?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
}

const ARangeInput: React.FC<IARangeInputProps> = ({
  step = 1,
  startMin = 0,
  startMax = 0,
  min = 0,
  max = 0,
  onChangeCommitted = () => {},
}: IARangeInputProps) => {
  const [localValue, setLocalValue] = React.useState<number[]>([startMin, startMax]);

  const onChange = React.useCallback((e: React.ChangeEvent<{}>, value: number | number[]) => {
    if (Array.isArray(value)) {
      setLocalValue(value);
    }
  }, []);

  React.useEffect(() => {
    setLocalValue([startMin, startMax]);
  }, [startMin, startMax]);

  return (
    <Slider
      value={localValue}
      min={min}
      max={max}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
      valueLabelDisplay="on"
      step={step}
    />
  );
};

export { ARangeInput };
