const container = document.querySelector('.container');

const test = [];

const isCleanNumber = number => {
  return Math.abs(number) % 10 === 0;
};

const findCleanNumbers = (minValue, maxValue) => {
  const absMax = Math.max(Math.abs(minValue), Math.abs(maxValue));
  const ini = minValue < 0 ? -absMax : 0;
  const cleanNumbers = [];

  for (let i = ini; i <= absMax; i++) {
    if (isCleanNumber(i)) {
      cleanNumbers.push(i);
    }
  }

  return cleanNumbers;
};

const calculate = elem => {
  elem.absMinValue = Math.floor(elem.minValue / 10) * 10;
  elem.absMaxValue = (Math.floor(elem.maxValue / 10) + 1) * 10;
  elem.cleanNumbers = findCleanNumbers(elem.absMinValue, elem.absMaxValue);
};

const print = () => {
  test.map(elem => {
    const card = document.createElement('div');

    calculate(elem);

    card.classList.add('card');
    card.innerHTML = `
      <p><span>Minimum value:</span> ${elem.minValue} (${elem.absMinValue})</p>
      <p><span>Maximun value:</span> ${elem.maxValue} (${elem.absMaxValue})</p>
      <p><span>Max target count:</span> ${elem.count}</p>
      <p><span>Clean numbers: </span></p>
      <pre>${`[${elem.cleanNumbers.join(', ')}]`}</pre>
      <p><span>Y Axis: </span></p>
      <pre>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</pre>
    `;

    console.log(container);
    container.append(card);
  });
};

const createCard = (minValue, maxValue, count) => {
  test.push({
    minValue,
    maxValue,
    count,
    absMinValue: 0,
    absMaxValue: 0,
    cleanArray: []
  });
};

createCard(-44, 182, 10);
createCard(16, 157, 5);

print();
