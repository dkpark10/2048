import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { makeTile, moveTile, isGameOver, isFullBoard } from '../module/tile_handler';
import { distanceCalculator, AnimationTile } from '../module/animation_calcul';
import { NewTileResult } from '../module/move_tile';

import Tile from './tile';
import NewGameButton from './newgame';
import Score from './score';
import Modal from './modal';

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

export default function Game2048(): JSX.Element {

  const board = useRef<number[][]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [animationTile, setAnimationTile] = useState<AnimationTile[][]>([]);

  const keyDown = (e: React.KeyboardEvent) => {

    if (e.key !== 'ArrowRight' &&
      e.key !== 'ArrowUp' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowDown') {
      return;
    }

    const result: NewTileResult = moveTile(board.current, e.key);
    const animationTile = distanceCalculator({
      prev:board.current,
      next:result.board
    },e.key);

    if (JSON.stringify(result.board) !== JSON.stringify(board.current)) {
      makeTile(result.board, 1);
      board.current = result.board;
      setScore(prev => prev + result.score);

      if (isFullBoard(result.board) && isGameOver(result.board)) {
        setGameOver(true);
      }
    }
  }

  const initialze = () => {
    setGameOver(false);
    setScore(0);

    const init = Array.from(Array(4), () => Array(4).fill(0));
    makeTile(init, 2);
    board.current = init;

    const initAnimationTile: AnimationTile[][] = Array.from({ length: 4 },
      (_, row) => Array.from({ length: 4 }, (_, col) => ({
        y: 0,
        x: 0,
        value: init[row][col],
        isDelete: false
      })));

    setAnimationTile(initAnimationTile);
  }

  useEffect(() => {
    initialze();
  }, [])

  return (
    <>
      <Wrapper2048>
        <Score score={score} />
        <BoardWrapper >
          {animationTile.map((row, rowidx) =>
            row.map((item, colidx) =>
              <Tile
                key={rowidx * 4 + colidx}
                value={item.value}
              />
            )
          )}
        </BoardWrapper>
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