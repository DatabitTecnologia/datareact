export function capitalizeText(texto) {
  const palavrasMinusculas = ['da', 'de', 'do', 'das', 'dos', 'e'];

  return texto
    .toLowerCase()
    .split(' ')
    .map((palavra, index) => {
      if (palavrasMinusculas.includes(palavra) && index !== 0) {
        return palavra;
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
}
