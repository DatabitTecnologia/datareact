import { Password } from '../../../../components/Password';
import { Confirmation } from '../../../../components/Confirmation';
import { Message } from '../../../../components/Message';
import { apiList, apiExec, apiFind } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';

export const gerarOrcamento = async (codigo, statuspre, target) => {
  if (statuspre.tipo === 0) {
    return true;
  } else {
    const responsecusto = await apiList('PrevendaCustoVW', '*', '', "CODIGO = '" + codigo + "' ");
    if (responsecusto.status === 200) {
      console.log(responsecusto.data);
      if (responsecusto.data !== undefined && responsecusto.data.length > 0) {
        const responsesenha = await apiFind('Senha', 'TB00008_ATIVO,TB00008_SENHA,TB00008_FUNCAO', '', 'TB00008_ID = 23');
        if (responsesenha.status === 200) {
          const resultsenha = responsesenha.data;
          const confirm = await Confirmation(
            target,
            'Está pré-venda possui item(s) com preço desatualizado, deseja continuar mesmo assim ?'
          );
          if (confirm.isConfirmed) {
            const resultpass = await Password(target, resultsenha.senha, 23, resultsenha.funcao, resultsenha.ativo === 'S');
            if (resultpass.isConfirmed) {
              return await execOrcamento(codigo, Decode64(sessionStorage.getItem('user')), target);
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      } else {
        return await execOrcamento(codigo, Decode64(sessionStorage.getItem('user')), target);
      }
    }
  }
};

export const execOrcamento = async (codigo, user, target) => {
  const responseorcamento = await apiExec("EXEC SP02308 '" + codigo + "','" + user + "' ", 'S');
  if (responseorcamento.status === 200) {
    const resultorcamento = responseorcamento.data[0];
    console.log(responseorcamento.data[0]);
    switch (resultorcamento.STATUS) {
      case -1: {
        await Message(target, '', 'error', resultorcamento.MENSAGEM);
        return false;
      }
      case 0: {
        await Message(target, '', 'warning', resultorcamento.MENSAGEM);
        return false;
      }
      case 1: {
        await Message(target, '', 'success', resultorcamento.MENSAGEM);
        return true;
      }
    }
  }
};
