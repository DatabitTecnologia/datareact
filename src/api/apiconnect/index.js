import axios from 'axios';

export const getConnectionCNPJ = async (url, cnpj) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.get('getConnectionCNPJ/' + cnpj);
  } catch (error) {
    //console.log(error);
  }
};

export const getConnectionToken = async (url, token) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.get('getConnectionToken/' + token);
  } catch (error) {
    //console.log(error);
  }
};

export const getClass = async (url, object) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.get('getClass/' + object);
  } catch (error) {
    //console.log(error);
  }
};

export const getListClass = async (url, object) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.get('getListClass/' + object);
  } catch (error) {
    //console.log(error);
  }
};

export const getListClassall = async (url, object) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.get('getListClassall/' + object);
  } catch (error) {
    //console.log(error);
  }
};

export const onMenu = async (url, system, modules, filter, admin, permission) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.post('onMenu/', {
      system: system,
      modules: modules,
      filter: filter,
      admin: admin,
      permissao: permission
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdmin = async (url, user) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.get('getAdmin/' + user);
  } catch (error) {
    //console.log(error);
  }
};

export const getPasswordAdmin = async (url, user, password) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.get('getPasswordAdmin/' + user + '/' + password);
  } catch (error) {
    //console.log(error);
  }
};

export const getSystem = async (url) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.get('getSystem');
  } catch (error) {
    //console.log(error);
  }
};

export const getImage = async (url, system) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.get('getImage/' + system);
  } catch (error) {
    console.log(error);
  }
};

export const setUser = async (url, system, partner, usersys, idbrowser, ipaddress) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    const jsonfim = {
      system: system,
      partner: partner,
      usersys: usersys,
      idbrowser: idbrowser,
      ipaddress: ipaddress
    };
    return await connect.post('setUser/', jsonfim);
  } catch (error) {
    //console.log(error);
  }
};

export const delUser = async (url, system, partner, usersys, idbrowser, ipaddress) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.post('delUser/', {
      system: system,
      partner: partner,
      usersys: usersys,
      idbrowser: idbrowser,
      ipaddress: ipaddress
    });
  } catch (error) {
    //  console.log(error);
  }
};

export const listUsers = async (url, system, partner) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return await connect.post('listUsers/', {
      system: system,
      partner: partner
    });
  } catch (error) {
    //  console.log(error);
  }
};

export const posCli = async (url, cdu, partner) => {
  try {
    const connect = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });

    return await connect.post('posCli/', {
      cdu: cdu,
      partner: partner
    });
  } catch (error) {
    console.log(error);
  }
};
