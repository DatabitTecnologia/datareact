import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody, Card, Alert } from 'react-bootstrap';
import AGGrid from '../../../../components/AGGrid';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFind, apiList, apiGetPicture } from '../../../../api/crudapi';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import PartnerInfo from '../info';

const PartnerBrowse = (props) => {
  const { compra, uf } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [itemselec, setItemselec] = React.useState(undefined);
  const [columns2, setColumns2] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);
  const [itemselec2, setItemselec2] = React.useState(undefined);
  const [itemselec3, setItemselec3] = React.useState(undefined);
  const [foto, setFoto] = React.useState();
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [showselec, setShowselec] = React.useState(false);
  const [searchterm, setSearchterm] = useState('');
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [status, setStatus] = React.useState();

  useEffect(() => {
    const inputField = document.getElementById('edtprocurar');
    if (inputField) {
      inputField.focus();
    }
  }, []);

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
          const value = params.data?.data || ''; // ou a propriedade que você quiser exibir
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
          const value = params.data?.codbarras || ''; // ou a propriedade que você quiser exibir
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
        width: 262,
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
    setColumns2([
      { headerClassName: 'header-list', field: 'codcli', headerName: 'Código', width: 96 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Nome / Razão Social do Parceiro', width: 385 },
      { headerClassName: 'header-list', field: 'fone', headerName: 'Telefone', width: 100 },
      { headerClassName: 'header-list', field: 'email', headerName: 'E-Mail', width: 210 },
      { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 176 },
      { headerClassName: 'header-list', field: 'estado', headerName: 'UF', width: 50 },
      { headerClassName: 'header-list', field: 'prunit', headerName: 'Preço Unitário', width: 145, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'prazo', headerName: 'Entrega', width: 100, type: 'number' },
      { headerClassName: 'header-list', field: 'datafim', headerName: 'Validade', width: 100 }
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
        measure: '22rem',
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
        measure: '22rem',
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
        measure: '22rem',
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
        measure: '22rem',
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
        measure: '22rem',
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
        measure: '22rem',
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
    valuesfield[0] = 1;
    valuesfield[1] = 1;
    valuesfield[2] = 1;
    valuesfield[3] = 1;
    valuesfield[4] = 1;
    valuesfield[5] = 1;
    setValuesfield([...valuesfield]);
  }, [fields]);

  useEffect(() => {
    if (itemselec !== undefined) {
      let filter = '';
      filter += " VW01140.produto = '" + itemselec.codigo + "' and situacao = 'A' ";
      filter +=
        " and EXISTS (SELECT TB01147_CODCLI FROM TB01147 WHERE TB01147.TB01147_CODCLI = VW01140.codcli AND TB01147.TB01147_ESTADO = '" +
        uf +
        "')";
      filter += 'order by VW01140.prunit, VW01140.prazo ';
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.codigo).then((response) => {
        setFoto(response.data[0].picture);
        setRows2([]);
        setItemselec2(undefined);
        apiList('PartnerParceiroVW', '*', '', filter).then((response) => {
          if (response.status === 200) {
            setRows2(response.data);
            if (response.data !== undefined && response.data.length > 0) {
              setItemselec2(response.data[0]);
            }
            apiFind('PartnerTipo', 'TB01152_STATUSINICIAL', '', "TB01152_CODIGO = '" + compra.tipo + "' ").then((response) => {
              if (response.status === 200) {
                setStatus(response.data.statusinicial);
                setCarregando(false);
              }
            });
          }
        });
      });
    }
  }, [itemselec]);

  const Filtrar = () => {
    setCarregando(true);
    let filter = '';
    if (searchterm !== undefined && searchterm !== '' && searchterm !== null) {
      filter =
        " EXISTS (SELECT VW01140.produto FROM VW01140 WHERE VW01140.produto = VW01139.codigo and VW01140.estado = '" +
        uf +
        "' ) AND ((1=0) ";
      if (valuesfield[0] === 1) {
        filter += " or (VW01139.codigo like '" + searchterm + "%') ";
      }
      if (valuesfield[1] === 1) {
        filter += " or (VW01139.referencia like '" + searchterm + "%') ";
      }
      if (valuesfield[2] === 1) {
        filter += " or (VW01139.codbarras like '" + searchterm + "%') ";
      }
      if (valuesfield[3] === 1) {
        filter += " or (VW01139.codauxiliar like '" + searchterm + "%') ";
      }
      if (valuesfield[4] === 1) {
        filter += " or (VW01139.nome like '" + searchterm + "%') ";
      }
      if (valuesfield[5] === 1) {
        filter += " or (VW01139.marca like '" + searchterm + "%') ";
      }
      filter += ')';
    } else {
      filter = " EXISTS (SELECT VW01140.produto FROM VW01140 WHERE VW01140.produto = VW01139.codigo and VW01140.estado = '" + uf + "' )";
    }
    filter += ' order by VW01139.nome ';

    apiList('PartnerBrowseVW', '*', '', filter).then((response) => {
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

  const Selecionar = () => {
    let tmpitem = {};
    if (rows !== undefined && rows2.length > 0) {
      if (itemselec2 === undefined) {
        setItemselec2(rows2[0]);
        tmpitem['codigo'] = compra.codigo;
        tmpitem['codcli'] = rows2[0].codcli;
        tmpitem['produto'] = itemselec.codigo;
        tmpitem['qtprod'] = 1;
        tmpitem['qtprodb'] = 0;
        tmpitem['prunit'] = rows2[0].prunit;
        tmpitem['totvalor'] = rows2[0].prunit;
        tmpitem['totvalorb'] = 0;
        tmpitem['status'] = status;
        tmpitem['nomecli'] = rows2[0].nome;
        tmpitem['referencia'] = itemselec.referencia;
        tmpitem['codbarras'] = itemselec.codbarras;
        tmpitem['codauxiliar'] = itemselec.codauxiliar;
        tmpitem['nomeprod'] = itemselec.nome;
        tmpitem['nomemarca'] = itemselec.marca;
        setItemselec3(tmpitem);
        setShowselec(true);
      } else {
        tmpitem['codigo'] = compra.codigo;
        tmpitem['codcli'] = itemselec2.codcli;
        tmpitem['produto'] = itemselec.codigo;
        tmpitem['qtprod'] = 1;
        tmpitem['qtprodb'] = 0;
        tmpitem['prunit'] = itemselec2.prunit;
        tmpitem['totvalor'] = itemselec2.prunit;
        tmpitem['totvalorb'] = 0;
        tmpitem['status'] = status;
        tmpitem['nomecli'] = itemselec2.nome;
        tmpitem['referencia'] = itemselec.referencia;
        tmpitem['codbarras'] = itemselec.codbarras;
        tmpitem['codauxiliar'] = itemselec.codauxiliar;
        tmpitem['nomeprod'] = itemselec.nome;
        tmpitem['nomemarca'] = itemselec.marca;
        setItemselec3(tmpitem);
        setShowselec(true);
      }
    }
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselec(newSelection);
      Selecionar();
    }
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    Selecionar();
  };

  const keyGrid2 = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselec2(newSelection);
      Selecionar();
    }
  };

  const dblClickGrid2 = (newSelection) => {
    setItemselec2(newSelection);
    Selecionar();
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
                <Card.Title as="h5">Listagem de Parceiros</Card.Title>
              </Card.Header>

              <Row style={{ marginLeft: '1px', marginRight: '1px', marginTop: '5px', marginBottom: '10px' }}>
                <AGGrid
                  width="100%"
                  height="235px"
                  rows={rows2}
                  columns={columns2}
                  loading={carregando}
                  item={itemselec2}
                  setItem={(data) => setItemselec2(data)}
                  onKeyDown={keyGrid2}
                  onDoubleClick={dblClickGrid2}
                ></AGGrid>
              </Row>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Opções de Filtro</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '10px' }}>
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
            <Button id="btnSelec" className="btn" onClick={(e) => Selecionar()}>
              <i className={'feather icon-check'} /> Selecionar
            </Button>
            <Button id="btnCanc" className="btn-success">
              <i className={'feather icon-x'} /> Cancelar
            </Button>
          </Col>
        </Row>
      </div>
      <Modal backdrop="static" size="xl" show={showselec} centered={true} onHide={handleCloseselec}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-box'} />
          &nbsp;Lançamento de Itens
        </Modal.Header>
        <ModalBody>
          <PartnerInfo
            itemselec={itemselec3}
            inclusao={true}
            compra={compra}
            showselec={showselec}
            setShowselec={(data) => setShowselec(data)}
          ></PartnerInfo>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default PartnerBrowse;
