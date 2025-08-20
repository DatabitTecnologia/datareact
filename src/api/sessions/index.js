import { getInstance } from '../apiinstance';
import { Decode64, Encode64 } from '../../utils/crypto';
import { v4 as uuidv4 } from 'uuid';

// Gera um ID único por aba (mantém em window.name ou sessionStorage real)
function getSessionId() {
  if (!window.name) {
    window.name = uuidv4(); // cada aba nova ganha um ID
  }
  return window.name;
}

export const sessionApi = {
  set: async (chave, valor) => {
    const apiInstance = getInstance();
    await apiInstance.post('/session/set', {
      session_id: getSessionId(),
      chave,
      valor
    });
  },
  get: async (chave) => {
    const apiInstance = getInstance();
    const result = await apiInstance.get(`/session/get/${getSessionId()}/${chave}`);
    return result.data.valor;
  },
  clear: async (chave) => {
    const apiInstance = getInstance();
    await apiInstance.delete(`/session/clear/${getSessionId()}/${chave}`);
  },
  all: async () => {
    const apiInstance = getInstance();
    await apiInstance.get(`/session/all/${getSessionId()}`);
  }
};
