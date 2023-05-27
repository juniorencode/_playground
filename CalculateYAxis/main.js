const container = document.querySelector('.container');

const test = [];

const isCleanNumber = number => {
  return Math.abs(number) % 10 === 0;
};

const findCleanNumbers = (elem, low = false) => {
  const ini = elem.minValue < 0 ? -elem.absMax : 0;
  const cleanNumbers = [];

  for (let i = ini; i <= elem.absMax; i++) {
    if (isCleanNumber(i) || low) {
      cleanNumbers.push(i);
    }
  }

  return cleanNumbers;
};

const calculate = elem => {
  if (Math.max(Math.abs(elem.minValue), Math.abs(elem.maxValue)) >= 10) {
    elem.step = 10;
    elem.absMinValue = Math.floor(elem.minValue / elem.step) * elem.step;
    elem.absMaxValue = Math.ceil(elem.maxValue / elem.step) * elem.step;
    elem.absMax = Math.max(
      Math.abs(elem.absMinValue),
      Math.abs(elem.absMaxValue)
    );
    elem.absMax =
      elem.absMax % (elem.step * 2) !== 0
        ? elem.absMax + elem.step
        : elem.absMax;
    elem.cleanNumbers = findCleanNumbers(elem);
    elem.result = elem.cleanNumbers.filter(
      n =>
        n >= elem.absMinValue - elem.step && n <= elem.absMaxValue + elem.step
    );

    while (elem.cleanNumbers.length > elem.limit) {
      elem.step *= 2;
      const tempCleanNumbers = [];

      for (let i = 0; i < elem.cleanNumbers.length; i++) {
        if (i % 2 === 0 || Math.abs(elem.cleanNumbers[i]) === 0) {
          tempCleanNumbers.push(elem.cleanNumbers[i]);
        }
      }

      elem.cleanNumbers = tempCleanNumbers;
      elem.result = elem.cleanNumbers.filter(
        n =>
          n >= elem.absMinValue - elem.step && n <= elem.absMaxValue + elem.step
      );
    }
  } else {
    elem.step = 0;
    elem.absMinValue = Math.floor(elem.minValue);
    elem.absMaxValue = Math.ceil(elem.maxValue);
    elem.absMax = Math.max(
      Math.abs(elem.absMinValue),
      Math.abs(elem.absMaxValue)
    );
    elem.absMax += elem.absMax % 2 !== 0 ? 1 : 0;
    elem.cleanNumbers = findCleanNumbers(elem, true);
    elem.result = elem.cleanNumbers.filter(n => {
      if (elem.absMinValue > 0) return n - elem.step <= elem.absMaxValue;

      return (
        n - elem.step >= elem.absMinValue && n - elem.step <= elem.absMaxValue
      );
    });

    while (elem.cleanNumbers.length > elem.limit) {
      const tempCleanNumbers = [];

      for (let i = 0; i < elem.cleanNumbers.length; i++) {
        if (i % 2 === 0 || Math.abs(elem.cleanNumbers[i]) === 0) {
          tempCleanNumbers.push(elem.cleanNumbers[i]);
        }
      }

      elem.step += 1;
      elem.cleanNumbers = tempCleanNumbers;
      elem.result = elem.cleanNumbers.filter(n => {
        if (elem.absMinValue > 0) return n - elem.step <= elem.absMaxValue;

        return (
          n - elem.step >= elem.absMinValue && n - elem.step <= elem.absMaxValue
        );
      });
    }
  }
};

const print = () => {
  test.map(elem => {
    const card = document.createElement('div');

    calculate(elem);

    card.classList.add('card');
    card.innerHTML = `
      <p><span>Step:</span> ${elem.step}</p>
      <p><span>Minimum value:</span> ${elem.minValue} (${elem.absMinValue})</p>
      <p><span>Maximun value:</span> ${elem.maxValue} (${elem.absMaxValue})</p>
      <p><span>Maximun absolute value:</span> ${elem.absMax}</p>
      <p><span>Limit target count:</span> ${elem.limit}</p>
      <p><span>Clean numbers: (${elem.cleanNumbers.length})</span></p>
      <pre>${`[${elem.cleanNumbers.join(', ')}]`}</pre>
      <p><span>Y Axis: (${elem.result.length})</span></p>
      <pre>${`[${elem.result.join(', ')}]`}</pre>
    `;

    container.append(card);
  });
};

const createCard = (minValue, maxValue, limit) => {
  test.push({
    minValue,
    maxValue,
    limit,
    absMinValue: 0,
    absMaxValue: 0,
    cleanArray: [],
    result: []
  });
};

createCard(-9, 9, 5);
createCard(-1, 1, 5);
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
createCard(1, 9, 5);
createCard(-8, 6, 10);
createCard(-5, 5, 5);
createCard(16, 157, 5);
createCard(-1200, 700, 11);
createCard(-44, 182, 11);
createCard(-44, 192, 11);

print();

// ================================================================

function generateLabels(min, max, numLabels) {
  // adjust the minimum value if it is less than zero
  var adjustedMin = Math.min(0, min);

  // calculate the range of values
  var range = max - adjustedMin;

  // calculate the width of each interval
  var intervalWidth = Math.ceil(range / (numLabels - 1));

  // if there are no single-digit numbers in the range, adjust the interval width to multiples of 10
  if (!hasSingleDigit(min, max)) {
    intervalWidth = calculateIntervalWidth(range, numLabels, 10);
  }

  // round the range limits down and up
  var roundedMin = Math.floor(adjustedMin / intervalWidth) * intervalWidth;
  var roundedMax = Math.ceil(max / intervalWidth) * intervalWidth;

  // generate the labels
  var labels = [];
  for (var i = roundedMin; i <= roundedMax; i += intervalWidth) {
    labels.push(Math.round(i)); // round to the nearest integer
  }

  return labels;
}

// function to check if there are single-digit numbers in the range
function hasSingleDigit(min, max) {
  return Math.abs(min) < 10 || Math.abs(max) < 10;
}

// function to calculate the interval width in multiples of a number
function calculateIntervalWidth(range, numLabels, multiple) {
  var intervalWidth = Math.ceil(range / numLabels);
  while (intervalWidth % multiple !== 0) {
    intervalWidth++;
  }
  return intervalWidth;
}

console.log(generateLabels(-10, 10, 5));
console.log('==================');
console.log(-9, 9, 5, generateLabels(-9, 9, 5));
console.log(-1, 1, 5, generateLabels(-1, 1, 5));
console.log(1, 1, 5, generateLabels(1, 1, 5));
console.log(1, 2, 5, generateLabels(1, 2, 5));
console.log(2, 3, 5, generateLabels(2, 3, 5));
console.log(2, 4, 5, generateLabels(2, 4, 5));
console.log(2, 5, 5, generateLabels(2, 5, 5));
console.log(2, 8, 5, generateLabels(2, 8, 5));
console.log(-7, 6, 10, generateLabels(-7, 6, 10));
console.log(16, 157, 5, generateLabels(16, 157, 5));
console.log(-1200, 700, 11, generateLabels(-1200, 700, 11));
console.log(-44, 188, 11, generateLabels(-44, 188, 11));
console.log(-44, 192, 11, generateLabels(-44, 192, 11));
console.log('==================');
console.log(-9, 9, 5, generateLabels(-9, 9, 5));
console.log(-1, 1, 5, generateLabels(-1, 1, 5));
console.log(1, 1, 5, generateLabels(1, 1, 5));
console.log(1, 2, 5, generateLabels(1, 2, 5));
console.log(2, 3, 5, generateLabels(2, 3, 5));
console.log(2, 4, 5, generateLabels(2, 4, 5));
console.log(2, 5, 5, generateLabels(2, 5, 5));
console.log(2, 6, 5, generateLabels(2, 6, 5));
console.log(2, 7, 5, generateLabels(2, 7, 5));
console.log(2, 8, 5, generateLabels(2, 8, 5));
console.log(2, 9, 5, generateLabels(2, 9, 5));
console.log(1, 9, 10, generateLabels(1, 9, 10));
console.log(1, 9, 5, generateLabels(1, 9, 5));
console.log(-8, 6, 10, generateLabels(-8, 6, 10));
console.log(-5, 5, 5, generateLabels(-5, 5, 5));
console.log(16, 157, 5, generateLabels(16, 157, 5));
console.log(-1200, 700, 11, generateLabels(-1200, 700, 11));
console.log(-44, 182, 11, generateLabels(-44, 182, 11));
console.log(-44, 192, 11, generateLabels(-44, 192, 11));
