import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcelSimple = (data, fileName = 'dados.xlsx') => {
  // Cria uma planilha a partir dos dados JSON
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Cria uma nova pasta de trabalho
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Planilha1');

  // Gera um arquivo Excel em formato binário
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Cria um blob e baixa o arquivo
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
};

export const exportToExcelFull = (rows, columns, fileName = 'relatorio.xlsx') => {
  // 1. Reorganiza os dados conforme a ordem dos campos definidos em `columns`
  const dataFormatted = rows.map((row) => {
    const novoObjeto = {};
    columns.forEach((col) => {
      novoObjeto[col.headerName] = row[col.field]; // headerName como título
    });
    return novoObjeto;
  });

  // 2. Cria a planilha com os novos dados
  const worksheet = XLSX.utils.json_to_sheet(dataFormatted);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Planilha');

  // 3. Exporta como arquivo Excel
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  saveAs(blob, fileName);
};
