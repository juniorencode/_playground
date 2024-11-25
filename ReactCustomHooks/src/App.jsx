import { useEffect } from 'react';
import { usePagination } from './hooks/usePagination.hook';

function App() {
  const { pagination, setPage, prevPage, nextPage, isSmallScreen } =
    usePagination(10, 5, 640);

  useEffect(() => {
    console.log(pagination);
  }, [pagination]);

  return (
    <>
      <div>Mobile: {isSmallScreen.toString()}</div>
      <button onClick={() => prevPage()}>Prev</button>
      <button onClick={() => setPage(2)}>2</button>
      <button onClick={() => nextPage()}>Next</button>
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
