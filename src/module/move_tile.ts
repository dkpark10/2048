import { moveTile } from "./tile_handler";

export interface MoveTileInfo {
  x: number;
  y: number;
}

export interface ITileResult {
  board: number[][];
  score: number;
  moveInfo: MoveTileInfo[][];
}

export default abstract class TileHandler {

  protected readonly BOARD_SIZE: number = 4 as const;
  protected readonly origin: number[][] = [];
  protected newBoard: number[][] = [];
  protected score: number = 0;
  protected moveTileInfo: MoveTileInfo[][] = [];
  protected direction: number;

  constructor(origin: number[][], d: number) {
    this.origin = origin;
    this.direction = d;
    this.newBoard = Array.from({ length: 4 }, (v, i) => new Array(4).fill(0));
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
      score: this.score,
      moveInfo: this.moveTileInfo
    };
  }

  public rotate270(arr: number[][]) {
    const ret = Array.from(Array(4), () => new Array(4));
    const n = arr.length;
    const m = arr[0].length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        ret[i][j] = arr[j][n - 1 - i];
      }
    }
    return ret;
  }

  public rotate90(arr: number[][]) {
    const ret = Array.from(Array(4), () => new Array(4));
    const n = arr.length;
    const m = arr[0].length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        ret[i][j] = arr[n - 1 - j][i];
      }
    }
    return ret;
  }

  public turnSide(arr: number[][]) {
    const ret = Array.from(Array(4), () => new Array(4));
    const n = arr.length;
    const m = arr[0].length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        ret[i][j] = arr[i][n - 1 - j];
      }
    }
    return ret;
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

  public calculMoveDistance(list: number[], row: number): number[] {
    // 임시로 담을 변수
    const tmp = [];
    // 움직일 거리를 담는 객체
    const moveList: { [key: string]: number } = {};
    let distance = 0;

    for (let col = 0; col < 4; col++) {

      // y, x 인덱스 키값
      const key = row * 4 + col;
      if (list[col] !== 0) {
        tmp.push({ key, value: list[col] });
        moveList[key] = distance;
      } else {
        moveList[key] = 0;
        distance++;
      }
    }

    for (let i = 0; i < tmp.length - 1; i++) {

      if (tmp[i].value !== tmp[i + 1].value) {
        continue;
      }
      // 같은 값이면 합침
      tmp[i].value *= 2;
      tmp[i + 1].value = 0;

      // 합친 부분에서 움직인 인덱스 값의 거리를 증감
      moveList[tmp[i + 1].key] += 1;

      // 합쳤으면 그 다음 값들의 모든 거리를 1 증감 시켜줘야 함
      const next = i + 2;
      if (tmp.length <= next) {
        continue;
      }

      for (let j = tmp[next].key; j < (row * 4 + 4); j++) {
        if (list[j] !== 0) {
          moveList[j] += 1;
        }
      }
    }
    return Object.values(moveList);
  }

  abstract move(): this;
}