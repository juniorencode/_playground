import { useState, useEffect } from 'react';

function App() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (percent < 100) {
      const timer = setTimeout(() => {
        setPercent(prevProgress => prevProgress + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [percent]);

  return (
    <div className="w-full h-screen caret-transparent bg-zinc-800 flex flex-col justify-center items-center">
      <div className="relative w-56 h-56 flex justify-center items-center overflow-hidden rounded-full">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`absolute -top-full -left-full w-[150%] h-[150%] ${
              percent > (i * 100) / 12 ? 'bg-emerald-400' : 'bg-white'
            } origin-[100%_100%]`}
            style={{
              clipPath: 'polygon(100% 100%, 50% 75%, 50% 100%)',
              transform: `rotate(${i * 30 + 90}deg)`
            }}
          ></div>
        ))}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-zinc-800 text-2xl ${
            percent >= 100 ? 'text-emerald-400' : 'text-white'
          } text-center leading-[12rem] rounded-full`}
        >
          <span className="animate-pulse">
            {percent >= 100 ? 'COMPLETE' : 'LOADING..'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
