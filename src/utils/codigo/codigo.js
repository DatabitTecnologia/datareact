export const addCodigo = (codigo) => {
  codigo = codigo.toUpperCase();
  let tamanho = codigo.length;
  let count = tamanho;
  let novocodigo = codigo;
  let letra2 = [];
  while (count > 0) {
    let letra = codigo.substr(count - 1, 1);
    for (let count2 = 0; count2 < count; count2++) {
      letra2[count2] = codigo.substr(count2, 1);
    }
    if (
      letra === '0' ||
      letra === '1' ||
      letra === '2' ||
      letra === '3' ||
      letra === '4' ||
      letra === '5' ||
      letra === '6' ||
      letra === '7' ||
      letra === '8'
    ) {
      let numerofim = parseInt(letra) + 1;
      novocodigo = novocodigo.substr(0, count - 1) + numerofim.toString() + novocodigo.substr(count, tamanho);
      break;
    }
    if (letra === '9') {
      let possui9 = true;
      for (let count2 = 0; count2 < count; count2++) {
        if (letra2[count2] !== '9') {
          possui9 = false;
          break;
        }
      }
      if (possui9) {
        novocodigo = novocodigo.substr(0, count - 1) + 'A' + novocodigo.substr(count, tamanho);
        break;
      } else {
        novocodigo = novocodigo.substr(0, count - 1) + '0' + novocodigo.substr(count, tamanho);
      }
    }
    if (
      letra !== '0' &&
      letra !== '1' &&
      letra !== '2' &&
      letra !== '3' &&
      letra !== '4' &&
      letra !== '5' &&
      letra !== '6' &&
      letra !== '7' &&
      letra !== '8' &&
      letra !== '9'
    ) {
      if (letra !== 'Z') {
        let numeroletra = letra.charCodeAt(0) + 1;
        let asciifim = String.fromCharCode(numeroletra);
        novocodigo = novocodigo.substr(0, count - 1) + asciifim + novocodigo.substr(count, tamanho);
        break;
      } else {
        novocodigo = novocodigo.substr(0, count - 1) + '0' + novocodigo.substr(count, tamanho);
      }
    }
    count -= 1;
  }
  return novocodigo;
};
