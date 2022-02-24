import Game2048 from './components/game';
import { makeTile } from './module/tile_handler';

const gameOverBoard = [
  [2, 4, 8, 16],
  [4, 8, 256, 1024],
  [32, 4, 8, 512],
  [8, 32, 16, 0]
];

export default function App() {

  const init = Array.from(Array(4), () => Array(4).fill(0));
  makeTile(init, 2);

  return <Game2048 initBoard={gameOverBoard} />
}