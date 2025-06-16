import FingerprintJS from '@fingerprintjs/fingerprintjs';

/**
 * Retorna o ID único do navegador.
 * @returns {Promise<string>} visitorId - O identificador único do navegador/dispositivo.
 */
export const getBrowserId = async () => {
  try {
    // Cria uma instância do FingerprintJS
    const fp = await FingerprintJS.load();

    // Obtém o resultado com o ID único
    const result = await fp.get();

    // Retorna o visitorId

    return result;
  } catch (error) {
    console.error('Erro ao gerar o ID do navegador:', error);
    throw new Error('Não foi possível obter o ID do navegador.');
  }
};
