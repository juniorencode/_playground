const container = document.querySelector('.container');

const labels = [];

const generateLabels = elem => {
  // adjust the minimum value if it is less than zero
  const adjustedMin = Math.min(0, elem.minValue);
  const adjustedMax = Math.max(0, elem.maxValue);

  // calculate the range of values
  elem.range = adjustedMax - adjustedMin;

  // calculate the width of each interval
  elem.intervalWidth = calculateIntervalWidth(elem.range, elem.numLabels - 1);

  // round the range limits down and up
  elem.roundedMin =
    Math.floor(adjustedMin / elem.intervalWidth) * elem.intervalWidth;
  elem.roundedMax =
    Math.ceil(adjustedMax / elem.intervalWidth) * elem.intervalWidth;

  // generate the labels
  for (let i = elem.roundedMin; i <= elem.roundedMax; i += elem.intervalWidth) {
    elem.labels.push(Math.round(i)); // round to the nearest integer
  }
};

// calculate the nearest power of ten for the given number
const reduceToNearestPowerOfTen = number => {
  const log = Math.floor(Math.log10(number)); // calculate the logarithm base 10
  const powerOfTen = Math.pow(10, log); // calculate the power of ten

  return powerOfTen;
};

// function to calculate the interval width in multiples of a number
const calculateIntervalWidth = (range, numLabels) => {
  const intervalWidth = Math.ceil(range / numLabels);
  const multiple = reduceToNearestPowerOfTen(intervalWidth);
  let newIntervalWidth = intervalWidth;

  while (newIntervalWidth % multiple !== 0) {
    newIntervalWidth++;
  }

  return newIntervalWidth;
};

const print = () => {
  labels.map(elem => {
    const card = document.createElement('div');

    generateLabels(elem);

    card.classList.add('card');
    card.innerHTML = `
      <p><span>Minimum value:</span> ${elem.minValue} </p>
      <p><span>Maximun value:</span> ${elem.maxValue} </p>
      <p><span>Limit target count:</span> ${elem.numLabels}</p>
      <hr>
      <p><span>Range:</span> ${elem.range}</p>
      <p><span>Interval width:</span> ${elem.intervalWidth}</p>
      <p><span>Rounded Min:</span> ${elem.roundedMin}</p>
      <p><span>Rounded Max:</span> ${elem.roundedMax}</p>
      <hr>
      <p><span>Labels: (${elem.labels.length})</span></p>
      <pre>${`[${elem.labels.join(', ')}]`}</pre>
    `;

    container.append(card);
  });
};

const createCard = (minValue, maxValue, numLabels) => {
  labels.push({
    minValue,
    maxValue,
    numLabels,
    labels: []
  });
};

createCard(-89, -43, 5);
createCard(1, 1, 5);
createCard(1, 2, 5);
createCard(2, 3, 5);
createCard(2, 4, 5);
createCard(2, 5, 5);
createCard(2, 6, 5);
createCard(2, 7, 5);
createCard(2, 8, 5);
createCard(2, 9, 5);
createCard(1, 9, 10);
createCard(1, 9, 9);
createCard(-1, 1, 5);
createCard(-5, 5, 5);
createCard(-8, 6, 10);
createCard(-9, 9, 5);
createCard(-12, 12, 5);
createCard(16, 157, 5);
createCard(-44, 182, 11);
createCard(-44, 192, 11);
createCard(-1160, 7, 11);
createCard(-1200, 700, 11);
createCard(-6500, 34, 11);
createCard(-720, 835, 11);
createCard(-3100, 760, 11);

print();
