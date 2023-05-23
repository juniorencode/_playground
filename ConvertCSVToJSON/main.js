const inputFile = document.querySelector('#upload-file');
const btnConvert = document.querySelector('#convert-to-json');
const codeContainer = document.querySelector('#result-json-data');
let uploadedFile;
let fileData = [];

inputFile.addEventListener('change', e => {
  uploadedFile = e.target.files[0];
});

btnConvert.addEventListener('click', () => {
  XLSX.utils.json_to_sheet(fileData, 'output.xlsx');
  if (uploadedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(uploadedFile);
    fileReader.onload = e => {
      const fileData = e.target.result;
      const json = CSVToJSON(fileData);
      codeContainer.innerHTML = json;
    };
  }
});

const CSVToJSON = csvData => {
  const data = CSVToArray(csvData);
  const objData = [];

  for (var i = 1; i < data.length; i++) {
    objData[i - 1] = {};
    for (var k = 0; k < data[0].length && k < data[i].length; k++) {
      var key = data[0][k];
      objData[i - 1][key] = data[i][k];
    }
  }

  return JSON.stringify(objData, undefined, 4);
};

const CSVToArray = (csvData, delimiter) => {
  delimiter = delimiter || ',';
  const pattern = new RegExp(
    '(\\' +
      delimiter +
      '|\\r?\\n|\\r|^)' +
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      '([^"\\' +
      delimiter +
      '\\r\\n]*))',
    'gi'
  );
  const data = [[]];
  let matches = null;

  while ((matches = pattern.exec(csvData))) {
    let matchedDelimiter = matches[1];
    if (matchedDelimiter.length && matchedDelimiter != delimiter) {
      data.push([]);
    }
    if (matches[2]) {
      matchedDelimiter = matches[2].replace(new RegExp('""', 'g'), '"');
    } else {
      matchedDelimiter = matches[3];
    }
    data[data.length - 1].push(matchedDelimiter);
  }

  return data;
};
