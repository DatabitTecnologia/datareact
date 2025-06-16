import axios from 'axios';
import { Decode64 } from '../../utils/crypto';

export const getURL = () => {
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  if (idwhats !== '' && idwhats !== undefined && idwhats !== null) {
    return 'https://api.plugzapi.com.br/instances/' + idwhats + '/token/' + tokenwhats + '/';
  } else {
    return '';
  }
};

export const getInstance = () => {
  const apiInstance = axios.create({
    baseURL: getURL(),
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Client-Token': Decode64(localStorage.getItem('client_token_whats'))
    }
  });
  return apiInstance;
};
