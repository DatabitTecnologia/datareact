import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AGGrid from '../../../../components/AGGrid';
import { apiList, apiGetPicture } from '../../../../api/crudapi';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import { CreateObject } from '../../../../components/CreateObject';
import ProdutoConsultaEstoque from './estoque';
import ProdutoConsultaSerial from './serial';
import ProdutoConsultaObs from './obs';
import ProdutoConsultaPedido from './pedido';
import ProdutoConsultaTabela from './tabela';

const ProdutoConsulta = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [itemselec, setItemselec] = React.useState(undefined);
  const [foto, setFoto] = React.useState();
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [searchterm, setSearchterm] = useState('');
  const [showmodal, setShowmodal] = React.useState(true);
  const navigate = useNavigate();
  const [prodselec, setProdselec] = React.useState(undefined);
  const [option, setOption] = React.useState(0);

  const handleClosemodal = () => {
    setShowmodal(false);
    navigate('/index');
  };

  useEffect(() => {
    valuesfield[0] = 1;
    valuesfield[1] = 1;
    valuesfield[2] = 1;
    valuesfield[3] = 1;
    valuesfield[4] = 1;
    valuesfield[5] = 1;
    valuesfield[6] = 0;
    valuesfield[7] = 0;
    setValuesfield([...valuesfield]);
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
          const value = params.data?.codauxliar || ''; // ou a propriedade que você quiser exibir
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
      setProdselec(itemselec.codigo);
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.codigo).then((response) => {
        setFoto(response.data[0].picture);
      });
    }
  }, [itemselec]);

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
  return (
    <React.Fragment>
      <Modal backdrop="static" fullscreen show={showmodal} centered={true} onHide={handleClosemodal}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-box'} />
          &nbsp;Consulta de Produtos
        </Modal.Header>
        <ModalBody>
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
                {itemselec !== undefined ? (
                  <Row style={{ textAlign: 'center' }}>
                    <Col>
                      <Button id="btnEstoque" className={option === 0 ? 'btn-success' : 'btn-primary'} onClick={(e) => setOption(0)}>
                        <i className={'feather icon-box'} /> Posição Estoque
                      </Button>
                      <Button id="btnSeriais" className={option === 1 ? 'btn-success' : 'btn-primary'} onClick={(e) => setOption(1)}>
                        <i className={'feather icon-align-left'} /> Seriais Disponíveis
                      </Button>
                      <Button id="btnTabela" className={option === 2 ? 'btn-success' : 'btn-primary'} onClick={(e) => setOption(2)}>
                        <i className={'feather icon-tag'} /> Tabela de Preços
                      </Button>
                      <Button id="btnPedidos" className={option === 3 ? 'btn-success' : 'btn-primary'} onClick={(e) => setOption(3)}>
                        <i className={'feather icon-shopping-cart'} /> Pedidos de Compra
                      </Button>
                      <Button id="btnObs" className={option === 4 ? 'btn-success' : 'btn-primary'} onClick={(e) => setOption(4)}>
                        <i className={'feather icon-file-text'} /> Observações
                      </Button>
                      <Button id="btnObsint" className={option === 5 ? 'btn-success' : 'btn-primary'} onClick={(e) => setOption(5)}>
                        <i className={'feather icon-file'} /> Observações Internas
                      </Button>
                      <Button id="btnObsint" className={option === 6 ? 'btn-success' : 'btn-primary'} onClick={(e) => setOption(6)}>
                        <i className={'feather icon-file-plus'} /> Observações NFe
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}
                <Row style={{ marginLeft: '1px', marginTop: '10px' }}>
                  {option === 0 && itemselec !== undefined ? (
                    <ProdutoConsultaEstoque produto={itemselec.codigo}></ProdutoConsultaEstoque>
                  ) : (
                    <></>
                  )}
                  {option === 1 && itemselec !== undefined ? (
                    <ProdutoConsultaSerial produto={itemselec.codigo}></ProdutoConsultaSerial>
                  ) : (
                    <></>
                  )}
                  {option === 2 && itemselec !== undefined ? (
                    <ProdutoConsultaTabela produto={itemselec.codigo}></ProdutoConsultaTabela>
                  ) : (
                    <></>
                  )}
                  {option === 3 && itemselec !== undefined ? (
                    <ProdutoConsultaPedido produto={itemselec.codigo}></ProdutoConsultaPedido>
                  ) : (
                    <></>
                  )}
                  {option === 4 && itemselec !== undefined ? (
                    <ProdutoConsultaObs produto={itemselec.codigo} optionselec={0}></ProdutoConsultaObs>
                  ) : (
                    <></>
                  )}
                  {option === 5 && itemselec !== undefined ? (
                    <ProdutoConsultaObs produto={itemselec.codigo} optionselec={1}></ProdutoConsultaObs>
                  ) : (
                    <></>
                  )}
                  {option === 6 && itemselec !== undefined ? (
                    <ProdutoConsultaObs produto={itemselec.codigo} optionselec={2}></ProdutoConsultaObs>
                  ) : (
                    <></>
                  )}
                </Row>
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
                  <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '30px' }}>
                    <Button id="btnFechar" className="btn-primary" onClick={(e) => handleClosemodal()}>
                      <i className={'feather icon-x'} /> Fechar
                    </Button>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ProdutoConsulta;
