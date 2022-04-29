import TileHandler from './move_tile';

export default class DownMoveTileHandler extends TileHandler {

  constructor(origin: number[][], d: number) {
    super(origin, d);
  }

  public move(): this {

    const rotatedOrigin = this.rotate90(this.origin);
    for (let row = 0; row < this.BOARD_SIZE; row++) {

      // 아래 이동거리 계산은 오른쪽으로 돌려서 계산 후 다시 왼쪽
      const moveDistance = this.calculMoveDistance(rotatedOrigin[row], row);
      moveDistance.forEach((distance, col) => {
        this.moveTileInfo[this.BOARD_SIZE - 1 - col][row].y = distance;
      });

      const tmp: number[] = [];
      for (let col = this.BOARD_SIZE - 1; col >= 0; col--) {
        if (this.origin[col][row] !== 0) {
          tmp.push(this.origin[col][row]);
        }
      }

      if (tmp.length === 1) {
        this.newBoard[this.BOARD_SIZE - 1][row] = tmp[0];
        continue;
      }

      this.combine(tmp);

      let idx = this.BOARD_SIZE - 1;
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === 0) {
          continue;
        }
        this.newBoard[idx][row] = tmp[i];
        idx--;
      }
    }

    return this;
  }
}