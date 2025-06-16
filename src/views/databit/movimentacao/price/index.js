import { apiFind } from '../../../../api/crudapi';

export function getPrice(cabecalho, tablemov, typeprice, itemselec, prodselec, entsai, config) {
  itemselec.custo = prodselec.custo;
  itemselec.percst = prodselec.mva;
  if (tablemov === 'TB02118') {
    itemselec.obs = prodselec.nomeprod;
  }
  if (entsai === 'E') {
    apiFind('NCM', '*', '', "codigo = '" + prodselec.ncm + "'  ").then((response) => {
      itemselec.percst = response.data.mva;
    });
  }
  return;
}
