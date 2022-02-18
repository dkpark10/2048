import React, { useEffect, useState } from 'react';
import Board from './components/tile_board';
import NewGameButton from './components/newgame';
import Score from './components/score';
import Modal from './components/modal';
import styled from 'styled-components';
import { makeTile, moveTile, isGameOver } from './module/tile_handler';
import { ITileResult } from './module/move_tile';

const Wrapper2048 = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  background-color: #000a19;
  border-radius:6px;
  padding:20px;
`;

export default function App() {

  const init = Array.from({ length: 4 }, (v, i) => new Array(4).fill(0));
  const [board, setBoard] = useState<number[][]>(init);
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
      setBoard(prev => [...result.board]);
      setScore(prev => prev + result.score);

      const isFullBoard = result.board.reduce((rowAcc, row) => {
        return rowAcc += row.reduce((colAcc, col) => {
          return colAcc += col !== 0 ? 1 : 0;
        }, 0);
      }, 0);

      if (isFullBoard === 16 && isGameOver(result.board)) {
        setGameOver(true);
      }
    }
  }

  const initialze = () => {
    makeTile(init, 2);
    setBoard(prev => [...init]);
    setGameOver(false);
  }

  useEffect(() => {
    initialze();
  }, [])

  return (
    <>
      <Wrapper2048>
        <Score score={score} />
        <Board board={board} />
        <NewGameButton
          onKeyDown={(e: React.KeyboardEvent) => keyDown(e)}
          onReset={initialze}
        />
      </Wrapper2048>
      <Modal
        isGameOver={gameOver}
        resetClick={initialze}
        score={score}
      />
    </>
  )
}