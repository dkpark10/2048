import TileHandler from './move_tile';

export default class UpMoveTileHandler extends TileHandler {

  constructor(origin: number[][], d: number) {
    super(origin, d);
  }

  public move(): this {

    const rotatedOrigin = this.rotate270(this.origin);
    for (let row = 0; row < this.BOARD_SIZE; row++) {

      // 북쪽 이동거리 계산은 왼쪽으로 돌려서 계산 후 다시 오른쪽
      const moveDistance = this.calculMoveDistance(rotatedOrigin[row], row);
      moveDistance.forEach((distance, col) => {
        this.moveTileInfo[col][this.BOARD_SIZE - 1 - row].y = -1 * distance;
      });

      const tmp: number[] = [];
      for (let col = 0; col < this.BOARD_SIZE; col++) {
        if (this.origin[col][row] !== 0) {
          tmp.push(this.origin[col][row]);
        }
      }

      if (tmp.length === 1) {
        this.newBoard[0][row] = tmp[0];
        continue;
      }

      this.combine(tmp);

      let idx = 0;
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === 0) {
          continue;
        }
        this.newBoard[idx][row] = tmp[i];
        idx++;
      }
    }

    return this;
  }
}