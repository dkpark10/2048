import React, { useEffect, useState } from 'react';
import Board from './tile_board';
import NewGameButton from './newgame';
import Score from './score';
import Modal from './modal';
import styled from 'styled-components';
import { makeTile, moveTile, isGameOver, isFullBoard } from '../module/tile_handler';
import { ITileResult } from '../module/move_tile';

const Wrapper2048 = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  background-color: #000a19;
  border-radius:6px;
  padding:20px;
`;

interface Props {
  initBoard: number[][];
}

export default function Game2048({ initBoard }: Props) {

  const [board, setBoard] = useState<number[][]>(initBoard);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

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
        <Board board={board} />
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