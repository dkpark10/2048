import React, { useCallback, useEffect, useRef, useState } from 'react';
import Tile from './tile';
import styled from 'styled-components';
import tileData from '../module/tile_color';

const BoardWrapper = styled.div`
  background-color: #000a19;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(4,1fr);
  gap: 7px;
`;

interface IBoard {
  board: number[][];
}

export default function Board({ board }: IBoard) {

  return (
    <>
      <BoardWrapper >
        {board.map((row, rowIdx) => {
          return row.map((value, colIdx) => {
            return (
              <Tile
                key={rowIdx * 4 + colIdx}
                backColor={value !== 0 ? tileData[value].backColor : '#00203f'}
                fontSize={value !== 0 ? tileData[value].fontSize : '1.0rem'}
              >
                {value !== 0 ? value : ''}
              </Tile>
            )
          })
        })}
      </BoardWrapper>
    </>
  )
}