import React, { useEffect, useRef, useState } from 'react';
import Tile from './components/tile';
import styled from 'styled-components';
import tileData from './module/tile_color';
import { setTile, moveTile } from './module/tile_handler';

const TZ2EWrapper = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  background-color: #36373b;
  border-radius:6px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(4,1fr);
  padding:20px;
  gap: 5px;
`;

const BOARD_SIZE = 4 as const;
export default function App() {

  const init = Array.from({ length: 4 }, (v, i) => new Array(4).fill(0));
  const [board, setBoard] = useState<number[][]>(init);
  const [currentScore, setCurrentScore] = useState<number>(0);

  function keyDown(e: KeyboardEvent) {

    console.log(e.key);
    const isMoveable = moveTile(board, e.key);
    if (isMoveable !== false) {
      setTile(board, 1);
    }
    
    setBoard(prev => [...board]);
  }

  useEffect(() => {
    setTile(board, 2);
    setBoard(prev => [...board]);
    document.addEventListener('keydown', keyDown);
    return (() => document.removeEventListener('keydown', keyDown));
  }, []);

  return (
    <>
      <TZ2EWrapper >
        {board.map((row, rowIdx) => {
          return row.map((value, colIdx) => {
            return (
              <Tile
                key={rowIdx * BOARD_SIZE + colIdx}
                backColor={value !== 0 ? tileData[value].backColor : '#b0aea7'}
              >
                {value}
              </Tile>
            )
          })
        })}
      </TZ2EWrapper>
    </>
  )
}