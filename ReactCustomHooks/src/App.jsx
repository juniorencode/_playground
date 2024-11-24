import { useWindowSize } from './hooks/useWindowSize.hook';

function App() {
  const { width, height } = useWindowSize();

  return (
    <div>
      {width} x {height}
    </div>
  );
}

export default App;
