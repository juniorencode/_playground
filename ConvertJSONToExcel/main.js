const inputData = document.querySelector('#input-data');
const btnExport = document.querySelector('#export-worksheet');
const btnExportPlus = document.querySelector('#export-worksheet-plus');

btnExport.addEventListener('click', e => {
  const data = handleButton(e);
  exportWorksheet(data);
});

btnExportPlus.addEventListener('click', e => {
  const data = handleButton(e);
  exportWorksheetPlus(data);
});

const handleButton = e => {
  e.preventDefault();
  const data = inputData.value;
  return eval(data);
};

const exportWorksheet = data => {
  const nameFile = 'download.xlsx';
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
  XLSX.writeFile(workbook, nameFile);
};

const exportWorksheetPlus = data => {
  const nameFile = 'download.xlsx';
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [['column 01', 'column 02'], ['column 01']],
    {
      origin: 4
    }
  );
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
  XLSX.writeFile(workbook, nameFile);
};
