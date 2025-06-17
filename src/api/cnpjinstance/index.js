import axios from 'axios';
export const getCNPJInstance = () => {
  const apiInstance = axios.create({
    baseURL: 'https://www.receitaws.com.br/v1/',
    timeout: 30000,
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    }
  });
  return apiInstance;
};
