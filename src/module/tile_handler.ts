const BOARD_SIZE = 4 as const;

// 15번중 한번은 4값으로 나오게
const getInitValue = () => {
  const ran = Math.floor(Math.random() * 15);
  return ran < 14 ? 2 : 4;
}

const setTile = (board: number[][], cnt: number) => {

  const noTileList: number[] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      noTileList.push(i * BOARD_SIZE + j);
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

const moveTile = (board: number[][], dir: string): boolean => {

  switch (dir) {
    case 'ArrowRight':
      rightMove(board);
      break;
    case 'ArrowUp':
      upMove(board);
      break;
    case 'ArrowDown':
      downMove(board);
      break;
    case 'ArrowLeft':
      leftMove(board);
      break;
    default: break;
  }

  return true;
}

const rightMove = (board: number[][]) => {

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = BOARD_SIZE - 1; col >= 1; col--) {

      if(board[row][col] === 0){
        continue;
      }
      
      let value = board[row][col];
      for (let idx = BOARD_SIZE - 2; idx >= 0; idx--) {
        if (board[row][col] === board[row][idx]) {
          board[row][idx] = 0;
          value *= 2;
          break;
        }
      }

      board[row][col] = 0;
      for (let idx = BOARD_SIZE - 1; idx >= 1; idx--) {
        if (board[row][idx] === 0) {
          board[row][idx] = value;
          break;
        }
      }
    }

    for (let idx = BOARD_SIZE - 1; idx >= 0; idx--) {
      if (board[row][idx] === 0) {
        board[row][idx] = board[row][0];
        board[row][0] = 0;
        break;
      }
    }
  }
}

const upMove = (board: number[][]) => {

  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row < BOARD_SIZE - 1; row++) {

      if(board[row][col] === 0){
        continue;
      }

      let value = board[row][col];
      for (let idx = row + 1; row < BOARD_SIZE; idx++) {
        if (board[row][col] === board[idx][col]) {
          board[idx][col] = 0;
          value *= 2;
          break;
        }
      }

      board[row][col] = 0;
      for (let idx = 0; idx < BOARD_SIZE - 1; idx++) {
        if (board[idx][col] === 0) {
          board[idx][col] = value;
          break;
        }
      }
    }

    for (let idx = 0; idx < BOARD_SIZE; idx++) {
      if (board[idx][col] === 0) {
        board[idx][col] = board[3][col];
        board[3][col] = 0;
        break;
      }
    }
  }
}

const downMove = (board: number[][]) => {

  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = BOARD_SIZE - 1; row >= 1; row--) {

      if(board[row][col] === 0){
        continue;
      }

      let value = board[row][col];
      for (let idx = BOARD_SIZE - 2; idx >= 0; idx--) {
        if (board[row][col] === board[idx][col]) {
          board[idx][col] = 0;
          value *= 2;
          break;
        }
      }

      board[row][col] = 0;
      for (let idx = BOARD_SIZE - 1; idx >= 0; idx--) {
        if (board[idx][col] === 0) {
          board[idx][col] = value;
          break;
        }
      }
    }

    for (let idx = 0; idx < BOARD_SIZE; idx++) {
      if (board[idx][col] === 0) {
        board[idx][col] = board[0][col];
        board[0][col] = 0;
        break;
      }
    }
  }
}

const leftMove = (board: number[][]) => {

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE - 1; col++) {

      if(board[row][col] === 0){
        continue;
      }

      let value = board[row][col];
      for (let idx = col + 1; idx < BOARD_SIZE; idx++) {
        if (board[row][col] === board[row][idx]) {
          board[row][idx] = 0;
          value *= 2;
          break;
        }
      }

      board[row][col] = 0;
      for (let idx = 0; idx < BOARD_SIZE; idx++) {
        if (board[row][idx] === 0) {
          board[row][idx] = value;
          break;
        }
      }
    }

    for (let idx = 0; idx < BOARD_SIZE; idx++) {
      if (board[row][idx] === 0) {
        board[row][idx] = board[row][3];
        board[row][3] = 0;
        break;
      }
    }
  }
}

export { setTile, moveTile };