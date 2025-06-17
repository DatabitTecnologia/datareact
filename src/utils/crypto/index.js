export const Encrypt = (termo) => {
  let key = 'WQKLEWUQMNDSJKEHJKSADFHUWNDJHXCJKHFRJKUIHSADNSCHBGBGFKJAWSDNUSA';
  let keylen = key.length;
  let keypos = -1;
  let scrpos = 0;
  let offset = 24;
  let dest = decimalToHexString(offset);
  let scrasc = '';
  let termofim = '';
  while (scrpos <= termo.length - 1) {
    scrasc = (termo.charCodeAt(scrpos) + offset) % 255;
    if (keypos < keylen) {
      keypos += 1;
    } else {
      keypos = 0;
    }
    scrasc = scrasc ^ key.charCodeAt(keypos);
    termofim = decimalToHexString(scrasc);
    if (termofim.length > 1) {
      dest = dest + termofim;
    } else {
      dest = dest + '0' + termofim;
    }

    offset = scrasc;
    scrpos += 1;
  }
  return dest;
};

export const Decrypt = (termo) => {
  let key = 'WQKLEWUQMNDSJKEHJKSADFHUWNDJHXCJKHFRJKUIHSADNSCHBGBGFKJAWSDNUSA';
  let keylen = key.length;
  let keypos = -1;
  let scrpos = 2;
  let offset = parseInt(termo.substring(0, 2), 16);
  let scrasc = 0;
  let tmpsrcasc = 0;
  let dest = '';
  do {
    scrasc = parseInt(termo.substring(scrpos, scrpos + 2), 16);
    if (keypos < keylen) {
      keypos += 1;
    } else {
      keypos = 0;
    }
    tmpsrcasc = scrasc ^ key.charCodeAt(keypos);
    if (tmpsrcasc <= offset) {
      tmpsrcasc = 255 + tmpsrcasc - offset;
    } else {
      tmpsrcasc = tmpsrcasc - offset;
    }
    dest = dest + String.fromCharCode(tmpsrcasc);
    offset = scrasc;
    scrpos += 2;
  } while (termo.length > scrpos);
  return dest;
};

export const Encode64 = (termo) => {
  if (termo !== '' && termo !== undefined && termo !== null) {
    return btoa(Encrypt(termo));
  } else {
    return '';
  }
};

export const Decode64 = (termo) => {
  if (termo !== '' && termo !== undefined && termo !== null) {
    try {
      return Decrypt(atob(termo));
    } catch (error) {
      //console.log('String incorreta ' + termo);
    }
  } else {
    return '';
  }
};

export function decimalToHexString(number) {
  if (number < 0) {
    number = 0xffffffff + number + 1;
  }

  return number.toString(16).toUpperCase();
}

export async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

export function base64toBlob(data, tipo) {
  const bytes = atob(data);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }
  return new Blob([out], { type: tipo });
}

export async function imageUrlToBase64(url) {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
    reader.onerror = reject;
  });
}

function limparBase64(base64String) {
  return base64String.replace(/[^A-Za-z0-9+/=]/g, '');
}

function corrigirPadding(base64String) {
  // Remove espaços em branco ou padding extra
  base64String = base64String.trim().replace(/=*$/, '');

  // Adiciona o padding correto
  while (base64String.length % 4 !== 0) {
    base64String += '=';
  }

  return base64String;
}

export function repararBase64(base64String) {
  // Limpa caracteres inválidos
  let base64Limpo = limparBase64(base64String);

  // Corrige o padding
  let base64Corrigido = corrigirPadding(base64Limpo);

  return base64Corrigido;
}

export function base64ToURL(base64) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = () => {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL('image/png');

      resolve(dataURL);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = base64;
  });
}

export async function getImageUrl(base64) {
  try {
    const url = await base64ToURL(base64);
    return url; // Retorna para uso posterior
  } catch (error) {
    console.error('Erro ao gerar a URL:', error);
  }
}
