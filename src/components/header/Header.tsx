import React from 'react';
import { ButtonWrapper } from '../../styledComponents/StyledComponents';
import { HeaderContainer } from './HeaderStyled';

function Header({handleDownload}:any) {
  return (
    <HeaderContainer>
      <ButtonWrapper onClick={handleDownload}>Download</ButtonWrapper>
    </HeaderContainer>
  )
}

export default Header