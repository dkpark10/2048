import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { makeTile, moveTile, isGameOver, isFullBoard } from '../module/tile_handler';
import { ITileResult } from '../module/move_tile';

import Tile from './tile';
import NewGameButton from './newgame';
import Score from './score';
import Modal from './modal';

const Wrapper2048 = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  background-color: #2e2d2d;
  box-shadow: 4px 4px 10px #272626;
  border-radius:6px;
  padding:20px;
`;

const BoardWrapper = styled.div`
  background-color: #2e2d2d;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 6px;
`;

interface Props {
  initBoard: number[][];
}

export default function Game2048({ initBoard }: Props) {

  const [board, setBoard] = useState<number[][]>(initBoard);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

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
          {board.map((row, rowIdx) => {
            return row.map((value, colIdx) => {
              return (
                <Tile
                  ref={ref}
                  key={rowIdx * 4 + colIdx}
                  value={value}
                >
                  {value !== 0 ? value : ''}
                </Tile>
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