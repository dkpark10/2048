import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from './app';
import Board from './components/tile_board';

describe("2048 test", () => {
  const initBoard = [
    [2, 4, 8, 16],
    [0, 0, 0, 0],
    [2, 4, 8, 16],
    [8, 8, 16, 256]
  ];
  const gameOverBoard = [
    [2, 4, 8, 16],
    [4, 8, 256, 1024],
    [2, 4, 8, 16],
    [8, 2, 16, 256]
  ];

  it("reset button", async () => {
    const result = render(
      <App>
        <Board board={initBoard} />
      </App>);
    const inputButton = result.getByText('New Game');

    fireEvent.click(inputButton);
    const cells = result.container.getElementsByClassName('cell');
    expect(cells.length).toBe(16);

    let len = 0;
    for (let i = 0; i < 16; i++) {
      if (cells.item(i).textContent) {
        len++;
      }
    }
    expect(len).toBe(2);
  });

  it("game over test", async () => {
    const result = render(
      <App>
        <Board board={gameOverBoard} />
      </App>);
    const inputButton = result.getByText('New Game');

    fireEvent.keyDown(inputButton, { key: 'ArrowRight' });
    expect(result.getByText('Game Over', { hidden: true })).toBeInTheDocument();
  });
});
