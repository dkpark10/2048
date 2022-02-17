export interface ITileResult{
  board: number[][];
  score: number;
}

export default abstract class TileHandler {

  protected origin: number[][] = [];
  protected newBoard: number[][];
  protected score: number = 0;

  constructor(origin: number[][]) {
    this.origin = origin;
    this.newBoard = Array.from({ length: 4 }, (v, i) => new Array(4).fill(0));
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