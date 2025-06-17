import { apiFind } from '../../../../api/crudapi';
import { Message } from '../../../../components/Message';
import { Password } from '../../../../components/Password';
import { Decode64 } from '../../../../utils/crypto';

export const descontoMaximo = async (table, cabecalho, item, config) => {
  const tabledesc = 'TB02018,TB02021,TB02227,TB02303';
  if (tabledesc.includes(table)) {
    const tipodesconto = config.tipodesc;
    let classdesc = '';
    let filter = '';

    if (tipodesconto === 'T') {
      classdesc = 'CondicaoDescontoOperacao';
      if (table !== 'TB02303') {
        filter = `TB01026_CODIGO = '${cabecalho.condpag}' AND TB01026_TIPODESC = '${cabecalho.tipodesc}' `;
      } else {
        filter = `TB01026_CODIGO = '${cabecalho.condpag}' AND TB01026_TIPODESC in 
                    (SELECT TB01160_TIPODESC FROM TB01160 WHERE TB01160_CODIGO = '${cabecalho.tipo}') `;
      }
    } else {
      classdesc = 'CondicaoDescontoEmpresa';
      filter = `TB01037_CODIGO = '${cabecalho.condpag}' AND TB01037_EMPDESC = '${cabecalho.codemp}' `;
    }

    let perdesc = 0;
    if (item.prbackup !== item.prunit) {
      if (item.perdesc <= 0) {
        perdesc = parseFloat(((item.prunit - item.prbackup) / item.prunit) * 100).toFixed(2);
      } else {
        Message('frmlancprod', '', 'warning', 'Não é permitido modificar preço unitário e desconto JUNTOS !');
        return false;
      }
    } else {
      perdesc = item.perdesc;
    }

    if (perdesc <= 0) {
      return true;
    }

    const desconto = await apiFind(classdesc, '*', '', filter);
    const admin = Decode64(sessionStorage.getItem('admin')) === 'S';
    const master = Decode64(sessionStorage.getItem('master')) === 'S';

    if (desconto.status === 200) {
      const response = await apiFind('Senha', 'TB00008_ATIVO,TB00008_SENHA,TB00008_FUNCAO', '', 'TB00008_ID = 4');
      if (response.status === 200) {
        const senha = response.data;
        if (desconto.data) {
          const descmax = desconto.data.descmax;
          if (perdesc > descmax) {
            if (!admin && !master && senha.ativo === 'S') {
              await Message('frmlancprod', '', 'warning', 'Desconto máximo permitido!');
              const result = await Password('frmlancprod', senha.senha, 4, senha.funcao, senha.ativo === 'S');
              return result.isConfirmed;
            }
            return true;
          }
          return true;
        }
        if (!admin && !master && senha.ativo === 'S') {
          await Message('frmlancprod', '', 'warning', 'Desconto máximo permitido!');
          const result = await Password('frmlancprod', senha.senha, 4, senha.funcao, senha.ativo === 'S');
          return result.isConfirmed;
        }
        return true;
      }
    }
  }
  return true;
};

export const descontoMaximoFull = async (table, cabecalho, perdesc, config) => {
  const tipodesconto = config.tipodesc;
  let classdesc = '';
  let filter = '';

  if (tipodesconto === 'T') {
    classdesc = 'CondicaoDescontoOperacao';
    if (table !== 'TB02303') {
      filter = `TB01026_CODIGO = '${cabecalho.condpag}' AND TB01026_TIPODESC = '${cabecalho.tipodesc}' `;
    } else {
      filter = `TB01026_CODIGO = '${cabecalho.condpag}' AND TB01026_TIPODESC in 
                      (SELECT TB01160_TIPODESC FROM TB01160 WHERE TB01160_CODIGO = '${cabecalho.tipo}') `;
    }
  } else {
    classdesc = 'CondicaoDescontoEmpresa';
    filter = `TB01037_CODIGO = '${cabecalho.condpag}' AND TB01037_EMPDESC = '${cabecalho.codemp}' `;
  }

  if (perdesc <= 0) {
    return true;
  }

  const desconto = await apiFind(classdesc, '*', '', filter);
  const admin = Decode64(sessionStorage.getItem('admin')) === 'S';
  const master = Decode64(sessionStorage.getItem('master')) === 'S';

  if (desconto.status === 200) {
    const response = await apiFind('Senha', 'TB00008_ATIVO,TB00008_SENHA,TB00008_FUNCAO', '', 'TB00008_ID = 4');
    if (response.status === 200) {
      const senha = response.data;
      if (desconto.data) {
        const descmax = desconto.data.descmax;
        if (perdesc > descmax) {
          if (!admin && !master && senha.ativo === 'S') {
            await Message('frmdesconto', '', 'warning', 'Desconto máximo permitido!');
            const result = await Password('frmdesconto', senha.senha, 4, senha.funcao, senha.ativo === 'S');
            return result.isConfirmed;
          }
          return true;
        }
        return true;
      }
      if (!admin && !master && senha.ativo === 'S') {
        await Message('frmdesconto', '', 'warning', 'Desconto máximo permitido!');
        const result = await Password('frmdesconto', senha.senha, 4, senha.funcao, senha.ativo === 'S');
        return result.isConfirmed;
      }
      return true;
    }
  }
};
