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
