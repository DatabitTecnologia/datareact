import { getInstance } from '../apiinstance';

export const gerarNFe = async (filename, xml) => {
  try {
    const apiInstance = getInstance();
    const responsenfe = await apiInstance.post('gerarnfe', {
      filename: filename,
      xml_str: xml
    });
    const result = responsenfe.data;
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
