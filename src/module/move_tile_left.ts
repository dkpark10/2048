import TileHandler from './move_tile';

const BOARD_SIZE = 4 as const;
export default class LeftMoveTileHandler extends TileHandler {

  constructor(origin: number[][]) {
    super(origin);
  }

  public move(): this {
    for (let row = 0; row < BOARD_SIZE; row++) {

      const tmp: number[] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (this.origin[row][col] !== 0) {
          tmp.push(this.origin[row][col]);
        }
      }

      if (tmp.length === 1) {
        this.newBoard[row][0] = tmp[0];
        continue;
      }

      this.combine(tmp);
      let idx = 0;
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === 0) {
          continue;
        }
        this.newBoard[row][idx] = tmp[i];
        idx++;
      }
    }
    return this;
  }
}