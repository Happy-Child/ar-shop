import React, {ReactNode} from 'react';
import TDefault from '../ui/templates/TDefault';
import { DatePicker } from 'antd';

const PHome: React.FC<ReactNode> = () => {
  return (
    <TDefault>
      homepage
      <DatePicker />
    </TDefault>
  );
};

export default PHome;
