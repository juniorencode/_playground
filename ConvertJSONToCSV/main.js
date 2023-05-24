const inputData = document.querySelector('#input-data');
const btnExport = document.querySelector('#export-csv');

btnExport.addEventListener('click', e => {
  const data = handleButton(e);
  exportCSV(data);
});

const handleButton = e => {
  e.preventDefault();
  const data = inputData.value;
  return convertOBJToJSON(eval(data));
};

const convertOBJToJSON = obj => {
  const headers = Object.keys(obj[0]).toString();
  const main = obj.map(item => {
    return Object.values(item).toString();
  });

  return [headers, ...main].join('\n');
};

const exportCSV = data => {
  const blob = new Blob([data], { type: 'application/csv' });
  const nameFile = 'download.csv';

  const download = document.createElement('a');
  download.href = URL.createObjectURL(blob);
  download.download = nameFile;

  download.click();
};
