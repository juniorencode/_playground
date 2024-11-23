import { useToggle } from './hooks/useToggle.hook';
import { useRenderCount } from './hooks/useRenderCount.hook';

function App() {
  const [boolean, toggle] = useToggle(false);
  const renderCount = useRenderCount();

  return (
    <>
      <div>{boolean.toString()}</div>
      <div>{renderCount}</div>
      <button onClick={toggle}>Toggle</button>
    </>
  );
}

export default App;
