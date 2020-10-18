import React, { ReactNode } from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  display: flex;
  align-items: center;
`;

const OFooter: React.FC<ReactNode> = () => {
  return (
    <FooterStyled>
      <span>sedfsdf</span>
      <span>sedfsdf</span>
      <span>sedfsdf</span>
      <span>sedfsdf</span>
      <span>sedfsdf</span>
      <span>sedfsdf</span>
      <span>sedfsdf</span>
    </FooterStyled>
  );
};

export default OFooter;
