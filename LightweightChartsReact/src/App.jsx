import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCanvas } from './hooks/useCanvas.hook';

function App() {
  const targetLimit = 5;

  const [data, setData] = useState([]);

  const [minValueY, setMinValueY] = useState(0);
  const [maxValueY, setMaxValueY] = useState(0);
  const [adjustedMinY, setAdjustedMinY] = useState(0);
  const [adjustedMaxY, setAdjustedMaxY] = useState(0);
  const [rangeY, setRangeY] = useState(0);
  const [intervalY, setIntervalY] = useState(0);
  const [roundedMinY, setRoundedMinY] = useState(0);
  const [roundedMaxY, setRoundedMaxY] = useState(0);
  const [labelsY, setLabelsY] = useState([]);

  const [minDateX, setMinDateX] = useState(0);
  const [maxDateX, setMaxDateX] = useState(0);

  const [canvasRef, draw] = useCanvas();

  useEffect(() => {
    const fetchData = async () => {
      const fetching = await axios('/data.json');

      const response = fetching.data;
      const y_minValue = calculateMinValue(response);
      const y_maxValue = calculateMaxValue(response);
      const y_adjustedMin = calculateAdjustMin(y_minValue);
      const y_adjustedMax = calculateAdjustMax(y_maxValue);
      const y_range = calculateRange(y_adjustedMin, y_adjustedMax);
      const y_interval = calculateInterval(y_range, targetLimit);
      const y_roundedMin = calculateRoundMin(y_adjustedMin, y_interval);
      const y_roundedMax = calculateRoundMax(y_adjustedMax, y_interval);
      const y_labels = calculateLabels(y_roundedMin, y_roundedMax, y_interval);

      const x_minDate = calculateMinDate(response);
      const x_maxDate = calculateMaxDate(response);

      setData(response);

      setMinValueY(y_minValue);
      setMaxValueY(y_maxValue);
      setAdjustedMinY(y_adjustedMin);
      setAdjustedMaxY(y_adjustedMax);
      setRangeY(y_range);
      setIntervalY(y_interval);
      setRoundedMinY(y_roundedMin);
      setRoundedMaxY(y_roundedMax);
      setLabelsY(y_labels);

      setMinDateX(x_minDate);
      setMaxDateX(x_maxDate);

      draw(ctx => {
        const fontSize = 12; // Ajusta según la estética
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        const x = 52;
        const topMargin = 20;
        const bottomMargin = 10;
        const availableHeight = 272 - topMargin - bottomMargin;
        const step = availableHeight / (y_labels.length - 1);

        y_labels.forEach((num, index) => {
          const y = topMargin + index * step;
          ctx.fillText(num.toFixed(2), x, y);
        });
      });
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // axis y
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

  const calculateRange = (min, max) => {
    return max - min;
  };

  const reduceToNearestPowerOfTen = number => {
    const log = Math.floor(Math.log10(number));
    return Math.pow(10, log);
  };

  const calculateInterval = (range, numLabels) => {
    const interval = Math.ceil(range / numLabels);
    const multiple = reduceToNearestPowerOfTen(interval);
    const remainder = interval % multiple;

    return remainder === 0 ? interval : interval + (multiple - remainder);
  };

  const calculateRoundMin = (value, interval) => {
    return Math.floor(value / interval) * interval;
  };

  const calculateRoundMax = (value, interval) => {
    return Math.ceil(value / interval) * interval;
  };

  const calculateLabels = (min, max, interval) => {
    const y_labels = [];
    for (let i = min; i <= max; i += interval) {
      y_labels.unshift(Math.round(i));
    }
    return y_labels;
  };

  // axis x
  const calculateMinDate = array => {
    return new Date(
      Math.min(...array.map(item => new Date(item.time).getTime()))
    );
  };

  const calculateMaxDate = array => {
    return new Date(
      Math.max(...array.map(item => new Date(item.time).getTime()))
    );
  };

  function calculateYearsSimple(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.abs(d2.getFullYear() - d1.getFullYear());
  }

  return (
    <div className="bg-neutral-800 text-white p-4 w-[100vw] min-h-[100vh]">
      <div className="grid grid-cols-2 gap-4">
        <div>
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
                {minValueY}
              </span>
            </p>
            <p className="font-semibold tracking-wider">
              Max value:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {maxValueY}
              </span>
            </p>
          </div>
          <hr />
          <div className="flex flex-col gap-2 my-4">
            <p className="font-semibold tracking-wider">
              Adjust Min value:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {adjustedMinY}
              </span>
            </p>
            <p className="font-semibold tracking-wider">
              Adjust Max value:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {adjustedMaxY}
              </span>
            </p>
          </div>
          <hr />
          <div className="flex flex-col gap-2 my-4">
            <p className="font-semibold tracking-wider">
              Range:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {rangeY}
              </span>
            </p>
            <p className="font-semibold tracking-wider">
              Interval:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {intervalY}
              </span>
            </p>
          </div>
          <hr />
          <div className="flex flex-col gap-2 my-4">
            <p className="font-semibold tracking-wider">
              Rounded Min:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {roundedMinY}
              </span>
            </p>
            <p className="font-semibold tracking-wider">
              Rounded Max:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {roundedMaxY}
              </span>
            </p>
          </div>
          <hr />
          <div className="flex flex-col gap-2 my-4">
            <p className="font-semibold tracking-wider">
              Labels:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {labelsY.length}
              </span>
            </p>
          </div>
        </div>
        <div>
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
              Min date:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {minDateX.toLocaleString()}
              </span>
            </p>
            <p className="font-semibold tracking-wider">
              Max date:
              <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
                {maxDateX.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="border border-neutral-700">
        <canvas ref={canvasRef} width={52} height={272}></canvas>
      </div>
    </div>
  );
}

export default App;
