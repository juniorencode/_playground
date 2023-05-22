const container = document.querySelector('.container');

const test = [];

const isCleanNumber = number => {
  return Math.abs(number) % 10 === 0;
};

const findCleanNumbers = elem => {
  const ini = elem.minValue < 0 ? -elem.absMax : 0;
  const cleanNumbers = [];

  for (let i = ini; i <= elem.absMax; i++) {
    if (isCleanNumber(i)) {
      cleanNumbers.push(i);
    }
  }

  return cleanNumbers;
};

const reduceToNearestPowerOfTen = number => {
  const log = Math.floor(Math.log10(number));
  const powerOfTen = Math.pow(10, log);
  const reduced = Math.ceil(number / powerOfTen) * powerOfTen;

  return reduced;
};

const calculate = elem => {
  elem.step = 10;
  elem.absMinValue = Math.floor(elem.minValue / elem.step) * elem.step;
  elem.absMaxValue = Math.ceil(elem.maxValue / elem.step) * elem.step;
  elem.absMax = Math.max(
    Math.abs(elem.absMinValue),
    Math.abs(elem.absMaxValue)
  );
  elem.absMax =
    elem.absMax % (elem.step * 2) !== 0 ? elem.absMax + elem.step : elem.absMax;
  elem.cleanNumbers = findCleanNumbers(elem);
  elem.result = elem.cleanNumbers.filter(
    n => n >= elem.absMinValue - elem.step && n <= elem.absMaxValue + elem.step
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

createCard(-1200, 700, 11);
createCard(-44, 182, 11);
createCard(-44, 192, 11);
createCard(16, 157, 5);

print();
