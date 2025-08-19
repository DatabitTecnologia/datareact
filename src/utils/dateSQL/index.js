import { zeroLeft } from '../zeroleft';

export function dateSQL(date) {
  let dia = date.getDate();
  let mes = date.getMonth();
  let ano = date.getFullYear();
  let horas = date.getHours();
  let minutos = date.getMinutes();
  let segundos = date.getSeconds();
  const datafim = zeroLeft(mes + 1, 2) + '/' + zeroLeft(dia, 2) + '/' + ano + ' ' + horas + ':' + minutos + ':' + segundos;
  return datafim;
}
