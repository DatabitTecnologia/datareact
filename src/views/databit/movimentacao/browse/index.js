import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button, Modal, ModalBody, Card, Alert } from 'react-bootstrap';
import AGGrid from '../../../../components/AGGrid';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFind, apiList, apiGetPicture } from '../../../../api/crudapi';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import TabelaMov from '../tabela';
import LancProd from '../lancprod';

const BrowseMov = (props) => {
  const { cabecalho, typeprice, tablemov, fieldslanc, fieldsimp, tableitem, classitem, entsai, coddest, tabdest, typestock, contabil } =
    props;
  const { eventsitem, setEventsitem } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [itemselec, setItemselec] = React.useState(undefined);
  const [itemnew, setItemnew] = React.useState(undefined);
  const [foto, setFoto] = React.useState();
  const [fields, setFields] = React.useState([]);
  const [fieldsinfor, setFieldsinfor] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesfieldinfor, setValuesfieldinfor] = React.useState([]);
  const [valuesfieldinfor2, setValuesfieldinfor2] = React.useState([]);
  const [config, setConfig] = React.useState([]);
  const [showbrowse, setShowbrowse] = React.useState(false);
  const [showselec, setShowselec] = React.useState(false);
  const [searchterm, setSearchterm] = useState('');
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [prodselec, setProdselec] = React.useState(undefined);
  const [showtabela, setShowtabela] = React.useState(false);
  const refDesc = useRef();

  useEffect(() => {
    apiFind('Config', 'TB00040_TABEMPRESA,TB00040_TIPODESC', '', '').then((response) => {
      if (response.status === 200) {
        setConfig(response.data);
      }
    });
  }, []);

  useEffect(() => {
    setFieldsinfor([
      {
        id: 0,
        campo: 'produto',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'produto',
        tamanho: 5,
        tipoobject: 1,
        widthfield: 6,
        measure: '6rem',
        disabled: true,
        invisible: false
      },
      {
        id: 1,
        campo: 'referencia',
        funcao: 'Referência',
        tipo: 'varchar',
        nome: 'referencia',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        invisible: false
      },
      {
        id: 2,
        campo: 'codbarras',
        funcao: 'Código Barras',
        tipo: 'varchar',
        nome: 'codbarras',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        invisible: false
      },
      {
        id: 3,
        campo: 'codauxiliar',
        funcao: 'Código Auxiliar',
        tipo: 'varchar',
        nome: 'codauxiliar',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        invisible: false
      },
      {
        id: 4,
        campo: 'nomeun',
        funcao: 'Unidade',
        tipo: 'varchar',
        nome: 'nomeun',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        invisible: false
      },
      {
        id: 5,
        campo: 'ncm',
        funcao: 'NCM',
        tipo: 'varchar',
        nome: 'ncm',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        invisible: false
      },
      {
        id: 6,
        campo: 'nomemarca',
        funcao: 'Descrição Marca',
        tipo: 'varchar',
        nome: 'nomemarca',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 27,
        measure: '27rem',
        disabled: true,
        invisible: false
      },
      {
        id: 7,
        campo: 'nomeproduto',
        funcao: 'Descrição Produto',
        tipo: 'varchar',
        nome: 'nomeproduto',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 43,
        measure: '43rem',
        disabled: true,
        invisible: false
      },
      {
        id: 8,
        campo: 'nomegrupo',
        funcao: 'Descrição Grupo',
        tipo: 'varchar',
        nome: 'nomegrupo',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 22,
        measure: '22rem',
        disabled: true,
        invisible: false
      },
      {
        id: 9,
        campo: 'nomemarca',
        funcao: 'Descrição Sub-Grupo',
        tipo: 'varchar',
        nome: 'nomesubgrupo',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 22,
        measure: '22rem',
        disabled: true,
        invisible: false
      },
      {
        id: 10,
        campo: 'qtprod',
        funcao: 'Comércio',
        tipo: 'numeric',
        nome: 'qtprod',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        invisible: false
      },
      {
        id: 11,
        campo: 'qtprodr',
        funcao: 'Reserva',
        tipo: 'numeric',
        nome: 'qtprodr',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        invisible: false
      },
      {
        id: 12,
        campo: 'qtprodd',
        funcao: 'Disponível',
        tipo: 'numeric',
        nome: 'qtprodd',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        invisible: false
      },
      {
        id: 13,
        campo: 'qtprodi',
        funcao: 'Indústria',
        tipo: 'numeric',
        nome: 'qtprodi',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        invisible: false
      },
      {
        id: 14,
        campo: 'qtprodu',
        funcao: 'Imobilizado',
        tipo: 'numeric',
        nome: 'qtprodu',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        invisible: false
      },
      {
        id: 15,
        campo: 'rma',
        funcao: 'RMA',
        tipo: 'numeric',
        nome: 'rma',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        invisible: false
      },
      {
        id: 16,
        campo: 'qtprodp',
        funcao: 'Pedido',
        tipo: 'numeric',
        nome: 'qtprod',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 7,
        measure: '7rem',
        disabled: true,
        invisible: false
      },
      {
        id: 17,
        campo: 'dtent',
        funcao: 'Entrega',
        tipo: 'datetime',
        nome: 'dtent',
        tamanho: 10,
        tipoobject: 5,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        invisible: false
      },
      {
        id: 18,
        campo: 'custo',
        funcao: 'R$ Unitário',
        tipo: 'numeric',
        nome: 'custo',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 9,
        measure: '8rem',
        disabled: true,
        decimal: 2,
        invisible: typeprice === 0
      },
      {
        id: 19,
        campo: 'vendapro',
        funcao: 'R$ Promoção',
        tipo: 'numeric',
        nome: 'vendapro',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 9,
        measure: '8rem',
        disabled: true,
        decimal: 2,
        invisible: false
      },
      {
        id: 20,
        campo: 'dtvpro2',
        funcao: 'Validade',
        tipo: 'datetime',
        nome: 'dtvpro2',
        tamanho: 10,
        tipoobject: 5,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        invisible: false
      }
    ]);
    valuesfield[0] = 1;
    valuesfield[1] = 1;
    valuesfield[2] = 1;
    valuesfield[3] = 1;
    valuesfield[4] = 1;
    valuesfield[5] = 1;
    valuesfield[6] = 0;
    valuesfield[7] = 0;
    setValuesfield([...valuesfield]);
    refDesc.current.focus();
  }, [config]);

  useEffect(() => {
    if (!showselec) {
      refDesc.current.focus();
    }
  }, [showselec]);

  useEffect(() => {
    setColumns([
      {
        headerClassName: 'header-list',
        field: 'codigo',
        headerName: 'Código',
        width: 76,
        renderCell: (params) => {
          const value = params.data?.codigo || ''; // ou a propriedade que você quiser exibir
          if (!searchterm) return value;

          const regex = new RegExp(`(${searchterm.replace(/%/g, '')})`, 'gi');
          const parts = String(value).split(regex);

          return (
            <span>
              {parts.map((part, index) =>
                regex.test(part) ? (
                  <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </span>
          );
        }
      },
      {
        headerClassName: 'header-list',
        field: 'referencia',
        headerName: 'Referência',
        width: 136,
        renderCell: (params) => {
          const value = params.data?.referencia || ''; // ou a propriedade que você quiser exibir
          if (!searchterm) return value;

          const regex = new RegExp(`(${searchterm.replace(/%/g, '')})`, 'gi');
          const parts = String(value).split(regex);

          return (
            <span>
              {parts.map((part, index) =>
                regex.test(part) ? (
                  <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </span>
          );
        }
      },
      {
        headerClassName: 'header-list',
        field: 'codbarras',
        headerName: 'Cód. Barras',
        width: 136,
        renderCell: (params) => {
          const value = params.data?.cobarras || ''; // ou a propriedade que você quiser exibir
          if (!searchterm) return value;

          const regex = new RegExp(`(${searchterm.replace(/%/g, '')})`, 'gi');
          const parts = String(value).split(regex);

          return (
            <span>
              {parts.map((part, index) =>
                regex.test(part) ? (
                  <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </span>
          );
        }
      },
      {
        headerClassName: 'header-list',
        field: 'codauxiliar',
        headerName: 'Cód. Auxiliar',
        width: 136,
        renderCell: (params) => {
          const value = params.data?.codauxiliar || ''; // ou a propriedade que você quiser exibir
          if (!searchterm) return value;

          const regex = new RegExp(`(${searchterm.replace(/%/g, '')})`, 'gi');
          const parts = String(value).split(regex);

          return (
            <span>
              {parts.map((part, index) =>
                regex.test(part) ? (
                  <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </span>
          );
        }
      },
      {
        headerClassName: 'header-list',
        field: 'nome',
        headerName: 'Descrição do Produto',
        width: 605,
        renderCell: (params) => {
          const value = params.data?.nome || ''; // ou a propriedade que você quiser exibir
          if (!searchterm) return value;

          const regex = new RegExp(`(${searchterm.replace(/%/g, '')})`, 'gi');
          const parts = String(value).split(regex);

          return (
            <span>
              {parts.map((part, index) =>
                regex.test(part) ? (
                  <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </span>
          );
        }
      },
      {
        headerClassName: 'header-list',
        field: 'marca',
        headerName: 'Marca',
        width: 275,
        renderCell: (params) => {
          const value = params.data?.marca || ''; // ou a propriedade que você quiser exibir
          if (!searchterm) return value;

          const regex = new RegExp(`(${searchterm.replace(/%/g, '')})`, 'gi');
          const parts = String(value).split(regex);

          return (
            <span>
              {parts.map((part, index) =>
                regex.test(part) ? (
                  <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </span>
          );
        }
      }
    ]);

    setFields([
      {
        id: 0,
        campo: 'codigo',
        funcao: 'Filtrar por Código',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 14,
        measure: '12rem',
        valuechecked: 1,
        valueunchecked: 0
      },
      {
        id: 1,
        campo: 'referencia',
        funcao: 'Filtrar por Referência',
        tipo: 'varchar',
        nome: 'referencia',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 14,
        measure: '12rem',
        valuechecked: 1,
        valueunchecked: 0
      },
      {
        id: 2,
        campo: 'codbarras',
        funcao: 'Filtrar por Cód. de Barras',
        tipo: 'varchar',
        nome: 'codbarras',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 14,
        measure: '12rem',
        valuechecked: 1,
        valueunchecked: 0
      },
      {
        id: 3,
        campo: 'codauxiliar',
        funcao: 'Filtrar por Cód. Auxiliar',
        tipo: 'varchar',
        nome: 'codauxiliar',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 14,
        measure: '12rem',
        valuechecked: 1,
        valueunchecked: 0
      },
      {
        id: 4,
        campo: 'nome',
        funcao: 'Filtrar por Descrição',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 14,
        measure: '12rem',
        valuechecked: 1,
        valueunchecked: 0
      },
      {
        id: 5,
        campo: 'marca',
        funcao: 'Filtrar por Marca',
        tipo: 'varchar',
        nome: 'marca',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 14,
        measure: '12rem',
        valuechecked: 1,
        valueunchecked: 0
      },
      {
        id: 6,
        campo: 'inativo',
        funcao: 'Filtrar Inativos',
        tipo: 'varchar',
        nome: 'inativo',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 14,
        measure: '12rem',
        valuechecked: 1,
        valueunchecked: 0
      },
      {
        id: 7,
        campo: 'suspenso',
        funcao: 'Filtrar Suspensos',
        tipo: 'varchar',
        nome: 'suspenso',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 14,
        measure: '12rem',
        valuechecked: 1,
        valueunchecked: 0
      }
    ]);
  }, [rows]);

  const handleChangeSearch = (e) => {
    let termo = e.target.value;
    setSearchterm(termo.toUpperCase());
  };

  useEffect(() => {
    if (itemselec !== undefined) {
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.codigo).then((response) => {
        setFoto(response.data[0].picture);
        apiFind('ProdmovVW', '*', '', "codemp = '" + cabecalho.codemp + "' and produto = '" + itemselec.codigo + "' ").then((response) => {
          setProdselec(response.data);
        });
      });
    }
  }, [itemselec]);

  useEffect(() => {
    if (prodselec !== undefined) {
      valuesfieldinfor[0] = prodselec.produto;
      valuesfieldinfor[1] = prodselec.referencia;
      valuesfieldinfor[2] = prodselec.codbarras;
      valuesfieldinfor[3] = prodselec.codauxiliar;
      valuesfieldinfor[4] = prodselec.nomeun;
      valuesfieldinfor[5] = prodselec.ncm;
      valuesfieldinfor[6] = prodselec.nomemarca;
      valuesfieldinfor[7] = prodselec.nomeprod;
      valuesfieldinfor[8] = prodselec.nomegrupo;
      valuesfieldinfor[9] = prodselec.nomesubgrupo;
      valuesfieldinfor[10] = prodselec.qtprod;
      valuesfieldinfor[11] = prodselec.qtprodr;
      valuesfieldinfor[12] = prodselec.qtprodd;
      valuesfieldinfor[13] = prodselec.qtprodd_i;
      valuesfieldinfor[14] = prodselec.qtprod_u;
      valuesfieldinfor[15] = prodselec.rma;
      valuesfieldinfor[16] = prodselec.qtprodp;
      if (prodselec.dtent !== undefined && prodselec.dtent !== null && prodselec.dtent !== '') {
        const dt1 = prodselec.dtent.substring(3, 5) + '/' + prodselec.dtent.substring(0, 2) + '/' + prodselec.dtent.substring(6, 10);
        const datafim = new Date(dt1);
        valuesfieldinfor[17] = datafim;
      } else {
        valuesfieldinfor[17] = null;
      }
      switch (typeprice) {
        case 0:
        case 4: {
          let promocao = false;
          valuesfieldinfor[20] = null;
          if (config.tabempresa === 'S') {
            if (prodselec.emp_vendapro > 0) {
              const dataAtual = new Date();
              const spro1 =
                prodselec.emp_dtvpro1.substring(3, 5) +
                '/' +
                prodselec.emp_dtvpro1.substring(0, 2) +
                '/' +
                prodselec.emp_dtvpro1.substring(6, 10);
              const dtvpro1 = new Date(spro1);
              const spro2 =
                prodselec.emp_dtvpro2.substring(3, 5) +
                '/' +
                prodselec.emp_dtvpro2.substring(0, 2) +
                '/' +
                prodselec.emp_dtvpro2.substring(6, 10);
              const dtvpro2 = new Date(spro2);
              if (dataAtual >= dtvpro1 && dataAtual <= dtvpro2) {
                promocao = true;
                valuesfieldinfor[19] = prodselec.emp_vendapro;
                const dt1 =
                  prodselec.emp_dtvpro2.substring(3, 5) +
                  '/' +
                  prodselec.emp_dtvpro2.substring(0, 2) +
                  '/' +
                  prodselec.emp_dtvpro2.substring(6, 10);
                const datafim = new Date(dt1);
                valuesfieldinfor[20] = datafim;
              } else {
                valuesfieldinfor[19] = 0;
              }
            }
          } else {
            if (prodselec.pro_vendapro > 0) {
              const dataAtual = new Date();
              const spro1 =
                prodselec.pro_dtvpro1.substring(3, 5) +
                '/' +
                prodselec.pro_dtvpro1.substring(0, 2) +
                '/' +
                prodselec.pro_dtvpro1.substring(6, 10);
              const dtvpro1 = new Date(spro1);
              const spro2 =
                prodselec.pro_dtvpro2.substring(3, 5) +
                '/' +
                prodselec.pro_dtvpro2.substring(0, 2) +
                '/' +
                prodselec.pro_dtvpro2.substring(6, 10);
              const dtvpro2 = new Date(spro2);
              if (dataAtual >= dtvpro1 && dataAtual <= dtvpro2) {
                promocao = true;
                valuesfieldinfor[19] = prodselec.pro_vendapro;
                const dt1 =
                  prodselec.pro_dtvpro2.substring(3, 5) +
                  '/' +
                  prodselec.pro_dtvpro2.substring(0, 2) +
                  '/' +
                  prodselec.pro_dtvpro2.substring(6, 10);
                const datafim = new Date(dt1);
                valuesfieldinfor[20] = datafim;
              } else {
                valuesfieldinfor[19] = 0;
              }
            }
          }
          if (!promocao) {
            valuesfieldinfor[19] = 0;
            valuesfieldinfor[20] = null;
            if (config.altpraticado === 'N') {
              valuesfieldinfor[18] = prodselec.vendap;
            } else {
              valuesfieldinfor[18] = prodselec.venda;
            }
          } else {
            valuesfieldinfor[18] = valuesfieldinfor[19];
          }
          break;
        }
      }
      setValuesfieldinfor([...valuesfieldinfor]);
    }
  }, [prodselec]);

  const Filtrar = () => {
    setCarregando(true);
    let filter = ' 0 = 0 ';
    if (searchterm !== undefined && searchterm !== '' && searchterm !== null) {
      filter += filter = ' AND ((1=0) ';
      if (valuesfield[0] === 1) {
        filter += " or (VW00005.codigo like '" + searchterm + "%') ";
      }
      if (valuesfield[1] === 1) {
        filter += " or (VW00005.referencia like '" + searchterm + "%') ";
      }
      if (valuesfield[2] === 1) {
        filter += " or (VW00005.codbarras like '" + searchterm + "%') ";
      }
      if (valuesfield[3] === 1) {
        filter += " or (VW00005.codauxiliar like '" + searchterm + "%') ";
      }
      if (valuesfield[4] === 1) {
        filter += " or (VW00005.nome like '" + searchterm + "%') ";
      }
      if (valuesfield[5] === 1) {
        filter += " or (VW00005.marca like '" + searchterm + "%') ";
      }
      filter += ')';
    }
    if (valuesfield[6] === 0) {
      filter += " and (situacao  <> 'I') ";
    }
    if (valuesfield[7] === 0) {
      filter += " and (situacao  <> 'S') ";
    }
    filter += ' order by VW00005.nome ';

    apiList('BrowseprodVW', '*', '', filter).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      Filtrar();
    }
  };

  const handleCloseselec = () => {
    setShowselec(false);
  };

  const handleClosetabela = () => {
    setShowtabela(false);
  };

  //useEffect(() => {
  //  if (itemnew !== undefined) {
  //    setShowselec(true);
  //  }
  //}, [itemnew]);

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselec(newSelection);
      setShowselec(true);
    }
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowselec(true);
  };

  return (
    <React.Fragment>
      <div id="frmbrowse" name="frmbrowse">
        <Row style={{ marginTop: '-15px' }}>
          <Col lg={9}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Listagem de Produtos</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '1px', marginTop: '10px' }}>
                <Col>
                  <input
                    id="edtprocurar"
                    onChange={(e) => handleChangeSearch(e)}
                    style={{ width: '1312px' }}
                    className="form-control"
                    placeholder="Procure o produto desejado"
                    value={searchterm}
                    onKeyDown={(event) => handleKeyDown(event)}
                    ref={refDesc}
                  />
                </Col>
                <Col style={{ width: '2rem', marginLeft: '-15px' }}>
                  <Button id="btnSearch" className="btn-icon" style={{ color: '#fff', textAlign: 'center' }} onClick={(e) => Filtrar()}>
                    <div role="status">
                      <i className={'feather icon-search'} />
                    </div>
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginLeft: '1px', marginRight: '1px', marginTop: '5px', marginBottom: '10px' }}>
                <AGGrid
                  width="100%"
                  height="300px"
                  rows={rows}
                  columns={columns}
                  loading={carregando}
                  item={itemselec}
                  setItem={(data) => setItemselec(data)}
                  onKeyDown={keyGrid}
                  onDoubleClick={dblClickGrid}
                  focus={true}
                  forcefocus={true}
                ></AGGrid>
              </Row>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Foto do Produto</Card.Title>
              </Card.Header>
              <Row style={{ width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                <Col>
                  {foto === undefined || foto === '' || foto === null ? (
                    <img src={nopicture} alt="foto" width={'335px'} height={'335px'} />
                  ) : (
                    <img src={`data:image/jpeg;base64,${foto}`} alt="foto" width={'335px'} height={'335px'} />
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: '-22px' }}>
          <Col lg={9}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Informações do Produto selecionado</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '10px', marginBottom: '17px' }}>
                {fieldsinfor.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldsinfor}
                    valuesfield={valuesfieldinfor}
                    setValuesfield={(data) => setValuesfieldinfor(data)}
                    valuesfield2={valuesfieldinfor2}
                    setValuesfield2={(data) => setValuesfieldinfor2(data)}
                    disabled={true}
                    invisible={field.invisible}
                  ></CreateObject>
                ))}
              </Row>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Opções de Filtro</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '10px', marginTop: '17px', marginBottom: '20px' }}>
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
                    disabled={false}
                  ></CreateObject>
                ))}
              </Row>
              {typeprice === 0 && itemselec !== undefined ? (
                <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                  <Button id="btnTabeka" className="btn-success" onClick={(e) => setShowtabela(true)}>
                    <i className={'feather icon-tag'} /> Tabela de Preços
                  </Button>
                </Row>
              ) : (
                <></>
              )}
            </Card>
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
        <Row style={{ textAlign: 'right', marginTop: '-13px' }}>
          <Col>
            <Button id="btnSelec" className="btn" onClick={(e) => setShowselec(true)}>
              <i className={'feather icon-check'} /> Selecionar
            </Button>
            <Button id="btnCanc" className="btn-success" onClick={(e) => setShowbrowse(false)}>
              <i className={'feather icon-x'} /> Cancelar
            </Button>
          </Col>
        </Row>
        <Modal backdrop="static" size={'lg'} show={showtabela} centered={true} onHide={handleClosetabela}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-tag'} />
            &nbsp;Tabela de Preços
          </Modal.Header>
          <ModalBody>
            <TabelaMov
              cabecalho={cabecalho}
              itemselec={itemselec}
              tablemov={tablemov}
              showtabela={showtabela}
              setShowtabela={(data) => setShowtabela(data)}
            ></TabelaMov>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showselec} centered={true} onHide={handleCloseselec}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} />
            &nbsp;Produto Selecionado
          </Modal.Header>
          <ModalBody>
            <LancProd
              cabecalho={cabecalho}
              tableitem={tableitem}
              classitem={classitem}
              typeprice={typeprice}
              tablemov={tablemov}
              fieldslanc={fieldslanc}
              fieldsimp={fieldsimp}
              inclusao={true}
              showselec={showselec}
              setShowselec={(data) => setShowselec(data)}
              prodselec={prodselec}
              entsai={entsai}
              coddest={coddest}
              tabdest={tabdest}
              typestock={typestock}
              contabil={contabil}
              eventsitem={eventsitem}
              setEventsitem={(data) => setEventsitem(data)}
              config={config}
            ></LancProd>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default BrowseMov;
