import UpMoveTileHandler from './move_tile_up';
import DownMoveTileHandler from './move_tile_down';
import LeftMoveTileHandler from './move_tile_left';
import RightMoveTileHandler from './move_tile_right';
import { ITileResult } from './move_tile';

const BOARD_SIZE = 4 as const;

// 15번중 한번은 4값으로 나오게
const getInitValue = () => {
  return Math.floor(Math.random() * 15) < 14 ? 2 : 4;
}

const isGameOver = (board: number[][]): boolean => {

  const diry: number[] = [0, 0, 1, -1];
  const dirx: number[] = [1, -1, 0, 0];

  const isOutRange = (y: number, x: number): boolean => {
    return y < 0 || x < 0 || y >= BOARD_SIZE || x >= BOARD_SIZE;
  }

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 0) {
        return false;
      }

      for (let i = 0; i < 4; i++) {
        const nextY = diry[i] + row;
        const nextX = dirx[i] + col;

        if (isOutRange(nextY, nextX)) {
          continue;
        }

        if (board[row][col] === board[nextY][nextX]) {
          return false;
        }
      }
    }
  }
  return true;
}

const makeTile = (board: number[][], cnt: number) => {

  const noTileList: number[] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 0) {
        noTileList.push(i * BOARD_SIZE + j);
      }
    }
  }

  while (cnt) {

    const newTileIndex = Math.floor(Math.random() * noTileList.length);
    const newY = Math.floor(noTileList[newTileIndex] / BOARD_SIZE);
    const newX = noTileList[newTileIndex] % BOARD_SIZE;

    if (board[newY][newX] === 0) {
      board[newY][newX] = getInitValue();
      cnt--;
    }
  }
}

const moveTile = (board: number[][], dir: string): ITileResult => {

  switch (dir) {
    case 'ArrowRight':
      return new RightMoveTileHandler(board)
        .move()
        .getResult();
    case 'ArrowLeft':
      return new LeftMoveTileHandler(board)
        .move()
        .getResult();
    case 'ArrowUp':
      return new UpMoveTileHandler(board)
        .move()
        .getResult();
    case 'ArrowDown':
      return new DownMoveTileHandler(board)
        .move()
        .getResult();
  }
}

export { makeTile, moveTile, isGameOver };