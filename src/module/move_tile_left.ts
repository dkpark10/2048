import TileHandler from './move_tile';

export default class LeftMoveTileHandler extends TileHandler {

  constructor(origin: number[][], d: number) {
    super(origin, d);
  }

  public move(): this {
    for (let row = 0; row < this.BOARD_SIZE; row++) {

      const moveDistance = this.calculMoveDistance(this.origin[row], row);
      moveDistance.forEach((distance, col) => {
        this.moveTileInfo[row][col].x = -1 * distance;
      });

      const tmp: number[] = [];
      for (let col = 0; col < this.BOARD_SIZE; col++) {
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