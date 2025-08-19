export function agruparDados(dados, campoAgrupar) {
  const isNumeric = (val) => typeof val === 'number' && !isNaN(val);

  return Object.values(
    dados.reduce((acc, item) => {
      const key = item[campoAgrupar];

      if (!acc[key]) {
        // Cria base inicial com campos numéricos zerados
        acc[key] = { [campoAgrupar]: key };

        for (const prop in item) {
          if (prop !== campoAgrupar && isNumeric(item[prop])) {
            acc[key][prop] = 0;
          }
        }
      }

      // Soma os campos numéricos
      for (const prop in item) {
        if (prop !== campoAgrupar && isNumeric(item[prop])) {
          acc[key][prop] += item[prop];
        }
      }

      return acc;
    }, {})
  );
}
