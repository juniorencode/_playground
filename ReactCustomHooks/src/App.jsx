import { useOverlay } from './hooks/useOverlay.hook';

function App() {
  const {
    register: { domRef, isVisible },
    showOverlay
  } = useOverlay();

  return (
    <>
      <button onClick={showOverlay}>Open Modal</button>
      <div ref={domRef} style={!isVisible ? { display: 'none' } : {}}>
        <h1>Hello World!</h1>
      </div>
    </>
  );
}

export default App;
