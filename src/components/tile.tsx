import React from 'react';
import styled from 'styled-components';
import tileData from '../module/tile_color';

interface Props {
  value: number;
}

const DefaultTile = styled.div`
  width:65px;
  height:65px;
  border-radius:5px;
  text-align:center;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const BackgroundTile = styled(DefaultTile)`
  position:relative;
  background: '#272626';
  box-shadow: inset 3px 3px 24px #1f1e1e,
              inset -3px -3px 16px #2f2e2e;
`;

const RealTile = styled(DefaultTile) <Partial<Props>>`
  position:absolute;
  background: ${({ value }) => tileData[value].backColor};
  box-shadow: ${({ value }) => tileData[value].shadow};

  & {
    color:white;
    font-size:${({ value }) => tileData[value].fontSize};
    font-weight:bold;
  }
`;

export default function Tile({
  value
}: Props
): JSX.Element {

  return (
    <BackgroundTile
      className={'cell'}
    >
      {value !== 0 &&
        <RealTile
          value={value}
        >
          {value}
        </RealTile>}
    </BackgroundTile >
  )
}