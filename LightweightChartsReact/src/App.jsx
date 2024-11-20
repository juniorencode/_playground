import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const targetLimit = 7;
  const [data, setData] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [adjustedMin, setAdjustedMin] = useState(0);
  const [adjustedMax, setAdjustedMax] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetching = await axios('/data.json');
      const response = sortByValue(fetching.data);
      const _minValue = calculateMinValue(response);
      const _maxValue = calculateMaxValue(response);
      const _adjustedMin = calculateAdjustMin(_minValue);
      const _adjustedMax = calculateAdjustMax(_maxValue);
      setData(response);
      setMinValue(_minValue);
      setMaxValue(_maxValue);
      setAdjustedMin(_adjustedMin);
      setAdjustedMax(_adjustedMax);
    };

    fetchData();
  }, []);

  const sortByValue = array => {
    return array.sort((a, b) => a.value - b.value);
  };

  const calculateMinValue = array => {
    return Math.floor(Math.min(...array.map(item => item.value)));
  };

  const calculateMaxValue = array => {
    return Math.ceil(Math.max(...array.map(item => item.value)));
  };

  const calculateAdjustMin = value => {
    return Math.min(0, value);
  };

  const calculateAdjustMax = value => {
    return Math.max(0, value);
  };

  return (
    <div className="bg-neutral-800 text-white p-4 w-[100vw] h-[100vh]">
      <div className="flex flex-col gap-2 my-4">
        <p className="font-semibold tracking-wider">
          Number of data:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            {data.length}
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Target limit:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            {targetLimit}
          </span>
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-2 my-4">
        <p className="font-semibold tracking-wider">
          Min value:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            {minValue}
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Max value:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            {maxValue}
          </span>
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-2 my-4">
        <p className="font-semibold tracking-wider">
          Adjust Min value:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            {adjustedMin}
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Adjust Max value:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            {adjustedMax}
          </span>
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-2 my-4">
        <p className="font-semibold tracking-wider">
          Range:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Interval width:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-2 my-4">
        <p className="font-semibold tracking-wider">
          Rounded Min:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Rounded Max:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-2 my-4">
        <p className="font-semibold tracking-wider">
          Labels:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
      </div>
      <ul className="w-48 border-x border-t border-neutral-700">
        <li className="p-2 text-right border-b border-neutral-700">100</li>
        <li className="p-2 text-right border-b border-neutral-700">80</li>
        <li className="p-2 text-right border-b border-neutral-700">60</li>
        <li className="p-2 text-right border-b border-neutral-700">40</li>
        <li className="p-2 text-right border-b border-neutral-700">20</li>
        <li className="p-2 text-right border-b border-neutral-700">0</li>
      </ul>
    </div>
  );
}

export default App;
