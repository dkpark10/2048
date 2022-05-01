import Game2048 from './components/game';
import { makeTile } from './module/tile_handler';

export default function App(): JSX.Element {
  const init = Array.from(Array(4), () => Array(4).fill(0));
  makeTile(init, 2);

  return (
    <Game2048 initBoard={init} />
  )
}
