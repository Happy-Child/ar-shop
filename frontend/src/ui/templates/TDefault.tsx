import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const TDefault: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <div className="t-common t-default">
      t-default
      {children}
    </div>
  );
};

export default TDefault;
