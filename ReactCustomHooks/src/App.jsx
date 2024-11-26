import { useEffect, useState } from 'react';
import { useDeepCompareEffect } from './hooks/useDeepCompareEffect.hook';

function App() {
  const [user, setUser] = useState({
    name: 'John',
    age: 30,
    pet: { name: 'Rocco', age: 2 }
  });

  useEffect(() => {
    console.log('useEffect');
  }, [user]);

  useDeepCompareEffect(() => {
    console.log('useDeepCompareEffect');
  }, [user]);

  return (
    <div>
      <div>Name: {user.name}</div>
      <div>Age: {user.age}</div>
      <div>{JSON.stringify(user)}</div>
      <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
        Increment Age
      </button>
      <button
        onClick={() => setUser({ ...user, pet: { name: 'Rocco', age: 2 } })}
      >
        Same Pet
      </button>
    </div>
  );
}

export default App;
