import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../../components/CreateObject';
import AGGrid from '../../../../../../components/AGGrid';
import { apiInsert, apiFind, apiIDTable, apiUpdate } from '../../../../../../api/crudapi';
import { Confirmation } from '../../../../../../components/Confirmation';
import { Decode64 } from '../../../../../../utils/crypto';
import { addCodigo } from '../../../../../../utils/codigo/codigo';

const GmoResumoRequisicao = (props) => {
  const { shoreq, setShowreq } = props;
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
  const [statusinicial, setStatusinicial] = React.useState('00');
  const [tabelacod, setTabelacod] = React.useState('TB02018');
  const [operacaoven, setOperacaoven] = React.useState(1);

  const [condicao, setCondicao] = React.useState('000');
  const [vendedor, setVendedor] = React.useState('0000');
  const [tecnico, setTecnico] = React.useState('0000');
  const [codigoreq, setCodigoreq] = React.useState('');
  const [siteatual, setSiteatual] = React.useState('');
  const [nomestatus, setNomestatus] = React.useState('');
  const [tabela, setTabela] = React.useState('');

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'precontrato', headerName: 'Pré', width: 80 },
      { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 116, type: 'date' },
      { headerClassName: 'header-list', field: 'produto', headerName: 'Cód.', width: 70 },
      { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 120 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Modelo Equipamento', width: 340 },
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
        tabelaref: 'TB01022',
        widthname: 59,
        disabled: valuesdisable[0],
        filteraux:
          " AND TB01022_REMESSA = 'S' AND TB01022_CODIGO IN (SELECT TB01046_TIPODESC FROM TB01046 WHERE TB01046_CODEMP = '" +
          props.codemp +
          "') "
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
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      dadosOperacao();
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
      itemcont['tabela'] = tabelacod;
      itemcont['cod'] = codigomaior;
      apiUpdate('Contador', itemcont).then((response) => {
        if (response.status === 200) {
          valuesfield[1] = 'Operação realizada com Sucesso !' + '\n';
          setValuesfield([...valuesfield]);
        }
      });
    }
  }, [codigoreq]);

  const listarSites = async () => {
    valuesfield[1] = '';
    setValuesfield([...valuesfield]);
    sitescod.forEach((item) => {
      setSiteatual(item.site);
      apiFind('ContratoSite', 'TB02176_NOME', '', "TB02176_CODIGO = '" + item.site + "' ").then((response) => {
        if (response.status === 200) {
          let nomesite = response.data.nome;
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
          itemreq['dataexec'] = dataatual;
          itemreq['codemp'] = props.codemp;
          itemreq['codcli'] = props.contrato.codcli;
          itemreq['vend'] = vendedor;
          itemreq['tipodesc'] = valuesfield[0];
          itemreq['dtvalidade'] = dataatual;
          itemreq['condpag'] = condicao;
          itemreq['status'] = statusinicial;
          itemreq['situacao'] = 'A';
          itemreq['operacao'] = operacaoven;
          itemreq['horastrab'] = '00:00';
          itemreq['horascom'] = '00:00';
          itemreq['horasfim'] = '00:00';
          itemreq['codtec'] = tecnico;
          itemreq['contrato'] = props.contrato.contrato;
          itemreq['codsite'] = item.site;
          itemreq['precontrato'] = item.precontrato;
          itemreq['obs'] = 'Requisição gerada pelo DATACLIENT';
          apiInsert('Orcamento', itemreq).then((response) => {
            if (response.status === 200) {
              try {
                let numreq = response.data.id;
                valuesfield[1] = valuesfield[1] + response.data.mensagem + '\n';
                setValuesfield([...valuesfield]);
                let itemhist = {};
                itemhist['codcad'] = props.contrato.codcli;
                itemhist['codemp'] = props.codemp;
                itemhist['codigo'] = numreq;
                itemhist['status'] = statusinicial;
                itemhist['tipo'] = 'V';
                itemhist['user'] = Decode64(sessionStorage.getItem('user'));
                itemhist['nome'] = nomestatus;
                itemhist['obs'] = 'Requisição gerada pelo DATACLIENT';
                apiInsert('Historico', itemhist).then((response) => {
                  if (response.status === 200) {
                    valuesfield[1] = valuesfield[1] + response.data.mensagem + '\n';
                    setValuesfield([...valuesfield]);
                    let itens = rowsselec.filter((listaprod) => listaprod.codsite === item.site);
                    itens.forEach((listaprod) => {
                      let itemprod = {};
                      itemprod['codemp'] = props.codemp;
                      itemprod['codigo'] = numreq;
                      itemprod['produto'] = listaprod.produto;
                      itemprod['custo'] = listaprod.custo;
                      itemprod['custocompra'] = listaprod.custocompra;
                      itemprod['qtprod'] = listaprod.qtlanc;
                      itemprod['prunit'] = listaprod.custo;
                      itemprod['totvalor'] = listaprod.custo * listaprod.qtlanc;
                      itemprod['tabela'] = tabela;
                      itemprod['situacao'] = 'A';
                      itemprod['tipodesc'] = valuesfield[0];
                      apiInsert('OrcamentoItem', itemprod).then((response) => {
                        if (response.status === 200) {
                          valuesfield[1] = valuesfield[1] + response.data.mensagem + '\n';
                          setValuesfield([...valuesfield]);
                        }
                      });
                    });
                  }
                });
              } catch (error) {
                valuesfield[1] = valuesfield[1] + error + '\n';
                setValuesfield([...valuesfield]);
              }
            }
          });
        }
      });
      setGerado(true);
    });
  };

  const Gerar = async () => {
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmrequisicao', 'Confirma a geração de Requisições ?').then((result) => {
        if (result.isConfirmed) {
          listarSites();
        }
      });
    } else {
      setItemvariant(1);
      setMensagem('Operação é de preenchimento obrigatório !');
    }
  };

  const dadosOperacao = async () => {
    let tabela = '';
    const responseconfig = await apiFind(
      'Config',
      'TB00040_VENCOND,TB00040_VENVEN,TB00040_VENTEC,TB00040_INTCOND,TB00040_INTVEN,TB00040_INTTEC,TB00040_EXTCOND,TB00040_EXTVEN,TB00040_EXTTEC,TB00040_SISCOND,TB00040_SISVEN,TB00040_SISTEC,TB00040_IMPCOND,TB00040_IMPVEN,TB00040_IMPTEC,TB00040_PROCOND,TB00040_PROVEN,TB00040_PROTEC',
      '',
      ' 0=0 '
    );
    if (responseconfig.status === 200) {
      const configuracao = responseconfig.data;
      const responseoperacao = await apiFind('OperacaoStatus', '*', '', "TB01092_TIPODESC = '" + valuesfield[0] + "' ");
      if (responseoperacao.status === 200) {
        if (responseoperacao.data) {
          setStatusinicial(responseoperacao.data.statusinicial);
          let inicial = responseoperacao.data.statusinicial;
          setOperacaoven(responseoperacao.data.operacao);
          switch (responseoperacao.data.operacao) {
            case 1: {
              setTabelacod('TB02018');
              tabela = 'TB02018';
              setCondicao(configuracao.vencond);
              setVendedor(configuracao.venven);
              setTecnico(configuracao.ventec);
              break;
            }
            case 2: {
              setTabelacod('TB02018I');
              tabela = 'TB02018I';
              setCondicao(configuracao.intcond);
              setVendedor(configuracao.intven);
              setTecnico(configuracao.inttec);
              break;
            }
            case 3: {
              setTabelacod('TB02018E');
              tabela = 'TB02018E';
              setCondicao(configuracao.extcond);
              setVendedor(configuracao.extven);
              setTecnico(configuracao.exttec);
              break;
            }
            case 4: {
              setTabelacod('TB02018S');
              tabela = 'TB02018S';
              setCondicao(configuracao.siscond);
              setVendedor(configuracao.sisven);
              setTecnico(configuracao.sistec);
              break;
            }
            case 5: {
              setTabelacod('TB02018C');
              tabela = 'TB02018C';
              setCondicao(configuracao.impcond);
              setVendedor(configuracao.impven);
              setTecnico(configuracao.imptec);
              break;
            }
            case 6: {
              setTabelacod('TB02018P');
              tabela = 'TB02018P';
              setCondicao(configuracao.procond);
              setVendedor(configuracao.proven);
              setTecnico(configuracao.protec);
              break;
            }
            default: {
              setTabelacod('TB02018');
              tabela = 'TB02018';
              setCondicao(configuracao.vencond);
              setVendedor(configuracao.venven);
              setTecnico(configuracao.ventec);
              break;
            }
          }
          let seller = Decode64(sessionStorage.getItem('seller'));
          if (Decode64(sessionStorage.getItem('manager')) === 'N') {
            if (seller !== 'ZZZZ') {
              setVendedor(seller);
            }
          }

          const responsetable = await apiIDTable(tabela);
          if (responsetable.status === 200) {
            setCodigoreq(responsetable.data.mensagem);
            const responsestatus = await apiFind('Statusven', 'TB01021_NOME', '', "TB01021_CODIGO  = '" + inicial + "' ");
            if (responsestatus.status === 200) {
              setNomestatus(responsestatus.data.nome);
              const responsecli = await apiFind('Cliente', 'TB01008_CONCEITO', '', "TB01008_CODIGO = '" + props.contrato.codcli + "' ");
              if (responsecli.status === 200) {
                setTabela(responsecli.data.conceito);
              }
            }
          }
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div id="frmrequisicao" name="frmrequisicao">
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
            <Button id="btnFechar" className="btn btn-warning shadow-2 mb-2" onClick={(e) => setShowreq(false)}>
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

export default GmoResumoRequisicao;
