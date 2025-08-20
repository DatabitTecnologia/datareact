import { getInstance } from '../apiinstance';
import { Decode64, Encode64 } from '../../utils/crypto';
import { v4 as uuidv4 } from 'uuid';

// ID único por aba (persistente até fechar a aba)
function getSessionId() {
  if (!window.name) {
    window.name = uuidv4();
  }
  return window.name;
}

const apiInstance = getInstance();

export const sessionApi = {
  set: async (chave, valor) => {
    await apiInstance.post('/session/set', {
      session_id: getSessionId(),
      chave,
      valor: Encode64(valor) // aplica criptografia (opcional)
    });
  },

  get: async (chave) => {
    const result = await apiInstance.get(`/session/get/${getSessionId()}/${chave}`);
    return result.data.valor ? Decode64(result.data.valor) : null;
  },

  clear: async (chave) => {
    await apiInstance.delete(`/session/clear/${getSessionId()}/${chave}`);
  },

  all: async () => {
    const result = await apiInstance.get(`/session/all/${getSessionId()}`);
    // decodifica todas as chaves, se necessário
    const dados = {};
    for (const [k, v] of Object.entries(result.data)) {
      dados[k] = v ? Decode64(v) : null;
    }
    return dados;
  }
};
