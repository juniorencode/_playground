import { useCookie } from './hooks/useCookie.hook';

function App() {
  const [value, update, remove] = useCookie('name', 'John');

  const handleUpdateWithExpiry = () => {
    // Update cookie with a 7-day expiry
    update('Sally with expiry', { expires: 7 });
  };

  const handleUpdateWithPath = () => {
    // Update cookie with a specific path
    update('Sally with path', { path: '/subdir' });
  };

  const handleReset = () => {
    // Reset cookie to default value
    update('John');
  };

  return (
    <>
      <div>
        <strong>Current Cookie Value:</strong> {value || 'No Cookie Set'}
      </div>
      <button onClick={() => update('Sally')}>Change Name To Sally</button>
      <button onClick={handleUpdateWithExpiry}>
        Change Name To Sally (7 days expiry)
      </button>
      <button onClick={handleUpdateWithPath}>
        Change Name To Sally (specific path)
      </button>
      <button onClick={remove}>Delete Name</button>
      <button onClick={handleReset}>Reset To Default</button>
    </>
  );
}

export default App;
