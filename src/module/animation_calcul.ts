export interface AnimationTile {
  y: number;
  x: number;
  value: number;
  isDelete: boolean;
}

interface Params {
  prev: number[][],
  next: number[][]
}

// const calculMoveDistance = (list: number[], row: number): AnimationTile[] => {
//   // 임시로 담을 변수
//   const tmp = [];
//   // 움직일 거리를 담는 객체
//   const moveList: { [key: string]: AnimationTile } = {};
//   let distance = 0;

//   for (let col = 0; col < 4; col++) {

//     // y, x 인덱스 키값
//     const key = row * 4 + col;
//     moveList[key] = {
//       value: this.origin[row][col],
//       distance: 0,
//       isOldTile: false,
//       isNewTile: false
//     }

//     if (list[col] !== 0) {
//       tmp.push({ key, value: list[col] });
//       moveList[key].distance = distance;

//       // 움직여야 하는 타일이라면 
//       if (distance > 0) {
//         moveList[key].isOldTile = true;
//       }

//     } else {
//       moveList[key].distance = 0;
//       distance++;
//     }
//   }

//   for (let i = 0; i < tmp.length - 1; i++) {

//     if (tmp[i].value !== tmp[i + 1].value) {
//       continue;
//     }

//     tmp[i].value *= 2;
//     tmp[i + 1].value = 0;

//     // 합친 부분에서 움직인 인덱스 값의 거리를 증감
//     moveList[tmp[i + 1].key].distance += 1;
//     moveList[tmp[i].key].value = tmp[i].value;
//     moveList[tmp[i + 1].key].value = 0;

//     moveList[tmp[i + 1].key].isOldTile = true;
//     moveList[tmp[i].key].isNewTile = true;

//     // 합쳤으면 그 다음 값들의 모든 거리를 1 증감 시켜줘야 함
//     const next = i + 2;
//     if (tmp.length <= next) {
//       continue;
//     }

//     for (let j = tmp[next].key; j < (row * 4 + 4); j++) {
//       if (list[j] !== 0) {
//         moveList[j].distance += 1;
//         moveList[j].isOldTile = true;
//       }
//     }
//   }

//   return Object.values(moveList);
// }



export const distanceCalculator = ({ prev, next }: Params, dir: string) => {
  switch (dir) {
    case 'ArrowRight':
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'ArrowDown':
  }
}