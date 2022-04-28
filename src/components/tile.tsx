import React, { forwardRef } from 'react';
import styled from 'styled-components';
import tileData from '../module/tile_color';

interface Props {
  value: number;
  children: any;
}

const CellStyle = styled.div<Props>`
  width:65px;
  height:65px;
  font-size:1vmax;
  border-radius:5px;
  text-align:center;
  display:flex;
  justify-content:center;
  align-items:center;

  background: ${({ value }) => value === 0 ? '#272626' : tileData[value].backColor};
  box-shadow: ${({ value }) => value === 0 ?
    `inset 3px 3px 24px #1f1e1e,
    inset -3px -3px 16px #2f2e2e`
    : tileData[value].shadow
  };

  & {
    color:white;
    font-size:${({ value }) => value === 0 ? '1.0rem' : tileData[value].fontSize};
    font-weight:bold;
  }
`;

export default forwardRef(function Tile({
  value,
  children }: Props,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {

  return (
    <>
      <CellStyle
        ref={ref}
        className={'cell'}
        value={value}
      >
        {children}
      </CellStyle>
    </>
  )
})