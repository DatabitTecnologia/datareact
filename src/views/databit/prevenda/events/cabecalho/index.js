import { apiFind, apiExec, apiDelete } from '../../../../../api/crudapi';
import { Message } from '../../../../../components/Message';

// Método de Validação de STATUS
export const validateStatus = async (statusatual) => {
  const status = await apiFind('PrevendaStatus', '*', '', "TB01156_CODIGO = '" + statusatual + "' ");
  if (status.status === 200 && status.data) {
    let excluir = status.data.excluir;
    let alterar = status.data.alterar;
    const events = [
      {
        id: 'ValidaStatusDelete',
        type: 3, // Before Delete
        method: function () {
          // Validação do Status
          if (excluir === 'N') {
            Message('frminfor', '', 'warning', 'Não é permitido excluir esta Pré-Venda com este STATUS !');
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaStatusEdit',
        type: 5, // Before Edit
        method: function () {
          // Validação do Status
          if (alterar === 'N') {
            Message('frminfor', '', 'warning', 'Não é permitido alterar esta Pré-Venda com este STATUS !');
            return false;
          } else {
            return true;
          }
        }
      }
    ];
    return events;
  } else {
    return null;
  }
};

// Validação se o campo Orçamento foi preenchido
export const validateOrcamento = async (codigo) => {
  const prevenda = await apiFind('Prevenda', '*', '', "TB02303_CODIGO = '" + codigo + "' ");
  if (prevenda.status === 200 && prevenda.data) {
    const orcamento = prevenda.data.numorc;
    const events = [
      {
        id: 'ValidaOrcamentoDelete',
        type: 3, // Before Delete
        method: function () {
          // Validação do Orçamento
          if (orcamento !== undefined && orcamento !== null && orcamento !== '') {
            Message('frminfor', '', 'warning', 'Não é permitido excluir esta Pré-Venda, pois foi gerado o Orçamento : ' + orcamento);
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaOrcamentoEdit',
        type: 5, // Before Edit
        method: function () {
          // Validação do Orçamento
          if (orcamento !== undefined && orcamento !== null && orcamento !== '') {
            Message('frminfor', '', 'warning', 'Não é permitido alterar esta Pré-Venda, pois foi gerado o Orçamento : ' + orcamento);
            return false;
          } else {
            return true;
          }
        }
      }
    ];
    return events;
  } else {
    return null;
  }
};

// Excluindo os itens (Produtos)
export const exclusaoItens = async (codigo, setProcessando, setItematual) => {
  const events = [
    {
      id: 'ExclusaoItens',
      type: 12, // After Confirm. Delete
      method: async function () {
        // ← async aqui é essencial!
        const responseitens = await apiExec("exec SP02302 'TB02304', '" + codigo + "' ", 'S');

        if (responseitens.status === 200 && responseitens.data) {
          const itens = responseitens.data;
          setProcessando(true);

          for (const item of itens) {
            setItematual(item);
            await apiDelete('PrevendaItem', item); // corrigido nome da entidade como string
          }

          setProcessando(false);
          return true;
        }
      }
    }
  ];
  return events;
};

// Excluindo os itens (Serviços)
export const exclusaoServ = async (codigo, setProcessando, setItematual) => {
  const events = [
    {
      id: 'ExclusaoServ',
      type: 12, // After Confirm. Delete
      method: async function () {
        // ← async aqui é essencial!
        const responseitens = await apiExec("exec SP02306 'TB02305', '" + codigo + "' ", 'S');

        if (responseitens.status === 200 && responseitens.data) {
          const itens = responseitens.data;
          setProcessando(true);

          for (const item of itens) {
            setItematual(item);
            await apiDelete('PrevendaServico', item); // corrigido nome da entidade como string
          }

          setProcessando(false);
          return true;
        }
      }
    }
  ];
  return events;
};

export const exclusaoPar = async (codigo, setProcessando, setItematual) => {
  const events = [
    {
      id: 'ExclusaoPar',
      type: 12, // After Confirm. Delete
      method: async function () {
        // ← async aqui é essencial!
        const responseitens = await apiExec("exec SP02307 'TB02307', '" + codigo + "' ", 'S');

        if (responseitens.status === 200 && responseitens.data) {
          const itens = responseitens.data;
          setProcessando(true);

          for (const item of itens) {
            setItematual(item);
            await apiDelete('PrevendaParcela', item); // corrigido nome da entidade como string
          }

          setProcessando(false);
          return true;
        }
      }
    }
  ];
  return events;
};
