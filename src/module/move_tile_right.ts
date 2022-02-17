import TileHandler from './move_tile';

const BOARD_SIZE = 4 as const;
export default class RightMoveTileHandler extends TileHandler {

  constructor(origin: number[][]) {
    super(origin);
  }

  public move(): this {
    for (let row = 0; row < BOARD_SIZE; row++) {

      const tmp: number[] = [];
      for (let col = BOARD_SIZE - 1; col >= 0; col--) {
        if (this.origin[row][col] !== 0) {
          tmp.push(this.origin[row][col]);
        }
      }

      if (tmp.length === 1) {
        this.newBoard[row][BOARD_SIZE - 1] = tmp[0];
        continue;
      }

      this.combine(tmp);
      let idx = BOARD_SIZE - 1;
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === 0) {
          continue;
        }
        this.newBoard[row][idx] = tmp[i];
        idx--;
      }
    }
    return this;
  }
}