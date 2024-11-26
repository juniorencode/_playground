import { useFilter } from './hooks/useFilter.hook';

function App() {
  const { filter, setPage, setSearch } = useFilter({ page: { number: 5 } });

  return (
    <>
      <div>{JSON.stringify(filter)}</div>
      <div>
        <input
          type="text"
          placeholder="search..."
          value={filter.search || ''}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <button onClick={() => setPage(filter.page.number + 1)}>Next Page</button>
    </>
  );
}

export default App;
