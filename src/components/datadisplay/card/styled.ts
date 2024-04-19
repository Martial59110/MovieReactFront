import { Card } from 'antd';
import styled from 'styled-components';

interface CardComponentProps {
  borderradius?: string;
  margin?: string;
  padding?: string;
  background?: string;
}

export const CardStyled = styled(Card)<CardComponentProps>`
  border-radius: ${(props: CardComponentProps) => props.borderradius ?? '15px'};
  opacity: 1;
  margin: ${(props: CardComponentProps) => props.margin ?? '5px 5px 5px 5px'};
  padding: ${(props) => props.padding ?? '5px'};
  background: ${(props) => (props.background ? props.background : '#ffffff')};
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.05);
`;
