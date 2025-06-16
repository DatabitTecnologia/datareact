import { Decode64 } from '../../utils/crypto';
import { getConnectionCNPJ } from '../apiconnect';

import axios from 'axios';

export const getURL = () => {
  if (localStorage.getItem('url') === '') {
    getConnectionCNPJ(Decode64(sessionStorage.getItem('urlconnect')), localStorage.getItem('cnpj')).then((resultado) => {
      if (resultado.data.length > 0) {
        sessionStorage.setItem('url', resultado.data[0].URL);
        return Decode64(sessionStorage.getItem('url'));
      }
    });
  } else {
    return Decode64(sessionStorage.getItem('url'));
  }
};

export const getInstance = () => {
  const apiInstance = axios.create({
    baseURL: getURL(),
    timeout: 30000,
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    }
  });
  return apiInstance;
};
