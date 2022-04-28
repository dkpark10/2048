export interface MoveTileInfo {
  x: number;
  y: number;
}

export interface ITileResult {
  board: number[][];
  score: number;
  moveInfo?: MoveTileInfo[][];
}

export default abstract class TileHandler {

  protected origin: number[][] = [];
  protected newBoard: number[][] = [];
  protected score: number = 0;
  protected moveTileInfo: MoveTileInfo[][] = [];
  protected direction: number;

  constructor(origin: number[][], d: number) {
    this.origin = origin;
    this.direction = d;
    this.newBoard = Array.from({ length: 4 }, (v, i) => new Array(4).fill(0));
    this.moveTileInfo = Array.from({ length: 4 }, (v, i) => new Array(4).fill(0));

    this.moveTileInfo = Array.from({ length: 4 }, () => Array)
      .map(() => Array.from({ length: 4 },
        () => ({
          x: 0,
          y: 0
        })))
  }

  public getResult(): ITileResult {
    return {
      board: this.newBoard,
      score: this.score
    };
  }

  public combine(list: number[]) {

    let idx = 0;
    while (idx < list.length - 1) {
      if (list[idx] === list[idx + 1]) {
        this.score += list[idx + 1] * 2;
        list[idx + 1] *= 2;
        list[idx] = 0;
        idx += 2;
      } else {
        idx++;
      }
    }
  }

  abstract move(): this;
}