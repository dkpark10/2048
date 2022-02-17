import React from 'react';
import styled from 'styled-components';

interface Props {
  backColor: string;
  fontSize: string; 
  children: any;
}

const CellStyle = styled.div<Props>`
  width:65px;
  height:65px;
  font-size:1vmax;
  border-radius:5px;
  text-align:center;
  background-color: ${({ backColor }) => backColor};
  display:flex;
  justify-content:center;
  align-items:center;

  &{
    color:white;
    font-size:${({fontSize}) => fontSize};
    font-weight:bold;
  }
`

export default function Tile({
  backColor,
  fontSize,
  children }: Props) {

  return (
    <>
      <CellStyle
        backColor={backColor}
        fontSize={fontSize}
      >
        {children}
      </CellStyle>
    </>
  )
}