import React, { useRef, forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import tileData from '../module/tile_color';
import { Timeline, Tween } from 'react-gsap';
import { MoveTileInfo } from '../module/move_tile';

interface Props {
  value: number;
  distance: MoveTileInfo;
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

export default function Tile({
  value,
  distance }: Props
  // ref: React.Ref<HTMLDivElement>
): JSX.Element {

  const ref = useRef(null);

  return (
    <BackgroundTile
      className={'cell'}
    >
      {value !== 0 &&
        <RealTile
          ref={ref}
          value={value}
        >
          {value}
        </RealTile>}
    </BackgroundTile >
  )
}