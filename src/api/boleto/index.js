import { getInstance } from '../apiinstance';

export const gerarBoleto = async (boletos) => {
  try {
    const apiInstance = getInstance();
    const responseboleto = await apiInstance.post('gerarboleto', {
      boletos: boletos
    });
    const result = responseboleto.data;
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
