const inputFile = document.querySelector('#upload-file');
const btnConvert = document.querySelector('#convert-to-json');
const codeContainer = document.querySelector('#result-json-data');
let uploadedFile;
let fileData = [{}];

inputFile.addEventListener('change', e => {
  uploadedFile = e.target.files[0];
});

btnConvert.addEventListener('click', () => {
  XLSX.utils.json_to_sheet(fileData, 'output.xlsx');
  if (uploadedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(uploadedFile);
    fileReader.onload = event => {
      let fileData = event.target.result;
      let workbook = XLSX.read(fileData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        let rowData = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        codeContainer.innerHTML = JSON.stringify(rowData, undefined, 4);
      });
    };
  }
});
