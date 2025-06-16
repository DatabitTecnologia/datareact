import { apiFind } from '../../../../../api/crudapi';
import { Message } from '../../../../../components/Message';

// Método de Validação de STATUS
export const validateStatusServ = async (statusatual) => {
  const status = await apiFind('PrevendaStatus', '*', '', "TB01156_CODIGO = '" + statusatual + "' ");
  if (status.status === 200 && status.data) {
    let excluir = status.data.excluir;
    let alterar = status.data.alterar;
    const events = [
      {
        id: 'ValidaStatusInsertServ',
        type: 1, // Before Insert
        method: function () {
          // Validação do Status
          if (alterar === 'N') {
            Message('frminfor', '', 'warning', 'Não é permitido incluir serviços nesta Pré-Venda com este STATUS !');
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaStatusDeleteServ',
        type: 3, // Before Delete
        method: function () {
          // Validação do Status
          if (excluir === 'N') {
            Message('frminfor', '', 'warning', 'Não é permitido excluir serviços nesta Pré-Venda com este STATUS !');
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaStatusEditServ',
        type: 5, // Before Edit
        method: function () {
          // Validação do Status
          if (alterar === 'N') {
            Message('frmlancserv', '', 'warning', 'Não é permitido alterar serviços nesta Pré-Venda com este STATUS !');
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
export const validateOrcamentoServ = async (codigo) => {
  const prevenda = await apiFind('Prevenda', '*', '', "TB02303_CODIGO = '" + codigo + "' ");
  if (prevenda.status === 200 && prevenda.data) {
    const orcamento = prevenda.data.numorc;
    const events = [
      {
        id: 'ValidaOrcamentoInsertServ',
        type: 1, // Before Insert
        method: function () {
          // Validação do Orçamento
          if (orcamento !== undefined && orcamento !== null && orcamento !== '') {
            Message(
              'frminfor',
              '',
              'warning',
              'Não é permitido incluir serviços nesta Pré-Venda, pois foi gerado o Orçamento : ' + orcamento
            );
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaOrcamentoDeleteServ',
        type: 3, // Before Delete
        method: function () {
          // Validação do Orçamento
          if (orcamento !== undefined && orcamento !== null && orcamento !== '') {
            Message(
              'frminfor',
              '',
              'warning',
              'Não é permitido excluir serviços nesta Pré-Venda, pois foi gerado o Orçamento : ' + orcamento
            );
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaOrcamentoEditServ',
        type: 5, // Before Edit
        method: function () {
          // Validação do Orçamento
          if (orcamento !== undefined && orcamento !== null && orcamento !== '') {
            Message(
              'frmlancserv',
              '',
              'warning',
              'Não é permitido alterar serviços nesta Pré-Venda, pois foi gerado o Orçamento : ' + orcamento
            );
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
