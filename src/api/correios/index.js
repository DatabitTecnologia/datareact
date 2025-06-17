import axios from 'axios';

export const getCEP = async (cep) => {
  try {
    const api = axios.create({});
    return await api.get('https://viacep.com.br/ws/' + cep + '/json');
  } catch (error) {
    //console.log(error);
  }
};
