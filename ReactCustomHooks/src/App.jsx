import { useRef } from 'react';
import { useOnScreen } from './hooks/useOnScreen.hook';

function App() {
  const headerTwoRef = useRef(null);
  const visible = useOnScreen(headerTwoRef, '-100px');

  return (
    <div>
      <h1>Header</h1>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <h1 ref={headerTwoRef}>Header 2 {visible && '(Visible)'}</h1>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
    </div>
  );
}

export default App;
