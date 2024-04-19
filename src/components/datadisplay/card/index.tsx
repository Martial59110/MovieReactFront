import React, { CSSProperties, ReactNode } from 'react';

import { CardStyled } from './styled';

interface CardProps {
  children: ReactNode;
  borderradius?: string;
  margin?: string;
  padding?: string;
  hoverable?: boolean;
  background?: string;
  style?: CSSProperties;
}

export default function Card(props: CardProps) {
  const {
    children,
    borderradius,
    margin,
    padding,
    hoverable,
    background,
    style,
  } = props;

  return (
    <CardStyled
      background={background}
      hoverable={!!hoverable}
      borderradius={borderradius}
      margin={margin}
      style={style}
      padding={padding}>
      <React.Fragment>{children}</React.Fragment>
    </CardStyled>
  );
}
