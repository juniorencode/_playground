import { useEffect } from 'react';
import { usePagination } from './hooks/usePagination.hook';

function App() {
  const { pagination, isSmallScreen } = usePagination(10, 5, 640);

  useEffect(() => {
    console.log(pagination);
  }, [pagination]);

  return (
    <>
      <div>Mobile: {isSmallScreen.toString()}</div>
      <div>
        <ul>
          {pagination.map((elem, index) => (
            <li
              key={index}
              style={elem.active && { fontWeight: 'bolder', color: 'red' }}
            >
              {elem.type === 'page' ? elem.number : '...'}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
