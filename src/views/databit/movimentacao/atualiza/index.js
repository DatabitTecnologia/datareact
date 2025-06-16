import { apiExec, apiUpdate } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';

export const atualizaPreco = async (table, cabecalho, classitem, coddest, tabdest, entsai, typeprice, typestock, itens, setItematual) => {
  for (const item of itens) {
    setItematual(item);
    try {
      const procurarResponse = await procurarItem(table, cabecalho, coddest, tabdest, item, entsai, typeprice, tabdest);
      await salvarItem(table, cabecalho, classitem, coddest, tabdest, typestock, entsai, item, procurarResponse);
    } catch (error) {
      console.log('Erro ao processar item:', error);
    }
  }
};

const procurarItem = async (table, cabecalho, coddest, tabdest, item, entsai, typeprice) => {
  return await apiExec(
    "exec SP02303 '" +
      table +
      "','" +
      cabecalho.codigo +
      "','" +
      item.produto +
      "','" +
      cabecalho.codemp +
      "','" +
      cabecalho[coddest] +
      "','" +
      tabdest +
      "','" +
      entsai +
      "'," +
      typeprice +
      ",'" +
      item.tabela +
      "' ",
    'S'
  );
};

const salvarItem = async (table, cabecalho, classitem, coddest, tabdest, typestock, entsai, item, response) => {
  const preco = response.data;

  const responsecalc = await apiExec(
    "exec SP02304 '" +
      cabecalho.codemp +
      "','" +
      table +
      "', '" +
      cabecalho.codigo +
      "', '" +
      item.produto +
      "','" +
      entsai +
      "', " +
      item.qtprod +
      ' , ' +
      preco[0].precofim +
      ' , ' +
      item.perdesc +
      ' , ' +
      (item.percipi ?? 0) +
      ",'" +
      (item.freteipi ?? 'N') +
      "','" +
      (item.despipi ?? 'N') +
      "'," +
      item.vlrfrete +
      ',' +
      item.vlroutdesp +
      ',' +
      item.icms +
      ",'" +
      (item.cst ?? preco[0].csticmsfim) +
      "'," +
      item.basered +
      ",'" +
      item.ipiicms +
      "'," +
      preco[0].icmsstfim +
      ',' +
      item.percst +
      ',' +
      item.percdif +
      ',' +
      cabecalho.vlrbruto +
      ',' +
      (cabecalho.vlrfrete ?? 0) +
      ',' +
      (cabecalho.vlroutdesp ?? 0) +
      ",'" +
      cabecalho[coddest] +
      "','" +
      tabdest +
      "','" +
      (item.unprod ?? '00') +
      "','" +
      (item.tabela ?? '00') +
      "','" +
      Decode64(sessionStorage.getItem('user')) +
      "'," +
      item.aliqcsllret +
      ',' +
      item.aliqcofinsret +
      ',' +
      item.aliqinssret +
      ',' +
      item.aliqirret +
      ',' +
      item.aliqpisret +
      ',' +
      item.aliqissret +
      ",'" +
      item.retcsll +
      "','" +
      item.retcofins +
      "','" +
      item.retinss +
      "','" +
      item.retir +
      "','" +
      item.retpis +
      "','" +
      (item.retiss ?? 'N') +
      "','" +
      typestock +
      "','" +
      (item.contabil ?? 'N') +
      "'",
    'S'
  );

  const result = responsecalc.data;

  const itemfim = {
    acrescimob: item.acrescimo,
    afrmmb: item.afrmm,
    basefcptotb: item.basefcptot,
    basefcptotstb: item.basefcptotst,
    baseicmsb: item.baseicms,
    basestb: item.basest,
    codigo: item.codigo,
    codemp: cabecalho.codemp,
    custo: preco[0].custofim,
    custocompra: preco[0].custocomprafim,
    prbackup: preco[0].precofim,
    produto: item.produto,
    prunit: preco[0].precofim,
    qtdispb: item.qtdisp,
    qtprodb: item.qtprod,
    totvalorb: item.totvalor,
    vlrbcipib: item.vlrbcipi,
    vlrcofinsb: item.vlrcofins,
    vlrcofinsretb: item.vlrcofinsret,
    vlrcsllb: item.vlrcsll,
    vlrcsllretb: item.vlrcsllret,
    vlrdescb: item.vlrdesc,
    vlrdifaliqb: item.vlrdifaliq,
    vlrfcpb: item.vlrfcp,
    vlrfcptotb: item.vlrfcptot,
    vlrfcptotstb: item.vlrfcptotst,
    vlrfreteb: item.vlrfrete,
    vlricmsb: item.vlricms,
    vlricmsdentrob: item.vlricmsdentro,
    vlricmsdesonb: item.vlricmsdeson,
    vlricmsdifb: item.vlricmsdif,
    vlricmsforab: item.vlricmsfora,
    vlrinssb: item.vlrinss,
    vlrinssretb: item.vlrinssret,
    vlripib: item.vlripi,
    vlrirb: item.vlrir,
    vlrirretb: item.vlrirret,
    vlrissb: item.vlriss,
    vlrissretb: item.vlrissret,
    vlroutdespb: item.vlroutdesp,
    vlrpisb: item.vlrpis,
    vlrpisretb: item.vlrpisret,
    vlrstb: item.vlrst,
    totvalor: result[0].totvalor,
    vlrdesc: result[0].vlrdesc,
    vlripi: result[0].vlripi,
    vlrbcipi: result[0].vlrbcipi,
    vlricmsdeson: result[0].vlricmsdeson,
    vlricms: result[0].vlricms,
    vlricmscu: result[0].vlricms,
    baseicms: result[0].baseicms,
    basest: result[0].basesub,
    basefcptotst: result[0].basefcptotst,
    vlrfcptotst: result[0].vlrfcptotst,
    fcpst: result[0].fcpst,
    vlrst: result[0].vlrst,
    fcp: result[0].fcp,
    vlrfcp: result[0].vlrfcp,
    partilhaint: result[0].partilhaint,
    partilhaext: result[0].partilhaext,
    icmsdentro: result[0].icmsdentro,
    icmsfora: result[0].icmsfora,
    vlricmsdentro: 0,
    vlricmsfora: result[0].vlricmsfora,
    basefcptot: result[0].basefcptot,
    vlrfcptot: result[0].vlrfcptot,
    qtprodun: result[0].qtprodun,
    vlricmsdif: result[0].vlricmsdif,
    tabela: result[0].tabfim,
    vlrpisret: result[0].vlrpisret,
    vlrcofinsret: result[0].vlrcofinsret,
    vlrirret: result[0].vlrirret,
    vlrcsllret: result[0].vlrcsllret,
    vlrinssret: result[0].vlrinssret,
    vlrissret: result[0].vlrissret
  };

  const responseupdate = await apiUpdate(classitem, itemfim);

  return responseupdate;
};
