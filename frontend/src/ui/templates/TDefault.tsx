import React, { ReactNode } from 'react';
import OHeader from '../organisms/OHeader';
import OFooter from '../organisms/OFooter';
import styled from 'styled-components';

const LayoutStyled = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

const StyledMain = styled.main`
  flex-grow: 1;
`;

interface IProps {
  children: ReactNode;
}

const TDefault: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <LayoutStyled className="t-common">
      <OHeader />
      <StyledMain>{children}</StyledMain>
      <OFooter />
    </LayoutStyled>
  );
};

export default TDefault;
