import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../../components/CreateObject';
import AGGrid from '../../../../../../components/AGGrid';
import { apiInsert, apiFind, apiIDTable, apiUpdate, apiExec, apiList } from '../../../../../../api/crudapi';
import { Confirmation } from '../../../../../../components/Confirmation';
import { Decode64 } from '../../../../../../utils/crypto';
import { addCodigo } from '../../../../../../utils/codigo/codigo';

const GmoResumoPedido = (props) => {
  const { precontrato } = props;
  const { showped, setShowped } = props;
  const { rows, setRows } = props;
  const { gerado, setGerado } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [rowsselec, setRowsselect] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [sites, setSites] = React.useState([]);
  const [sitescod, setSitescod] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [operacaocom, setOperacaocom] = React.useState();
  const [codigoreq, setCodigoreq] = React.useState('');
  const [nomestatus, setNomestatus] = React.useState('');
  const { seriaisSelecionados = [] } = props;

  useEffect(() => {
    console.log('[GmoResumoPedido] seriaisSelecionados recebidos:', seriaisSelecionados);
  }, [seriaisSelecionados]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'precontrato', headerName: 'Pré', width: 80 },
      { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 116, type: 'date' },
      { headerClassName: 'header-list', field: 'produto', headerName: 'Cód.', width: 70 },
      { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 120 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Modelo Equipamento', width: 330 },
      { headerClassName: 'header-list', field: 'site', headerName: 'Site', width: 286 },
      { headerClassName: 'header-list', field: 'qtlanc', headerName: 'Qt.Req.', width: 60, type: 'number' }
    ]);
    setValuesdisable([false, true]);
    setFields([
      {
        id: 0,
        campo: 'OPERACAO',
        funcao: 'Operação',
        tipo: 'varchar',
        nome: 'operacao',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 68,
        measure: '68rem',
        tabelaref: 'TB01078',
        widthname: 59,
        disabled: valuesdisable[0]
        //filteraux: " AND TB01078_CODIGO IN (SELECT TB01114_OPERACAO FROM TB01114 WHERE TB01114_CODEMP = '" + props.codemp + "') "
      },
      {
        id: 1,
        campo: 'LOG',
        funcao: 'Log de Processamento',
        tipo: 'varchar',
        nome: 'dest',
        tamanho: 8000,
        tipoobject: 6,
        widthfield: 48,
        measure: '48rem',
        charnormal: true,
        lines: 5,
        disabled: valuesdisable[1]
      }
    ]);

    let rowsbkp = rows.filter((element) => element.qtlanc > 0);
    setRowsselect(rowsbkp);
    let sitesbkp = [];
    let sitepre = '';
    rowsbkp.forEach((item) => {
      let sitepre2 = item.codsite + item.precontrato + ';';
      if (sitepre.indexOf(sitepre2) < 0) {
        sitepre = sitepre + sitepre2;
        let itempre = {};
        itempre['site'] = item.codsite;
        itempre['precontrato'] = item.precontrato;
        sitesbkp = sitesbkp.concat(itempre);
      }
    });
    setSites(sitesbkp);
  }, []);

  useEffect(() => {
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined && valuesfield[0] !== null) {
      apiFind('OperacaoCompra', '*', '', "TB01078_CODIGO = '" + valuesfield[0] + "' ").then((response) => {
        if (response.status === 200) {
          if (response.data) {
            setOperacaocom(response.data);
            const statusinicial = response.data.statusinicial;
            apiIDTable('TB02030').then((response) => {
              if (response.status === 200) {
                setCodigoreq(response.data.mensagem);
                apiFind('Statuscom', 'TB01039_NOME', '', "TB01039_CODIGO  = '" + statusinicial + "' ").then((response) => {
                  if (response.status === 200) {
                    setNomestatus(response.data.nome);
                  }
                });
              }
            });
          }
        }
      });
    }
  }, [valuesfield[0]]);

  useEffect(() => {
    if (codigoreq !== undefined && valuesfield[0] !== undefined && valuesfield[0] !== '') {
      let tmpsites = {};
      let listsites = [];
      let codigo = addCodigo(codigoreq);
      let codigomaior = codigoreq;
      sites.forEach((site) => {
        tmpsites = {};
        codigo = addCodigo(codigo);
        let codsite = site.site;
        let precontrato = site.precontrato;
        tmpsites['site'] = codsite;
        tmpsites['requisicao'] = codigo;
        tmpsites['precontrato'] = precontrato;
        listsites = listsites.concat(tmpsites);
        if (codigo > codigomaior) {
          codigomaior = codigo;
        }
      });
      setSitescod([...listsites]);
      const itemcont = {};
      itemcont['tabela'] = 'TB02030';
      itemcont['cod'] = codigomaior;
      apiUpdate('Contador', itemcont).then((response) => {
        if (response.status === 200) {
          valuesfield[1] = 'Operação realizada com Sucesso !' + '\n';
          setValuesfield([...valuesfield]);
        }
      });
    }
  }, [codigoreq]);

  const ListarSites = async () => {
    valuesfield[1] = '';
    setValuesfield([...valuesfield]);

    for (const item of sitescod) {
      const responsesite = await apiFind('ContratoSite', 'TB02176_NOME', '', "TB02176_CODIGO = '" + item.site + "' ");
      if (responsesite.status === 200) {
        const nomesite = responsesite.data.nome;
        const codclisite = responsesite.data.codcli;

        let codclifim = '';
        if (codclisite !== undefined && codclisite !== '' && codclisite !== null) {
          codclifim = codclisite;
        } else {
          codclifim = props.contrato.codcli;
        }

        const responsecad = await apiExec("EXEC SP01123 '" + codclifim + "','" + Decode64(sessionStorage.getItem('user')) + "' ", 'S');

        if (responsecad.status === 200) {
          const codfor = responsecad.data[0].CODFOR;
          valuesfield[1] =
            valuesfield[1] + 'Gerando Requisição Site: ' + item.site + '-' + nomesite + '  Pré-Conrato: ' + item.precontrato + '\n';
          setValuesfield([...valuesfield]);

          const tmdata1 = Date();
          const dt1 = new Date(tmdata1);
          const data1 = dt1.toLocaleDateString('en-US');
          const dataatual = data1 + ' 00:00:00';

          let itemreq = {};
          itemreq['codigo'] = item.requisicao;
          itemreq['data'] = dataatual;
          itemreq['codemp'] = props.codemp;
          itemreq['codfor'] = codfor;
          itemreq['opcom'] = valuesfield[0];
          itemreq['condpag'] = '000';
          itemreq['status'] = operacaocom.statusinicial;
          itemreq['situacao'] = 'A';
          itemreq['transp'] = '0000';
          itemreq['natureza'] = operacaocom.natureza;
          itemreq['contrato'] = props.contrato.contrato;
          itemreq['codsite'] = item.site;
          itemreq['precontrato'] = item.precontrato;
          itemreq['codcen'] = operacaocom.codcen;
          itemreq['codsub'] = operacaocom.codsub;
          itemreq['plancon'] = operacaocom.plancon;
          itemreq['devlocacao'] = 'S';
          itemreq['vlrfrete2'] = 0;
          itemreq['vlroutdesp2'] = 0;
          itemreq['baseicms2'] = 0;
          itemreq['vlricms2'] = 0;
          itemreq['obs'] = 'Requisição gerada pelo DATACLIENT';

          const responsepedido = await apiInsert('PedidoCompra', itemreq);

          if (responsepedido.status === 200) {
            try {
              let numreq = responsepedido.data.id;
              valuesfield[1] = valuesfield[1] + responsepedido.data.mensagem + '\n';
              setValuesfield([...valuesfield]);

              let itemhist = {};
              itemhist['codcad'] = codfor;
              itemhist['codemp'] = props.codemp;
              itemhist['codigo'] = numreq;
              itemhist['status'] = operacaocom.statusinicial;
              itemhist['tipo'] = 'C';
              itemhist['user'] = Decode64(sessionStorage.getItem('user'));
              itemhist['nome'] = nomestatus;
              itemhist['obs'] = 'Requisição gerada pelo DATACLIENT';

              const responsehistorico = await apiInsert('Historico', itemhist);
              if (responsehistorico.status === 200) {
                valuesfield[1] = valuesfield[1] + responsehistorico.data.mensagem + '\n';
                setValuesfield([...valuesfield]);

                let itens = rowsselec.filter((listaprod) => listaprod.codsite === item.site);
                let index = 1;

                for (const listaprod of itens) {
                  let itemprod = {};
                  itemprod['codemp'] = props.codemp;
                  itemprod['data'] = dataatual;
                  itemprod['codigo'] = numreq;
                  itemprod['produto'] = listaprod.produto;
                  itemprod['custo'] = listaprod.custo;
                  itemprod['custocompra'] = listaprod.custocompra;
                  itemprod['qtprod'] = listaprod.qtlanc;
                  itemprod['qtprodun'] = listaprod.qtlanc;
                  itemprod['prunit'] = listaprod.custo;
                  itemprod['totvalor'] = listaprod.custo * listaprod.qtlanc;
                  itemprod['opcom'] = valuesfield[0];
                  itemprod['situacao'] = 'A';
                  itemprod['unprod'] = listaprod.unprod;
                  itemprod['registro'] = index;
                  itemprod['cst'] = operacaocom.ccst === 'S' ? operacaocom.cst : listaprod.cst;
                  itemprod['icms'] = operacaocom.cicms === 'S' ? operacaocom.icms : listaprod.icms;
                  itemprod['baseicms'] = parseFloat(itemprod['icms']) > 0 ? parseFloat(itemprod['totvalor']) : 0;
                  itemprod['vlricms'] = ((parseFloat(itemprod['totvalor']) * parseFloat(itemprod['icms'])) / 100).toFixed(2);
                  itemprod['cstipi'] = operacaocom.ccstipi === 'S' ? operacaocom.cstipi : listaprod.cstipi;
                  itemprod['ipi'] = operacaocom.cipi === 'S' ? operacaocom.ipi : listaprod.ipi;
                  itemprod['vlripi'] = ((parseFloat(itemprod['totvalor']) * parseFloat(itemprod['ipi'])) / 100).toFixed(2);
                  itemprod['cstpis'] = operacaocom.ccstpis === 'S' ? operacaocom.cstpis : listaprod.cstpis;
                  itemprod['pis'] = operacaocom.cpis === 'S' ? operacaocom.aliqpis : listaprod.pis;
                  itemprod['cstcofins'] = operacaocom.ccstcofins === 'S' ? operacaocom.cstcofins : listaprod.cstcofins;
                  itemprod['cofins'] = operacaocom.ccofins === 'S' ? operacaocom.aliqcofins : listaprod.cofins;
                  itemprod['natureza'] = operacaocom.natureza;
                  itemprod['vlrfrete'] = 0;
                  itemprod['vlroutdesp'] = 0;
                  itemprod['dtent'] = dataatual;

                  const responseitem = await apiInsert('PedidoCompraItem', itemprod);
                  if (responseitem.status === 200) {
                    valuesfield[1] = valuesfield[1] + responseitem.data.mensagem + '\n';
                    setValuesfield([...valuesfield]);
                  }
                  index += 1;
                }
              }

              // 🔹 ATUALIZA APENAS OS SERIAIS SELECIONADOS (se houver) COM A REQUISIÇÃO GERADA (numreq)
              if (Array.isArray(props.seriaisSelecionados) && props.seriaisSelecionados.length > 0) {
                console.log('[DEBUG] Atualizando somente seriais selecionados para a requisição', numreq);
                for (const sel of props.seriaisSelecionados) {
                  // opcional: garantir que é do mesmo pré do loop atual
                  if (sel.precontrato === item.precontrato) {
                    const dadosselec = {
                      numserie: sel.numserie,
                      produto: sel.produto,
                      contrato: sel.contrato,
                      precontrato: sel.precontrato,
                      coditem: sel.coditem,
                      iditem: sel.iditem,
                      requisicao: numreq
                    };

                    try {
                      const upRes = await apiUpdate('PrecontratoDevolucao', dadosselec);
                      //console.log(upRes)
                      if (upRes?.status !== 200) {
                        console.warn('Falha ao atualizar serial selecionado:', sel, upRes);
                      } else {
                        console.log('Serial atualizado (selecionado):', sel.numserie, '=> req', numreq);
                      }
                    } catch (e) {
                      console.error('apiUpdate serial selecionado:', sel, e);
                    }
                  }
                }
              } else {
                console.log('Nenhum serial selecionado; mantendo fluxo original sem apiUpdate.');
              }

              const responseserial = await apiList(
                'PrecontratoDevolucaoVW',
                '*',
                '',
                "precontrato = '" + precontrato + "' and codsite = '" + item.site + "' "
              );

              if (responseserial.status === 200) {
                const seriais = responseserial.data;
                for (const serial of seriais) {
                  let saveserial = {
                    coditem: serial.coditem,
                    contrato: serial.contrato,
                    iditem: serial.iditem,
                    numserie: serial.numserie,
                    precontrato: serial.precontrato,
                    produto: serial.produto,
                    requisicao: numreq
                  };

                  const responseinsserial = await apiInsert('PedidoCompraEquip', saveserial);
                  if (responseinsserial.status === 200) {
                    valuesfield[1] += `Serial: ${serial.numserie}\n`;
                    setValuesfield([...valuesfield]);
                  }
                }
              }
            } catch (error) {
              valuesfield[1] = valuesfield[1] + error + '\n';
              setValuesfield([...valuesfield]);
            }
          }
        }
      }
    }

    setGerado(true);
  };

  const Gerar = async () => {
    console.log(valuesfield[0]);

    console.log('[GmoResumoPedido] Seriais selecionados no Pedido:', seriaisSelecionados);

    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmpedcom', 'Confirma a geração de Requisições ?').then((result) => {
        if (result.isConfirmed) {
          ListarSites();
        }
      });
    } else {
      setItemvariant(1);
      setMensagem('Operação é de preenchimento obrigatório !');
    }
  };

  return (
    <React.Fragment>
      <div id="frmpedcom" name="frmpedcom">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '10px' }}>
          <Card.Header>
            <Card.Title style={{ marginBottom: '10px' }} as="h5">
              Informações do Equipamentos selecionados
            </Card.Title>
          </Card.Header>
          <Row style={{ marginTop: '10px' }}>
            <AGGrid width="100%" height="233px" rows={rowsselec} columns={columns} loading={carregando}></AGGrid>
          </Row>
        </Card>
        <Card className="Recent-Users" style={{ marginBottom: '10px' }}>
          <Card.Header>
            <Card.Title style={{ marginBottom: '10px' }} as="h5">
              Geração e LOG
            </Card.Title>
          </Card.Header>

          <Row style={{ marginTop: '10px', marginLeft: '5px', marginRight: '5px', marginBottom: '10px' }}>
            {fields.map((field, index) => (
              <CreateObject
                key={index}
                field={field}
                index={field.id}
                fields={fields}
                valuesfield={valuesfield}
                setValuesfield={(data) => setValuesfield(data)}
                valuesfield2={valuesfield2}
                setValuesfield2={(data) => setValuesfield2(data)}
                disabled={valuesdisable[field.id]}
              ></CreateObject>
            ))}
          </Row>
        </Card>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            {rowsselec !== undefined && rowsselec.length > 0 && !gerado ? (
              <Button id="btnGerar" className="btn btn-success shadow-2 mb-2" onClick={(e) => Gerar()}>
                <i className={'feather icon-layers'} /> Gerar Requisições
              </Button>
            ) : (
              <></>
            )}
            <Button id="btnFechar" className="btn btn-warning shadow-2 mb-2" onClick={(e) => setShowped(false)}>
              <i className={'feather icon-x'} /> Fechar
            </Button>
          </Col>
        </Row>
        <Row>
          <Alert
            show={mensagem !== '' && mensagem !== undefined}
            dismissible
            variant={alertVariants[itemvariant]}
            onClick={() => setMensagem(undefined)}
          >
            {mensagem}
          </Alert>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default GmoResumoPedido;
