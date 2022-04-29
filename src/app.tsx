import Game2048 from './components/game';
import { makeTile } from './module/tile_handler';

export default function App(): JSX.Element {
  const init = Array.from(Array(4), () => Array(4).fill(0));
  makeTile(init, 2);
  const initMoveDistance = Array.from({ length: 4 }, () => Array)
    .map(() => Array.from({ length: 4 },
      () => ({
        x: 0,
        y: 0
      })))

  return (
    <Game2048 initBoard={init}
      initDistance={initMoveDistance}
    />
  )
}
