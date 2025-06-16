export const parseCustomDate = (dateStr) => {
  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };

  // Extrai os componentes da string usando substr
  const monthStr = dateStr.substr(0, 3); // "Jan", "Feb", etc.
  const day = parseInt(dateStr.substr(4, 2).trim()); // Dia (D ou DD), removendo espaços extras
  const year = parseInt(dateStr.substr(7, 4)); // Ano (YYYY)
  const time = dateStr.substr(12); // Hora completa "h:mma"

  // Extraindo hora, minuto e período (AM/PM) da parte de tempo
  const [hourStr, minuteStr, period] = time.match(/(\d+):(\d+)(AM|PM)/i).slice(1);
  let hours = parseInt(hourStr);
  const minutes = parseInt(minuteStr);

  // Ajuste de hora para o formato 24 horas com base em AM/PM
  if (period.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  // Verificar se o mês é válido
  if (!(monthStr in monthMap)) {
    throw new Error('Mês inválido ou não reconhecido');
  }

  // Retorna a data no formato Date
  return new Date(year, monthMap[monthStr], day, hours, minutes);
};
