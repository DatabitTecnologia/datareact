export function addMonths(date, months) {
  const newDate = new Date(date.valueOf());
  const currentMonth = newDate.getMonth();
  const newMonth = parseInt(currentMonth) + parseInt(months);
  newDate.setMonth(newMonth);
  // Verifique se o dia do mês mudou após adicionar os meses
  if (newDate.getDate() !== date.getDate()) {
    // Ajuste a data para o último dia do mês anterior
    newDate.setDate(0);
  }
  return newDate;
}
