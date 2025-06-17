import { apiFind } from '../../../../../api/crudapi';
import { Message } from '../../../../../components/Message';

// Método de Validação de STATUS
export const validateStatusPar = async (statusatual) => {
  const status = await apiFind('PrevendaStatus', '*', '', "TB01156_CODIGO = '" + statusatual + "' ");
  if (status.status === 200 && status.data) {
    let excluir = status.data.excluir;
    let alterar = status.data.alterar;
    const events = [
      {
        id: 'ValidaStatusInsertPar',
        type: 1, // Before Insert
        method: function () {
          // Validação do Status
          if (alterar === 'N') {
            Message('frmparcela', '', 'warning', 'Não é permitido incluir parcelas nesta Pré-Venda com este STATUS !');
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaStatusDeletePar',
        type: 3, // Before Delete
        method: function () {
          // Validação do Status
          if (excluir === 'N') {
            Message('frmparcela', '', 'warning', 'Não é permitido excluir parcelas nesta Pré-Venda com este STATUS !');
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaStatusEditPar',
        type: 5, // Before Edit
        method: function () {
          // Validação do Status
          if (alterar === 'N') {
            Message('frmparcela', '', 'warning', 'Não é permitido alterar parcelas nesta Pré-Venda com este STATUS !');
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
export const validateOrcamentoPar = async (codigo) => {
  const prevenda = await apiFind('Prevenda', '*', '', "TB02303_CODIGO = '" + codigo + "' ");
  if (prevenda.status === 200 && prevenda.data) {
    const orcamento = prevenda.data.numorc;
    const events = [
      {
        id: 'ValidaOrcamentoInsertPar',
        type: 1, // Before Insert
        method: function () {
          // Validação do Orçamento
          if (orcamento !== undefined && orcamento !== null && orcamento !== '') {
            Message(
              'frmparcela',
              '',
              'warning',
              'Não é permitido incluir parcelas nesta Pré-Venda, pois foi gerado o Orçamento : ' + orcamento
            );
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaOrcamentoDeletePar',
        type: 3, // Before Delete
        method: function () {
          // Validação do Orçamento
          if (orcamento !== undefined && orcamento !== null && orcamento !== '') {
            Message(
              'frmparcela',
              '',
              'warning',
              'Não é permitido excluir parcelas nesta Pré-Venda, pois foi gerado o Orçamento : ' + orcamento
            );
            return false;
          } else {
            return true;
          }
        }
      },
      {
        id: 'ValidaOrcamentoEditPar',
        type: 5, // Before Edit
        method: function () {
          // Validação do Orçamento
          if (orcamento !== undefined && orcamento !== null && orcamento !== '') {
            Message(
              'frmparcela',
              '',
              'warning',
              'Não é permitido alterar parcelas nesta Pré-Venda, pois foi gerado o Orçamento : ' + orcamento
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
