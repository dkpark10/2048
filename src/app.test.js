import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Game2048 from './components/game';

describe("2048 Game Test", () => {

  const initBoard = [
    [2, 4, 8, 16],
    [0, 0, 0, 0],
    [2, 4, 8, 16],
    [8, 8, 16, 256]
  ];

  const gameOverBoard = [
    [2, 4, 8, 16],
    [4, 8, 256, 1024],
    [32, 4, 8, 512],
    [8, 32, 16, 0]
  ];

  const lockBoard = [
    [2048, 1024, 512, 256],
    [4, 2, 4, 2],
    [32, 16, 256, 128],
    [0, 0, 0, 0]
  ];

  test("새 게임 버튼 테스트", async () => {

    const result = render(<Game2048 initBoard={initBoard} />);
    const cells = result.container.getElementsByClassName('cell');
    const inputButton = result.getByText('New Game');

    fireEvent.click(inputButton);

    let countofNumberCell = 0;
    for (let i = 0; i < 16; i++) {
      if (cells.item(i).textContent) {
        countofNumberCell++;
      }
    }

    expect(countofNumberCell).toBe(2);
  });

  test("움직일 곳이 없는 테스트", async () => {

    const result = render(<Game2048 initBoard={lockBoard} />);
    const cells = result.container.getElementsByClassName('cell');
    const inputButton = result.getByText('New Game');

    fireEvent.keyDown(inputButton, { key: 'ArrowRight' });
    fireEvent.keyDown(inputButton, { key: 'ArrowLeft' });
    fireEvent.keyDown(inputButton, { key: 'ArrowUp' });

    let isSamgeBoard = true;

    for (let i = 0; i < 16; i++) {
      const y = Math.floor(i / 4);
      const x = i % 4;
      if (cells.item(i).textContent === '') {
        if (lockBoard[y][x] !== 0)
          isSamgeBoard = false;
        break;
      }
    }

    expect(isSamgeBoard).toBe(true);
  });

  test("게임오버 테스트", async () => {

    const result = render(<Game2048 initBoard={gameOverBoard} />);
    const inputButton = result.getByText('New Game');

    fireEvent.keyDown(inputButton, { key: 'ArrowRight' });

    const gameOver = result.getByText('Game Over');
    expect(gameOver).toBeInTheDocument();
  });
});
