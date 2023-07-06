import  styled from 'styled-components'
import {
  top,
  left,
  flex,
  size,
  order,
  color,
  space,
  width,
  right,
  height,
  bottom,
  margin,
  zIndex,
  border,
  gridGap,
  gridRow,
  opacity,
  display,
  padding,
  flexGrow,
  position,
  maxWidth,
  minWidth,
  fontSize,
  overflow,
  flexWrap,
  flexBasis,
  textAlign,
  maxHeight,
  alignSelf,
  minHeight,
  boxShadow,
  borderTop,
  alignItems,
  fontWeight,
  lineHeight,
  gridColumn,
  fontFamily,
  gridRowGap,
  borderColor,
  borderRight,
  gridAutoRows,
  gridAutoFlow,
  borderRadius,
  alignContent,
  flexDirection,
  gridColumnGap,
  letterSpacing,
  justifyContent,
  gridAutoColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridTemplateColumns,
} from 'styled-system';

interface BoxProps {
  readonly bg?: string;
  readonly top?: string;
  readonly left?: string;
  readonly flex?: string;
  readonly size?: string;
  readonly order?: string;
  readonly color?: string;
  readonly space?: string;
  readonly width?: string;
  readonly right?: string;
  readonly cursor?: string;
  readonly height?: string;
  readonly bottom?: string;
  readonly margin?: string;
  readonly zIndex?: string;
  readonly border?: string;
  readonly hoverBg?: string;
  readonly gridGap?: string;
  readonly gridRow?: string;
  readonly opacity?: string;
  readonly display?: string;
  readonly padding?: string;
  readonly flexGrow?: string;
  readonly position?: string;
  readonly maxWidth?: string;
  readonly minWidth?: string;
  readonly fontSize?: string;
  readonly overflow?: string;
  readonly flexWrap?: string;
  readonly flexBasis?: string;
  readonly textAlign?: string;
  readonly maxHeight?: string;
  readonly alignSelf?: string;
  readonly minHeight?: string;
  readonly transform?: string;
  readonly boxShadow?: string;
  readonly borderTop?: string;
  readonly alignItems?: string;
  readonly fontWeight?: string;
  readonly lineHeight?: string;
  readonly gridColumn?: string;
  readonly fontFamily?: string;
  readonly gridRowGap?: string;
  readonly transition?: string;
  readonly borderColor?: string;
  readonly borderRight?: string;
  readonly gridAutoRows?: string;
  readonly gridAutoFlow?: string;
  readonly borderRadius?: string;
  readonly alignContent?: string;
  readonly flexDirection?: string;
  readonly gridColumnGap?: string;
  readonly letterSpacing?: string;
  readonly justifyContent?: string;
  readonly gridAutoColumns?: string;
  readonly gridTemplateRows?: string;
  readonly gridTemplateAreas?: string;
  readonly gridTemplateColumns?: string;
}; 

export const Box = styled.div<BoxProps>`
  ${top}
  ${left}
  ${flex}
  ${size}
  ${order}
  ${color}
  ${space}
  ${width}
  ${right}
  ${height}
  ${bottom}
  ${margin}
  ${zIndex}
  ${border}
  ${gridGap}
  ${gridRow}
  ${opacity}
  ${display}
  ${padding}
  ${flexGrow}
  ${position}
  ${maxWidth}
  ${minWidth}
  ${fontSize}
  ${overflow}
  ${flexWrap}
  ${flexBasis}
  ${textAlign}
  ${maxHeight}
  ${borderTop}
  ${alignSelf}
  ${minHeight}
  ${boxShadow}
  ${alignItems}
  ${fontWeight}
  ${lineHeight}
  ${gridColumn}
  ${fontFamily}
  ${gridRowGap}
  ${borderColor}
  ${borderRight}
  ${gridAutoRows}
  ${gridAutoFlow}
  ${borderRadius}
  ${alignContent}
  ${flexDirection}
  ${gridColumnGap}
  ${letterSpacing}
  ${justifyContent}
  ${gridAutoColumns}
  ${gridTemplateRows}
  ${gridTemplateAreas}
  ${gridTemplateColumns}
  background: ${({ bg }) => bg}
  cursor: ${({ cursor }) => cursor}
  transform: ${({ transform }) => transform}
  transition: ${({ transition }) => transition}

  &:hover {
    color: red;
    padding: 10px;
  }
`;