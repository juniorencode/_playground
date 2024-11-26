import { useEffect } from 'react';
import { usePagination } from './hooks/usePagination.hook';

function App() {
  const { pagination, currentPage, setPage, goToPreviousPage, goToNextPage } =
    usePagination(10, 1, 640);

  useEffect(() => {
    console.log(pagination);
  }, [pagination]);

  return (
    <>
      <button onClick={() => goToPreviousPage()}>Prev</button>
      <button onClick={() => goToNextPage()}>Next</button>
      <div>
        <ul>
          {pagination.map((elem, index) => (
            <li key={index}>
              {elem > 0 ? (
                <button
                  style={
                    elem === currentPage
                      ? { backgroundColor: '#424242', color: '#fff' }
                      : {}
                  }
                  onClick={() => setPage(elem)}
                >
                  {elem}
                </button>
              ) : (
                '...'
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
