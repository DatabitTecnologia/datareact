import { Password } from '../../../../../components/Password';
import { apiFind } from '../../../../../api/crudapi';
import { Message } from '../../../../../components/Message';

export function validateStatus(target, valorcompra, valor1, valor2, senha) {
  let retorno = true;
  if (valor1 + valor2 > 0) {
    if (isBetween(valorcompra, valor1, valor2)) {
      retorno = true;
    } else {
      Message(
        target,
        'Verificação de Status',
        'warning',
        'Não foi possível passar para este Status, pois o valor da compra está fora da faixa de aprovação !'
      );
    }
    retorno = false;
  }
  return retorno;
}

function isBetween(value, min, max) {
  return value >= min && value <= max;
}
