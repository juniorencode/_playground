const inputData = document.querySelector('#input-data');
const btnExport = document.querySelector('#export-worksheet');
const btnExportPlus = document.querySelector('#export-worksheet-plus');

btnExport.addEventListener('click', e => {
  handleButton(e);
});

const handleButton = e => {
  e.preventDefault();
  const data = inputData.value;
  const jsonData = eval(data);
  exportWorksheet(jsonData);
};

const exportWorksheet = data => {
  const nameFile = 'download.xlsx';
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
  XLSX.writeFile(workbook, nameFile);
};
