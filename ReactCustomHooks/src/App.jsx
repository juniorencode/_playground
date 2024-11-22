import { useState } from 'react';
import { useEventListener } from './hooks/useEventListener.hook';

function App() {
  const [key, setKey] = useState('');
  useEventListener('keydown', e => {
    setKey(e.key);
  });

  return <div>Last Key: {key}</div>;
}

export default App;
