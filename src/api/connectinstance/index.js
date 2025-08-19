import axios from 'axios';
import { Decode64 } from '../../utils/crypto';

const connectInstance = axios.create({
  baseURL: Decode64(sessionStorage.getItem('urlconnect')),
  timeout: 30000,
  headers: {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }
});

export default connectInstance;
