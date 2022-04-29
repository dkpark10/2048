import TileHandler from './move_tile';

export default class RightMoveTileHandler extends TileHandler {

  constructor(origin: number[][], d: number) {
    super(origin, d);
  }

  public move(): this {

    const turnedBoard = this.turnSide(this.origin);
    for (let row = 0; row < this.BOARD_SIZE; row++) {

      // 오른쪽 이동거리 계산은 옆으로 뒤집고 계산 나온 결과값을 다시 뒤집어야 한다.
      const moveDistance = this.calculMoveDistance(turnedBoard[row], row);
      moveDistance.reverse().forEach((distance, col) => {
        this.moveTileInfo[row][col].x = distance;
      });

      const tmp: number[] = [];
      for (let col = this.BOARD_SIZE - 1; col >= 0; col--) {
        if (this.origin[row][col] !== 0) {
          tmp.push(this.origin[row][col]);
        }
      }

      if (tmp.length === 1) {
        this.newBoard[row][this.BOARD_SIZE - 1] = tmp[0];
        continue;
      }

      this.combine(tmp);

      let idx = this.BOARD_SIZE - 1;
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