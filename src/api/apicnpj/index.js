import { getCNPJInstance } from '../cnpjinstance';
import axios from 'axios';

export const getConsultaCNPJ = async (cnpj) => {
  try {
    const consulta = axios.create();
    return await consulta.get('https://www.receitaws.com.br/v1/cnpj/00000000000191');
  } catch (error) {
    console.log(error);
  }
};
