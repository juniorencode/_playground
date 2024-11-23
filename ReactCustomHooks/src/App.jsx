import { useOnlineStatus } from './hooks/useOnlineStatus.hook';

function App() {
  const online = useOnlineStatus();

  return <div>{online.toString()}</div>;
}

export default App;
