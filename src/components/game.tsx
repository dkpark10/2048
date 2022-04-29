import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { makeTile, moveTile, isGameOver, isFullBoard } from '../module/tile_handler';
import { ITileResult, MoveTileInfo } from '../module/move_tile';

import Tile from './tile';
import NewGameButton from './newgame';
import Score from './score';
import Modal from './modal';

interface Props {
  initBoard: number[][];
  initDistance: MoveTileInfo[][];
}

const Wrapper2048 = styled.main`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  padding:20px;
  border-radius:6px;
  background-color: #2e2d2d;
  box-shadow: 4px 4px 10px #272626;
`;

const BoardWrapper = styled.div`
  background-color: #2e2d2d;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 6px;
`;

export default function Game2048({
  initBoard,
  initDistance
}: Props) {

  const [board, setBoard] = useState<number[][]>(initBoard);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [moveTileDistance, setMoveTileDistance] = useState<MoveTileInfo[][]>(initDistance);

  const ref = useRef(null);
  useEffect(() => {
    return (() => ref.current = null)
  })

  const keyDown = (e: React.KeyboardEvent) => {

    if (e.key !== 'ArrowRight' &&
      e.key !== 'ArrowUp' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowDown') {
      return;
    }

    const result: ITileResult = moveTile(board, e.key);

    if (JSON.stringify(result.board) !== JSON.stringify(board)) {
      makeTile(result.board, 1);
      setBoard([...result.board]);
      setMoveTileDistance([...result.moveInfo]);
      setScore(prev => prev + result.score);

      if (isFullBoard(result.board) && isGameOver(result.board)) {
        setGameOver(true);
      }
    }
  }

  const initialze = (boardParam: number[][]) => {
    makeTile(boardParam, 2);
    setBoard([...boardParam]);
    setGameOver(false);
    setScore(0);
  }

  useEffect(() => {
    setBoard([...board]);
  }, [])

  return (
    <>
      <Wrapper2048>
        <Score score={score} />
        <BoardWrapper >
          {board.map((row, rowidx) => {
            return row.map((value, colidx) => {
              return (
                <Tile
                  key={rowidx * 4 + colidx}
                  value={value}
                  distance={moveTileDistance[rowidx][colidx]}
                />
              )
            })
          })}
        </BoardWrapper>
        <NewGameButton
          onKeyDown={(e: React.KeyboardEvent) => keyDown(e)}
          onReset={() => initialze(Array.from(Array(4), () => Array(4).fill(0)))}
        />
      </Wrapper2048>
      <Modal
        isGameOver={gameOver}
        resetClick={() => initialze(Array.from(Array(4), () => Array(4).fill(0)))}
        score={score}
      />
    </>
  )
}