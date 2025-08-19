import { getInstance } from '../apiinstance';

export const gerarNFe = async (filename, xml) => {
  try {
    const apiInstance = getInstance();
    const responsenfe = await apiInstance.post('gerarnfe/', {
      filename: filename,
      xml_str: decodeHtml(xml)
    });
    const result = responsenfe.data;
    console.log(result.data);
    if (result.status === 1 && result.mensagem) {
      const base64 = result.mensagem;
      const pdfBlob = await fetch(`data:application/pdf;base64,${base64}`).then((res) => res.blob());
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    }
  } catch (error) {
    console.log(error);
  }
};

export function downloadXML(xmlString, fileName = 'nota-fiscal.xml') {
  const blob = new Blob([xmlString], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  // Limpar depois do clique
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};
