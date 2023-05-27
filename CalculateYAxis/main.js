const container = document.querySelector('.container');

const labels = [];

const generateLabels = elem => {
  // adjust the minimum value if it is less than zero
  const adjustedMin = Math.min(0, elem.minValue);

  // calculate the range of values
  elem.range = elem.maxValue - adjustedMin;

  // calculate the width of each interval
  elem.intervalWidth = Math.ceil(elem.range / (elem.numLabels - 1));

  // if there are no single-digit numbers in the range, adjust the interval width to multiples of 10
  if (!hasSingleDigit(elem.minValue, elem.maxValue)) {
    elem.intervalWidth = calculateIntervalWidth(
      elem.range,
      elem.numLabels - 1,
      10
    );
  }

  // round the range limits down and up
  elem.roundedMin =
    Math.floor(adjustedMin / elem.intervalWidth) * elem.intervalWidth;
  elem.roundedMax =
    Math.ceil(elem.maxValue / elem.intervalWidth) * elem.intervalWidth;

  // generate the labels
  for (let i = elem.roundedMin; i <= elem.roundedMax; i += elem.intervalWidth) {
    elem.labels.push(Math.round(i)); // round to the nearest integer
  }
};

// function to check if there are single-digit numbers in the range
const hasSingleDigit = (min, max) => {
  return Math.abs(min) < 10 || Math.abs(max) < 10;
};

// function to calculate the interval width in multiples of a number
const calculateIntervalWidth = (range, numLabels, multiple) => {
  let intervalWidth = Math.ceil(range / numLabels);
  while (intervalWidth % multiple !== 0) {
    intervalWidth++;
  }
  return intervalWidth;
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
createCard(-8, 6, 10);
createCard(-9, 9, 5);
createCard(-5, 5, 5);
createCard(16, 157, 5);
createCard(-1200, 700, 12);
createCard(-44, 182, 11);
createCard(-44, 192, 11);

print();
