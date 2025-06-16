import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { apiFind, apiList, apiExec, apiFields } from '../../../../api/crudapi';
import { cnpjMask } from '../../../../utils/cnpjMask';
import { formatNumber } from '../../../../utils/formatNumber';
import { getImageUrl } from '../../../../utils/crypto';

export const PrecontratoReport = (precontrato) => {
  let imageURL = '';
  getImageUrl('data:image/png;base64,' + sessionStorage.getItem('logoempresa')).then((url) => {
    imageURL = url;
    apiFind('PrecontratoReportVW', '*', '', "codigo = '" + precontrato + "' ").then((response) => {
      if (response.status === 200) {
        const cabecalho = response.data;
        console.log('cabecalho', cabecalho);
        apiList('PrecontratoComissaoReportVW', 'tipo,comissao', '', "codigo = '" + precontrato + "' order by tipo").then((response) => {
          if (response.status === 200) {
            const listComissao = response.data;
            console.log('comissao', listComissao);
            apiExec("SP02258 '" + precontrato + "', 'O' ", 'S').then((response) => {
              if (response.status === 200) {
                const equipOriginal = response.data;
                console.log('equiporiginal', equipOriginal);
                apiExec("SP02258 '" + precontrato + "', 'S' ", 'S').then((response) => {
                  if (response.status === 200) {
                    const equipSubst = response.data;
                    console.log('equipsubst', equipSubst);
                    apiExec("SP02259 '" + precontrato + "', 'O' ", 'S').then((response) => {
                      if (response.status === 200) {
                        const equipOriginal2 = response.data;
                        console.log('equiporiginal2', equipOriginal2);
                        const uniqueNames = [...new Set(equipOriginal2.map((item) => item.nometipo))].sort();
                        apiExec("SP02259 '" + precontrato + "', 'S' ", 'S').then((response) => {
                          if (response.status === 200) {
                            const equipSubst2 = response.data;
                            apiFields(
                              'PrecontratoHistoricoVW',
                              '*',
                              '',
                              "TB02266_CODIGO = '" + precontrato + "' order by TB02266_DATA DESC"
                            ).then((response) => {
                              if (response.status === 200) {
                                let listHistorico = response.data;
                                let totContratada = 0;
                                let totAprovada = 0;
                                let totLiberada = 0;
                                let totValor = 0;
                                const docDefinition = {
                                  pageOrientation: 'landscape', // Orientação da página
                                  content: [
                                    {
                                      style: 'header',
                                      columns: [
                                        {
                                          image: imageURL,
                                          width: 200, // Ajuste o tamanho da imagem conforme necessário
                                          height: 120, // Ajuste o tamanho da imagem conforme necessário,
                                          alignment: 'left'
                                        }
                                      ]
                                    },
                                    {
                                      style: 'tableHeader',
                                      columns: [
                                        {
                                          text: 'Resumo Pré-Contrato : ' + precontrato,
                                          style: 'headerTitle',
                                          alignment: 'left',
                                          margin: [0, 0]
                                        }
                                      ]
                                    },
                                    {
                                      columns: [
                                        {
                                          text: 'INFORMAÇÕES CONTRATUAIS : ',
                                          style: 'lineBlack',
                                          margin: [0, 10, 5, 0],
                                          width: '40%'
                                        },

                                        {
                                          text: 'INFORMAÇÕES CADASTRAIS : ',
                                          style: 'lineBlack',
                                          margin: [10, 10, 5, 0],
                                          width: '30%'
                                        },
                                        {
                                          text: 'COMISSÃO : ',
                                          style: 'lineBlack',
                                          margin: [10, 10, 5, 0],
                                          width: '30%'
                                        }
                                      ]
                                    },
                                    {
                                      columns: [
                                        {
                                          width: '40%',
                                          table: {
                                            widths: ['30%', '70%'], // Larguras das colunas
                                            body: [
                                              [
                                                { text: 'CONTRATADA :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: cabecalho.nomeemp, style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ],
                                              [
                                                { text: 'CONSULTOR :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: cabecalho.nomeven, style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ],
                                              [
                                                { text: 'CONTRATANTE :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: cabecalho.nomecli, style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ],
                                              [
                                                { text: 'FANTASIA :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: cabecalho.fantasia, style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ],
                                              [
                                                { text: 'CNPJ :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: cnpjMask(cabecalho.cnpj), style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ],
                                              [
                                                { text: 'R$ CONTRATO :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                {
                                                  text: formatNumber(cabecalho.valor),
                                                  style: 'lineSimple',
                                                  alignment: 'right',
                                                  margin: [5, 5]
                                                }
                                              ]
                                            ]
                                          },
                                          layout: {
                                            hLineWidth: () => 1, // Espessura das linhas horizontais
                                            vLineWidth: () => 1, // Espessura das linhas verticais
                                            hLineColor: () => '#000000', // Cor das linhas horizontais
                                            vLineColor: () => '#000000' // Cor das linhas verticais
                                          }
                                        },

                                        {
                                          width: '30%',
                                          margin: [10, 0],
                                          table: {
                                            widths: ['50%', '50%'], // Larguras das colunas
                                            body: [
                                              [
                                                { text: 'Nº CONTRATO :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: cabecalho.contrato, style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ],
                                              [
                                                { text: 'DATA INÍCIO :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: cabecalho.dtinicio, style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ],
                                              [
                                                { text: 'DURAÇÃO (MESES) :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: cabecalho.duracao, style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ],
                                              [
                                                { text: 'VIGENTE ATÉ :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: cabecalho.venccontr, style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ]
                                            ]
                                          },
                                          layout: {
                                            hLineWidth: () => 1, // Espessura das linhas horizontais
                                            vLineWidth: () => 1, // Espessura das linhas verticais
                                            hLineColor: () => '#000000', // Cor das linhas horizontais
                                            vLineColor: () => '#000000' // Cor das linhas verticais
                                          }
                                        },
                                        {
                                          columns: [
                                            {
                                              width: '100%',
                                              margin: [10, 0],
                                              table: {
                                                headerRows: 1,
                                                widths: ['50%', '50%'], // Ajuste a largura das colunas conforme necessário
                                                body: [
                                                  // Cabeçalho da tabela
                                                  [
                                                    { text: 'TOTAL COMISSÃO :', style: 'lineBold', alignment: 'left', margin: [5, 5] },
                                                    {
                                                      text: formatNumber(cabecalho.totcomissao),
                                                      style: 'lineSimple',
                                                      alignment: 'right',
                                                      margin: [5, 5]
                                                    }
                                                  ],
                                                  // Corpo da tabela (mapeando os dados da lista)
                                                  ...listComissao.map((item) => [
                                                    { text: item.tipo, style: 'lineSimple', alignment: 'left', margin: [5, 5] },
                                                    {
                                                      text: formatNumber(item.comissao),
                                                      style: 'lineSimple',
                                                      alignment: 'right',
                                                      margin: [5, 5]
                                                    }
                                                  ])
                                                ]
                                              },
                                              layout: {
                                                hLineWidth: () => 1,
                                                vLineWidth: () => 1,
                                                hLineColor: () => '#000000',
                                                vLineColor: () => '#000000'
                                              }
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    {
                                      columns: [
                                        {
                                          text: 'RESUMO PARA CONTRATOS : ',
                                          style: 'lineBlack',
                                          margin: [0, 10, 5, 0],
                                          width: '40%'
                                        }
                                      ]
                                    },
                                    {
                                      columns: [
                                        {
                                          width: '100%',
                                          margin: [0, 0],
                                          table: {
                                            headerRows: 1,
                                            widths: ['5%', '9%', '5%', '8%', '32%', '7%', '7%', '27%'], // Ajuste a largura das colunas conforme necessário
                                            body: [
                                              [
                                                { text: 'CÓD', style: 'lineSimple', alignment: 'center' },
                                                { text: 'REFERÊNCIA', style: 'lineSimple', alignment: 'center' },
                                                { text: 'SIT.', style: 'lineSimple', alignment: 'left' },
                                                { text: 'CONTRATADA', style: 'lineSimple', alignment: 'center' },
                                                {
                                                  style: 'lineSimple',
                                                  alignment: 'center',
                                                  margin: [0, 5],
                                                  table: {
                                                    widths: ['14%', '28%', '17%', '20%', '21%'], // Ajuste as larguras das colunas conforme necessário
                                                    body: [
                                                      // Linha com texto acima das colunas
                                                      [
                                                        {
                                                          text: 'EQUIPAMENTOS VALIDADOS',
                                                          colSpan: 5, // O número total de colunas na tabela
                                                          style: 'lineSimple',
                                                          alignment: 'center'
                                                        },
                                                        {},
                                                        {},
                                                        {},
                                                        {}
                                                      ],
                                                      [
                                                        { text: 'CÓD', style: 'lineSimple', alignment: 'center' },
                                                        { text: 'REF.', style: 'lineSimple', alignment: 'center' },
                                                        { text: 'SIT.', style: 'lineSimple', alignment: 'left' },
                                                        { text: 'APROV.', style: 'lineSimple', alignment: 'center' },
                                                        { text: 'LIBERADA', style: 'lineSimple', alignment: 'center' }
                                                      ]
                                                    ]
                                                  },
                                                  layout: {
                                                    hLineWidth: () => 0, // Remova linhas horizontais, se necessário
                                                    vLineWidth: () => 0 // Remova linhas verticais, se necessário
                                                  }
                                                },
                                                { text: 'R$ FIXO', style: 'lineSimple', alignment: 'center' },
                                                { text: 'R$ TOTAL', style: 'lineSimple', alignment: 'center' },
                                                {
                                                  style: 'lineSimple',
                                                  alignment: 'center',
                                                  margin: [0, 5],
                                                  table: {
                                                    widths: ['25%', '25%', '25%', '25%'], // Ajuste as larguras das colunas conforme necessário
                                                    body: [
                                                      [
                                                        {
                                                          text: 'INFORMAÇÕES DE FRANQUIA / COPIAS',
                                                          colSpan: 4, // O número total de colunas na tabela
                                                          style: 'lineSimple',
                                                          alignment: 'center'
                                                        },
                                                        {},
                                                        {},
                                                        {}
                                                      ],
                                                      [
                                                        { text: 'TIPO.', style: 'lineSimple', alignment: 'left' },
                                                        { text: 'FRANQ.', style: 'lineSimple', alignment: 'center' },
                                                        { text: 'R$ FRANQ.', style: 'lineSimple', alignment: 'center' },
                                                        { text: 'R$ COPIA.', style: 'lineSimple', alignment: 'center' }
                                                      ]
                                                    ]
                                                  },
                                                  layout: {
                                                    hLineWidth: () => 0, // Remova linhas horizontais, se necessário
                                                    vLineWidth: () => 0 // Remova linhas verticais, se necessário
                                                  }
                                                }
                                              ],

                                              ...equipOriginal.map((item) => {
                                                // Filtrar os dados da lista equipSubst com base na condição produto2 = item.produto
                                                let substData = equipSubst.filter(
                                                  (subst) => subst.produto2 === item.produto && subst.idfranq === item.idfranq
                                                );
                                                if (item.qtaprovada !== 0 || item.qtliberada !== 0) {
                                                  substData = substData.concat(item);
                                                }

                                                totContratada += item.qtfechada;
                                                totValor += item.vlrfixo * item.qtfechada;
                                                substData.map((subst) => {
                                                  totAprovada += subst.qtaprovada;
                                                  totLiberada += subst.qtliberada;
                                                });

                                                // Criar uma tabela para os dados filtrados
                                                const substTable = {
                                                  table: {
                                                    widths: ['14%', '28%', '14%', '22%', '22%'], // Ajuste as larguras das colunas conforme necessário
                                                    body: [
                                                      ...substData.map((subst) => [
                                                        { text: subst.produto, style: 'lineSimple', alignment: 'center' },
                                                        { text: subst.referencia, style: 'lineSimple', alignment: 'left' },
                                                        { text: subst.nomesit, style: 'lineSimple', alignment: 'left' },
                                                        { text: subst.qtaprovada, style: 'lineSimple', alignment: 'right' },
                                                        { text: subst.qtliberada, style: 'lineSimple', alignment: 'right' }
                                                      ])
                                                    ]
                                                  },
                                                  layout: {
                                                    hLineWidth: () => 0,
                                                    vLineWidth: () => 0
                                                  }
                                                };

                                                let franqData = [];
                                                let item2 = {};
                                                if (item.franqtotal + item.vlrfranqtotal + item.vlrunittotal > 0) {
                                                  item2['tipo'] = 'TOTAL';
                                                  item2['franq'] = item.franqtotal;
                                                  item2['vlrfranq'] = item.vlrfranqtotal;
                                                  item2['vlrunit'] = item.vlrunittotal;
                                                  franqData = franqData.concat(item2);
                                                }
                                                item2 = {};
                                                if (item.franqpb + item.vlrfranqpb + item.vlrunitpb > 0) {
                                                  item2['tipo'] = 'A4 MONO';
                                                  item2['franq'] = item.franqpb;
                                                  item2['vlrfranq'] = item.vlrfranqpb;
                                                  item2['vlrunit'] = item.vlrunitpb;
                                                  franqData = franqData.concat(item2);
                                                }
                                                item2 = {};
                                                if (item.franqcolor + item.vlrfranqcolor + item.vlrunitcolor > 0) {
                                                  item2['tipo'] = 'A4 COLOR';
                                                  item2['franq'] = item.franqcolor;
                                                  item2['vlrfranq'] = item.vlrfranqcolor;
                                                  item2['vlrunit'] = item.vlrunitcolor;
                                                  franqData = franqData.concat(item2);
                                                }
                                                item2 = {};
                                                if (item.franqdg + item.vlrfranqdg + item.vlrunitdg > 0) {
                                                  item2['tipo'] = 'DIGIT.';
                                                  item2['franq'] = item.franqdg;
                                                  item2['vlrfranq'] = item.vlrfranqdg;
                                                  item2['vlrunit'] = item.vlrunitdg;
                                                  franqData = franqData.concat(item2);
                                                }
                                                item2 = {};
                                                if (item.franqgf + item.vlrfranqgf + item.vlrunitgf > 0) {
                                                  item2['tipo'] = 'A3 MONO';
                                                  item2['franq'] = item.franqgf;
                                                  item2['vlrfranq'] = item.vlrfranqgf;
                                                  item2['vlrunit'] = item.vlrunitgf;
                                                  franqData = franqData.concat(item2);
                                                }
                                                item2 = {};
                                                if (item.franqgfc + item.vlrfranqgfc + item.vlrunitgfc > 0) {
                                                  item2['tipo'] = 'A3 COLOR';
                                                  item2['franq'] = item.franqgfc;
                                                  item2['vlrfranq'] = item.vlrfranqgfc;
                                                  item2['vlrunit'] = item.vlrunitgfc;
                                                  franqData = franqData.concat(item2);
                                                }

                                                const franqTable = {
                                                  table: {
                                                    widths: ['25%', '25%', '25%', '25%'], // Ajuste as larguras das colunas conforme necessário
                                                    body: [
                                                      ...franqData.map((franq) => [
                                                        { text: franq.tipo, style: 'lineSimple', alignment: 'left' },
                                                        { text: franq.franq, style: 'lineSimple', alignment: 'right' },
                                                        { text: formatNumber(franq.vlrfranq), style: 'lineSimple', alignment: 'right' },
                                                        { text: formatNumber(franq.vlrunit, 5), style: 'lineSimple', alignment: 'right' }
                                                      ])
                                                    ]
                                                  },
                                                  layout: {
                                                    hLineWidth: () => 0,
                                                    vLineWidth: () => 0
                                                  }
                                                };
                                                return [
                                                  { text: item.produto, style: 'lineSimple', alignment: 'center' },
                                                  { text: item.referencia, style: 'lineSimple', alignment: 'left' },
                                                  { text: item.nomesit, style: 'lineSimple', alignment: 'left' },
                                                  { text: item.qtfechada, style: 'lineSimple', alignment: 'right' },
                                                  substData.length > 0 ? substTable : { text: '', style: 'lineSimple', alignment: 'left' },
                                                  { text: formatNumber(item.vlrfixo), style: 'lineSimple', alignment: 'right' },
                                                  {
                                                    text: formatNumber(item.vlrfixo * item.qtfechada),
                                                    style: 'lineSimple',
                                                    alignment: 'right'
                                                  },
                                                  franqData.length > 0 ? franqTable : { text: '', style: 'lineSimple', alignment: 'left' }
                                                ];
                                              })
                                            ]
                                          },
                                          layout: {
                                            hLineWidth: () => 1,
                                            vLineWidth: () => 1,
                                            hLineColor: () => '#000000',
                                            vLineColor: () => '#000000'
                                          }
                                        }
                                      ]
                                    },
                                    {
                                      columns: [
                                        {
                                          width: '100%',
                                          margin: [0, 5],
                                          table: {
                                            widths: ['15%', '10%', '15%', '10%', '15%', '10%', '15%', '10%'], // Larguras das colunas
                                            body: [
                                              [
                                                { text: 'TOTAL CONTRATADA :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: totContratada, style: 'lineSimple', alignment: 'right', margin: [5, 5] },

                                                { text: 'TOTAL APROVADA :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: totAprovada, style: 'lineSimple', alignment: 'right', margin: [5, 5] },

                                                { text: 'TOTAL LIBERADA :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: totLiberada, style: 'lineSimple', alignment: 'right', margin: [5, 5] },

                                                { text: 'VALOR TOTAL :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                                { text: formatNumber(totValor), style: 'lineSimple', alignment: 'right', margin: [5, 5] }
                                              ]
                                            ]
                                          },
                                          layout: {
                                            hLineWidth: () => 1, // Espessura das linhas horizontais
                                            vLineWidth: () => 1, // Espessura das linhas verticais
                                            hLineColor: () => '#000000', // Cor das linhas horizontais
                                            vLineColor: () => '#000000' // Cor das linhas verticais
                                          }
                                        }
                                      ]
                                    },
                                    {
                                      columns: [
                                        {
                                          width: '100%',
                                          margin: [0, 5],
                                          table: {
                                            widths: ['100%'], // Define uma única coluna com largura dinâmica
                                            body: [
                                              [
                                                {
                                                  stack: [
                                                    { text: 'OBSERVAÇÕES : ', style: 'lineBlack' },
                                                    { text: cabecalho.obs, style: 'lineSimple', margin: [0, 5, 0, 0] } // Texto adicional
                                                  ]
                                                }
                                              ]
                                            ]
                                          },
                                          hLineWidth: () => 1,
                                          vLineWidth: () => 1,
                                          hLineColor: () => '#000000',
                                          vLineColor: () => '#000000'
                                        }
                                      ]
                                    },
                                    uniqueNames.map((tipoEquip) => {
                                      totContratada = 0;
                                      totAprovada = 0;
                                      totLiberada = 0;
                                      totValor = 0;
                                      const itemTable = {
                                        columns: [
                                          {
                                            width: '100%',
                                            margin: [0, 5],
                                            table: {
                                              headerRows: 1,
                                              widths: ['5%', '9%', '5%', '8%', '32%', '7%', '7%', '27%'], // Ajuste a largura das colunas conforme necessário
                                              body: [
                                                [
                                                  {
                                                    text: tipoEquip,
                                                    colSpan: 8, // O número total de colunas na tabela
                                                    style: 'lineBlack',
                                                    alignment: 'left'
                                                  },
                                                  {},
                                                  {},
                                                  {},
                                                  {},
                                                  {},
                                                  {},
                                                  {}
                                                ],
                                                [
                                                  { text: 'CÓD', style: 'lineSimple', alignment: 'center' },
                                                  { text: 'REFERÊNCIA', style: 'lineSimple', alignment: 'center' },
                                                  { text: 'SIT.', style: 'lineSimple', alignment: 'left' },
                                                  { text: 'CONTRATADA', style: 'lineSimple', alignment: 'center' },
                                                  {
                                                    style: 'lineSimple',
                                                    alignment: 'center',
                                                    margin: [0, 5],
                                                    table: {
                                                      widths: ['14%', '28%', '17%', '20%', '21%'], // Ajuste as larguras das colunas conforme necessário
                                                      body: [
                                                        // Linha com texto acima das colunas
                                                        [
                                                          {
                                                            text: 'EQUIPAMENTOS VALIDADOS',
                                                            colSpan: 5, // O número total de colunas na tabela
                                                            style: 'lineSimple',
                                                            alignment: 'center'
                                                          },
                                                          {},
                                                          {},
                                                          {},
                                                          {}
                                                        ],
                                                        [
                                                          { text: 'CÓD', style: 'lineSimple', alignment: 'center' },
                                                          { text: 'REF.', style: 'lineSimple', alignment: 'center' },
                                                          { text: 'SIT.', style: 'lineSimple', alignment: 'left' },
                                                          { text: 'APROV.', style: 'lineSimple', alignment: 'center' },
                                                          { text: 'LIBERADA', style: 'lineSimple', alignment: 'center' }
                                                        ]
                                                      ]
                                                    },
                                                    layout: {
                                                      hLineWidth: () => 0, // Remova linhas horizontais, se necessário
                                                      vLineWidth: () => 0 // Remova linhas verticais, se necessário
                                                    }
                                                  },
                                                  { text: 'R$ FIXO', style: 'lineSimple', alignment: 'center' },
                                                  { text: 'R$ TOTAL', style: 'lineSimple', alignment: 'center' },
                                                  {
                                                    style: 'lineSimple',
                                                    alignment: 'center',
                                                    margin: [0, 5],
                                                    table: {
                                                      widths: ['25%', '25%', '25%', '25%'], // Ajuste as larguras das colunas conforme necessário
                                                      body: [
                                                        [
                                                          {
                                                            text: 'INFORMAÇÕES DE FRANQUIA / COPIAS',
                                                            colSpan: 4, // O número total de colunas na tabela
                                                            style: 'lineSimple',
                                                            alignment: 'center'
                                                          },
                                                          {},
                                                          {},
                                                          {}
                                                        ],
                                                        [
                                                          { text: 'TIPO.', style: 'lineSimple', alignment: 'left' },
                                                          { text: 'FRANQ.', style: 'lineSimple', alignment: 'center' },
                                                          { text: 'R$ FRANQ.', style: 'lineSimple', alignment: 'center' },
                                                          { text: 'R$ COPIA.', style: 'lineSimple', alignment: 'center' }
                                                        ]
                                                      ]
                                                    },
                                                    layout: {
                                                      hLineWidth: () => 0, // Remova linhas horizontais, se necessário
                                                      vLineWidth: () => 0 // Remova linhas verticais, se necessário
                                                    }
                                                  }
                                                ],

                                                ...equipOriginal2
                                                  .filter((item) => {
                                                    // Coloque a condição do filtro aqui
                                                    return item.nometipo === tipoEquip; // Exemplo: filtrar itens com quantidades aprovadas ou liberadas maiores que zero
                                                  })
                                                  .map((item, index) => {
                                                    // Filtrar os dados da lista equipSubst com base na condição produto2 = item.produto
                                                    let substData = equipSubst2.filter(
                                                      (subst) => subst.produto2 === item.produto && subst.idfranq === item.idfranq
                                                    );
                                                    if (item.qtaprovada !== 0 || item.qtliberada !== 0) {
                                                      substData = substData.concat(item);
                                                    }

                                                    totContratada += item.qtfechada;
                                                    totValor += item.vlrfixo * item.qtfechada;
                                                    substData.map((subst) => {
                                                      totAprovada += subst.qtaprovada;
                                                      totLiberada += subst.qtliberada;
                                                    });

                                                    // Criar uma tabela para os dados filtrados
                                                    const substTable = {
                                                      table: {
                                                        widths: ['14%', '28%', '14%', '22%', '22%'], // Ajuste as larguras das colunas conforme necessário
                                                        body: [
                                                          ...substData.map((subst) => [
                                                            { text: subst.produto, style: 'lineSimple', alignment: 'center' },
                                                            { text: subst.referencia, style: 'lineSimple', alignment: 'left' },
                                                            { text: subst.nomesit, style: 'lineSimple', alignment: 'left' },
                                                            { text: subst.qtaprovada, style: 'lineSimple', alignment: 'right' },
                                                            { text: subst.qtliberada, style: 'lineSimple', alignment: 'right' }
                                                          ])
                                                        ]
                                                      },
                                                      layout: {
                                                        hLineWidth: () => 0,
                                                        vLineWidth: () => 0
                                                      }
                                                    };

                                                    let franqData = [];
                                                    let item2 = {};
                                                    if (item.franqtotal + item.vlrfranqtotal + item.vlrunittotal > 0) {
                                                      item2['tipo'] = 'TOTAL';
                                                      item2['franq'] = item.franqtotal;
                                                      item2['vlrfranq'] = item.vlrfranqtotal;
                                                      item2['vlrunit'] = item.vlrunittotal;
                                                      franqData = franqData.concat(item2);
                                                    }
                                                    item2 = {};
                                                    if (item.franqpb + item.vlrfranqpb + item.vlrunitpb > 0) {
                                                      item2['tipo'] = 'A4 MONO';
                                                      item2['franq'] = item.franqpb;
                                                      item2['vlrfranq'] = item.vlrfranqpb;
                                                      item2['vlrunit'] = item.vlrunitpb;
                                                      franqData = franqData.concat(item2);
                                                    }
                                                    item2 = {};
                                                    if (item.franqcolor + item.vlrfranqcolor + item.vlrunitcolor > 0) {
                                                      item2['tipo'] = 'A4 COLOR';
                                                      item2['franq'] = item.franqcolor;
                                                      item2['vlrfranq'] = item.vlrfranqcolor;
                                                      item2['vlrunit'] = item.vlrunitcolor;
                                                      franqData = franqData.concat(item2);
                                                    }
                                                    item2 = {};
                                                    if (item.franqdg + item.vlrfranqdg + item.vlrunitdg > 0) {
                                                      item2['tipo'] = 'DIGIT.';
                                                      item2['franq'] = item.franqdg;
                                                      item2['vlrfranq'] = item.vlrfranqdg;
                                                      item2['vlrunit'] = item.vlrunitdg;
                                                      franqData = franqData.concat(item2);
                                                    }
                                                    item2 = {};
                                                    if (item.franqgf + item.vlrfranqgf + item.vlrunitgf > 0) {
                                                      item2['tipo'] = 'A3 MONO';
                                                      item2['franq'] = item.franqgf;
                                                      item2['vlrfranq'] = item.vlrfranqgf;
                                                      item2['vlrunit'] = item.vlrunitgf;
                                                      franqData = franqData.concat(item2);
                                                    }
                                                    item2 = {};
                                                    if (item.franqgfc + item.vlrfranqgfc + item.vlrunitgfc > 0) {
                                                      item2['tipo'] = 'A3 COLOR';
                                                      item2['franq'] = item.franqgfc;
                                                      item2['vlrfranq'] = item.vlrfranqgfc;
                                                      item2['vlrunit'] = item.vlrunitgfc;
                                                      franqData = franqData.concat(item2);
                                                    }

                                                    const franqTable = {
                                                      table: {
                                                        widths: ['25%', '25%', '25%', '25%'], // Ajuste as larguras das colunas conforme necessário
                                                        body: [
                                                          ...franqData.map((franq) => [
                                                            { text: franq.tipo, style: 'lineSimple', alignment: 'left' },
                                                            { text: franq.franq, style: 'lineSimple', alignment: 'right' },
                                                            { text: formatNumber(franq.vlrfranq), style: 'lineSimple', alignment: 'right' },
                                                            {
                                                              text: formatNumber(franq.vlrunit, 5),
                                                              style: 'lineSimple',
                                                              alignment: 'right'
                                                            }
                                                          ])
                                                        ]
                                                      },
                                                      layout: {
                                                        hLineWidth: () => 0,
                                                        vLineWidth: () => 0
                                                      }
                                                    };

                                                    return [
                                                      { text: item.produto, style: 'lineSimple', alignment: 'center' },
                                                      { text: item.referencia, style: 'lineSimple', alignment: 'left' },
                                                      { text: item.nomesit, style: 'lineSimple', alignment: 'left' },
                                                      { text: item.qtfechada, style: 'lineSimple', alignment: 'right' },
                                                      substData.length > 0
                                                        ? substTable
                                                        : { text: '', style: 'lineSimple', alignment: 'left' },
                                                      { text: formatNumber(item.vlrfixo), style: 'lineSimple', alignment: 'right' },
                                                      {
                                                        text: formatNumber(item.vlrfixo * item.qtfechada),
                                                        style: 'lineSimple',
                                                        alignment: 'right'
                                                      },
                                                      franqData.length > 0
                                                        ? franqTable
                                                        : { text: '', style: 'lineSimple', alignment: 'left' }
                                                    ];
                                                  })
                                              ]
                                            },
                                            layout: {
                                              hLineWidth: () => 1,
                                              vLineWidth: () => 1,
                                              hLineColor: () => '#000000',
                                              vLineColor: () => '#000000'
                                            }
                                          }
                                        ]
                                      };

                                      const totalTable = {
                                        table: {
                                          widths: ['15%', '10%', '15%', '10%', '15%', '10%', '15%', '10%'], // Larguras das colunas
                                          body: [
                                            [
                                              { text: 'TOTAL CONTRATADA :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                              { text: totContratada, style: 'lineSimple', alignment: 'right', margin: [5, 5] },

                                              { text: 'TOTAL APROVADA :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                              { text: totAprovada, style: 'lineSimple', alignment: 'right', margin: [5, 5] },

                                              { text: 'TOTAL LIBERADA :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                              { text: totLiberada, style: 'lineSimple', alignment: 'right', margin: [5, 5] },

                                              { text: 'VALOR TOTAL :', style: 'lineBold', alignment: 'right', margin: [5, 5] },
                                              { text: formatNumber(totValor), style: 'lineSimple', alignment: 'right', margin: [5, 5] }
                                            ]
                                          ]
                                        },
                                        layout: {
                                          hLineWidth: () => 1,
                                          vLineWidth: () => 1,
                                          hLineColor: () => '#000000',
                                          vLineColor: () => '#000000'
                                        }
                                      };
                                      return [itemTable, totalTable];
                                    }),
                                    {
                                      columns: [
                                        {
                                          text: 'HISTÓRICO : ',
                                          style: 'lineBlack',
                                          margin: [0, 10, 5, 0],
                                          width: '40%'
                                        }
                                      ]
                                    },
                                    {
                                      columns: [
                                        {
                                          width: '100%',
                                          margin: [0, 0],
                                          table: {
                                            headerRows: 1,
                                            widths: ['15%', '15%', '10%', '20%', '40%'], // Ajuste a largura das colunas conforme necessário
                                            body: [
                                              // Cabeçalho da tabela
                                              [
                                                { text: 'DATA', style: 'lineSimple', alignment: 'left', margin: [5, 5] },
                                                { text: 'USUÁRIO', style: 'lineSimple', alignment: 'left', margin: [5, 5] },
                                                { text: 'STATUS', style: 'lineSimple', alignment: 'left', margin: [5, 5] },
                                                { text: 'DESCRIÇÃO', style: 'lineSimple', alignment: 'left', margin: [5, 5] },
                                                { text: 'OBS', style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ],
                                              // Corpo da tabela (mapeando os dados da lista)
                                              ...listHistorico.map((item) => [
                                                { text: item.TB02266_DATA, style: 'lineSimple', alignment: 'left', margin: [5, 5] },
                                                { text: item.TB02266_USER, style: 'lineSimple', alignment: 'left', margin: [5, 5] },
                                                { text: item.TB02266_STATUS, style: 'lineSimple', alignment: 'left', margin: [5, 5] },
                                                { text: item.TB01136_NOME, style: 'lineSimple', alignment: 'left', margin: [5, 5] },
                                                { text: item.TB02266_OBS, style: 'lineSimple', alignment: 'left', margin: [5, 5] }
                                              ])
                                            ]
                                          },
                                          layout: {
                                            hLineWidth: () => 1,
                                            vLineWidth: () => 1,
                                            hLineColor: () => '#000000',
                                            vLineColor: () => '#000000'
                                          }
                                        }
                                      ]
                                    }
                                  ],
                                  footer: (currentPage, pageCount) => {
                                    return [
                                      {
                                        text: `Página ${currentPage} de ${pageCount}`,
                                        alignment: 'right',
                                        fontSize: 9,
                                        margin: [0, 10, 20, 0]
                                      },
                                      {
                                        text: 'Copyright © 2024 by DataBit Tecnologia e Sistemas LTDA. All rights reserved',
                                        alignment: 'center',
                                        margin: [0, 2, 0, 0],
                                        fontSize: 9
                                      }
                                    ];
                                  },
                                  styles: {
                                    headerTitle: {
                                      fontSize: 14,
                                      bold: true,
                                      alignment: 'center'
                                    },
                                    lineBold: {
                                      fontSize: 9,
                                      bold: true
                                    },
                                    lineSimple: {
                                      fontSize: 8
                                    },
                                    lineBlack: {
                                      fontSize: 10,
                                      bold: true,
                                      color: '#fff',
                                      background: '#000'
                                    }
                                  }
                                };
                                pdfMake.createPdf(docDefinition).open();
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
};
