import { useMediaQuery } from './hooks/useMediaQuery.hook';

function App() {
  const isLarge = useMediaQuery('(min-width: 200px)');

  return <div>Large: {isLarge.toString()}</div>;
}

export default App;
