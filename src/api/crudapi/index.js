import { getInstance } from '../apiinstance';
import { Decode64 } from '../../utils/crypto';

export const apiList = async (nameclass, fields, fieldscalc, filter, count = 0) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('list' + nameclass + '/', {
      token: sessionStorage.getItem('token'),
      campos: fields,
      camposcalc: fieldscalc,
      filtro: filter,
      count: count
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiFields = async (nameclass, fields, fieldscalc, filter, count = 0, joinuser = false, primarykey = '') => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('fields' + nameclass + '/', {
      token: sessionStorage.getItem('token'),
      campos: fields,
      camposcalc: fieldscalc,
      filtro: filter,
      count: count,
      joinuser: joinuser,
      primarykey: primarykey
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiDict = async (nameclass, fields, fieldscalc, filter, count = 0) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('dict' + nameclass + '/', {
      token: sessionStorage.getItem('token'),
      campos: fields,
      camposcalc: fieldscalc,
      filtro: filter,
      count: count
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiID = async (nameclass) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post(nameclass + 'ID', { token: sessionStorage.getItem('token') });
  } catch (error) {
    //console.log(error);
  }
};

export const apiIDTable = async (table) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('getIDTable', { token: sessionStorage.getItem('token'), tabela: table });
  } catch (error) {
    //console.log(error);
  }
};

export const apiFind = async (nameclass, fields, fieldscalc, filter) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('find' + nameclass + '/', {
      token: sessionStorage.getItem('token'),
      campos: fields,
      camposcalc: fieldscalc,
      filtro: filter
    });
  } catch (error) {
    ////console.log('erro aqui');
    ////console.log(nameclass);
    ////console.log(error);
  }
};

export const apiInsert = async (nameclass, data) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('ins' + nameclass, {
      token: sessionStorage.getItem('token'),
      usuario: Decode64(sessionStorage.getItem('user')),
      object: data
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiUpdate = async (nameclass, data) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('upd' + nameclass, {
      token: sessionStorage.getItem('token'),
      usuario: Decode64(sessionStorage.getItem('user')),
      object: data
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiDelete = async (nameclass, data) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('del' + nameclass, {
      token: sessionStorage.getItem('token'),
      usuario: Decode64(sessionStorage.getItem('user')),
      object: data
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiExec = async (sql, cursor) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('executeSQL/', { token: sessionStorage.getItem('token'), sql: sql, cursor: cursor });
  } catch (error) {
    //console.log(error);
  }
};

export const apiFieldsList = async (object, extra) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('fieldsList', {
      token: sessionStorage.getItem('token'),
      tabela: object,
      extra: extra,
      user: Decode64(sessionStorage.getItem('user'))
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiFieldsDict = async (object) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('fieldsDict', { token: sessionStorage.getItem('token'), tabela: object });
  } catch (error) {
    //console.log(error);
  }
};

export const apiDropdown = async (table, value, label, filter) => {
  try {
    let sql = 'select ' + value + ' as value, ' + label + ' as label from ' + table;
    if (filter !== '' && filter !== undefined && filter !== null) {
      sql = sql + ' where ' + filter;
    }
    if (!sql.includes('ORDER BY')) {
      sql = sql + ' order by 2';
    }
    const apiInstance = getInstance();
    return await apiInstance.post('executeSQL/', { token: sessionStorage.getItem('token'), sql: sql, cursor: 'S' });
  } catch (error) {
    //console.log(error);
  }
};

export const apiBrowse = async (object, fields, exists) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('browseList', {
      token: sessionStorage.getItem('token'),
      tabela: object,
      campos: fields,
      possui: exists
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiCreateField = async (object) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('createField', { token: sessionStorage.getItem('token'), object: object });
  } catch (error) {
    //console.log(error);
  }
};

export const apiUpdateField = async (object) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('updateField', { token: sessionStorage.getItem('token'), object: object });
  } catch (error) {
    //console.log(error);
  }
};

export const apiCreateView = async (object) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('createView', { token: sessionStorage.getItem('token'), object: object });
  } catch (error) {
    //console.log(error);
  }
};

export const apiGetPicture = async (table, fieldpk, fieldimage, value) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('getPicture/', {
      token: sessionStorage.getItem('token'),
      table: table,
      fieldpk: fieldpk,
      field: fieldimage,
      value: value
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiGetPicturelist = async (table, fieldpk, fieldimage, filter, fieldslist, base64) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('getPicturelist/', {
      token: sessionStorage.getItem('token'),
      table: table,
      fieldpk: fieldpk,
      field: fieldimage,
      where: filter,
      fieldslist: fieldslist,
      base64: base64
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiSetPicture = async (table, fieldpk, fieldimage, value, base64) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('setPicture/', {
      token: sessionStorage.getItem('token'),
      table: table,
      fieldpk: fieldpk,
      field: fieldimage,
      value: value,
      base64: base64
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiGetFile = async (table, fieldpk, fieldfile, value) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('getFile/', {
      token: sessionStorage.getItem('token'),
      table: table,
      fieldpk: fieldpk,
      field: fieldfile,
      value: value
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiSetFile = async (table, fieldpk, fieldfile, value, base64) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('setPicture/', {
      token: sessionStorage.getItem('token'),
      table: table,
      fieldpk: fieldpk,
      field: fieldfile,
      value: value,
      base64: base64
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiDocument = async (model, moviment) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.post('convertDocument/', {
      token: sessionStorage.getItem('token'),
      model: model,
      mov: moviment,
      user: Decode64(sessionStorage.getItem('user'))
    });
  } catch (error) {
    //console.log(error);
  }
};

export const apiCNPJ = async (cnpj) => {
  try {
    const apiInstance = getInstance();
    return await apiInstance.get('consultaCNPJ?cnpj=' + cnpj);
  } catch (error) {
    //console.log(error);
  }
};

export const Teste = async () => {
  const apiInstance = getInstance();
  console.log(sessionStorage.getItem('url'));
  return await apiInstance.get('consultaCNPJ?cnpj=00650512000101');
};
