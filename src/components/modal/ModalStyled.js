import styled from 'styled-components';
import { ShadowWrapper } from '../../styledComponents/StyledComponents';
import '../../styles/variables.css';

export const ModalPositionWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// export const ModalContentWrapper = styled(ShadowWrapper)`
// width: 320px;
// min-width: 320px;
// height: 132px;
// background-color:var(--form-bg-color);
// color:var(--form-color);
// box-shadow:unset;
// border-radius:8px;
// overflow: hidden;
// `;