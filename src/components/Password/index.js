import Swal from 'sweetalert2';
import { Message } from '../Message';
import { Decode64 } from '../../utils/crypto';

export const Password = async (target, valuepass, number = 0, term = '', active = true) => {
  const admin = Decode64(sessionStorage.getItem('admin')) === 'S';
  const master = Decode64(sessionStorage.getItem('master')) === 'S';
  const resultOK = {};
  resultOK['isConfirmed'] = true;
  resultOK['isDenied'] = false;
  resultOK['isDismissed'] = false;
  resultOK['value'] = '';
  if (!admin && !master && active) {
    const result = await Swal.fire({
      target: document.getElementById(target),
      title: 'Senha de Autorização',
      input: 'password',
      inputLabel: number + ' - ' + term,
      inputPlaceholder: 'Favor digitar a senha',
      confirmButtonColor: '#20c997',
      inputAttributes: {
        maxlength: 100,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    });
    let senha = valuepass.toUpperCase();
    let digitado = result.value;
    if (digitado !== undefined && digitado !== '') {
      digitado = digitado.toUpperCase();
    }
    if (senha !== digitado) {
      Message(target, 'Verificação da Senha', 'error', 'Senha inválida !');
      result.isConfirmed = false;
    }
    return result;
  } else {
    return resultOK;
  }
};
