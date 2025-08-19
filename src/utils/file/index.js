import JSZip from 'jszip';
import saveAs from 'file-saver';

// Função para converter base64 para Blob
export function base64ToBlob(base64, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

// Função para carregar o arquivo DOCX em base64
export async function loadDocxFromBase64(base64Data) {
  const blob = base64ToBlob(base64Data, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(blob);
  return loadedZip;
}

// Função para modificar o conteúdo do arquivo DOCX
export async function modifyDocxContent(loadedZip, searchText, replaceText) {
  const docXml = await loadedZip.file('word/document.xml').async('string');
  const modifiedXml = docXml.replace(new RegExp(searchText, 'g'), replaceText);
  loadedZip.file('word/document.xml', modifiedXml);
  return loadedZip;
}

// Função para salvar o arquivo DOCX modificado
export async function saveModifiedDocx(loadedZip, outputFileName = 'modified.docx') {
  const newBlob = await loadedZip.generateAsync({ type: 'blob' });
  saveAs(newBlob, outputFileName);
}

export async function checkFileExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok; // Retorna true se o arquivo existe
  } catch (error) {
    return false; // Retorna false em caso de erro
  }
}
