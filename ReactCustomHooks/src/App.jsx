import { useRef } from 'react';
import { useClickOutside } from './hooks/useClickOutside.hook';

function App() {
  const { register } = useClickOutside(() => {
    console.log('Clicked outside of all referenced elements');
  });

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  return (
    <div>
      <div
        ref={node => register((ref1.current = node))}
        style={{ padding: '10px', backgroundColor: 'lightblue' }}
      >
        Box 1 (Click inside me)
      </div>
      <div
        ref={node => register((ref2.current = node))}
        style={{
          padding: '10px',
          backgroundColor: 'lightgreen',
          marginTop: '10px'
        }}
      >
        Box 2 (Click inside me)
      </div>
      <div style={{ padding: '10px', marginTop: '10px' }}>
        Outside (Click here to trigger the callback)
      </div>
    </div>
  );
}

export default App;
