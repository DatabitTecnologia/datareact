import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiFind, apiList } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';
import GmoSite from '../../gmo/site';
import ProdutoInfor from '../../../produto/informacoes';

const ContratoVisaoEquipamento = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [contrato, setContrato] = React.useState([]);
  const [fieldscontrato, setFieldscontrato] = React.useState([]);
  const [fieldsselec, setFieldsselec] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { showequip, setShowequip } = props;
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [validations, setValidations] = React.useState([]);
  const [showsite, setShowsite] = React.useState(false);
  const [showprod, setShowprod] = React.useState(false);

  useEffect(() => {
    setFieldscontrato([
      {
        id: 0,
        campo: 'TB02111_CODIGO',
        funcao: 'Nº Contrato',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 12,
        tipoobject: 1,
        widthfield: 14,
        measure: '14rem',
        disabled: true
      },
      {
        id: 1,
        campo: 'TB02111_CODCLI',
        funcao: 'Cliente',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01008',
        widthname: 23,
        disabled: true
      },
      {
        id: 2,
        campo: 'TB02260_NOME',
        funcao: 'Título Contrato',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 31,
        measure: '31rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'TB02111_QTDECONTRATA',
        funcao: 'Qt. Contratada',
        tipo: 'int',
        nome: 'qtdecontrata',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 4,
        campo: 'TB02111_VLRCONTRATA',
        funcao: 'Valor Contratado',
        tipo: 'numeric',
        nome: 'vlrcontrata',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        decimal: 2
      },
      {
        id: 5,
        campo: 'TB02111_QTDE',
        funcao: 'Qt. Instalada',
        tipo: 'int',
        nome: 'qtde',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 6,
        campo: 'TB02111_VLRNOTA',
        funcao: 'Valor Contrato',
        tipo: 'numeric',
        nome: 'vlrnota',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: true,
        decimal: 2
      },

      {
        id: 7,
        campo: 'TB02111_CODEMP',
        funcao: 'Empresa',
        tipo: 'varchar',
        nome: 'codemp',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 33,
        measure: '33rem',
        tabelaref: 'TB01007',
        widthname: 24,
        disabled: true
      },
      {
        id: 8,
        campo: 'TB02111_CODEMP2',
        funcao: 'Empresa de Faturamento',
        tipo: 'varchar',
        nome: 'codemp2',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01007',
        widthname: 22,
        disabled: true
      },
      {
        id: 9,
        campo: 'TB02111_VEND',
        funcao: 'Vendedor',
        tipo: 'varchar',
        nome: 'vend',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01006',
        widthname: 22,
        disabled: true
      },
      {
        id: 10,
        campo: 'TB02111_VENCCONTR',
        funcao: 'Vencimento',
        tipo: 'datetime',
        nome: 'venccontr',
        tamanho: 12,
        tipoobject: 5,
        widthfield: 10,
        measure: '10rem',
        disabled: true
      },
      {
        id: 11,
        campo: 'TB02111_DURACAO',
        funcao: 'Duração (Meses)',
        tipo: 'int',
        nome: 'duracao',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        decimal: 0
      }
    ]);

    setFieldsselec([
      {
        id: 12,
        campo: 'TB02255_OPTIONS',
        funcao: 'Campo de Visualização',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '15rem',
        itens: 'Páginas Produzidas,Páginas Excedentes',
        values: '0,1'
      }
    ]);

    valuesfield[12] = 0;
    setValuesfield([...valuesfield]);

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['possuileitura'];
    validation['sinal'] = [1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [1];
    validation['cor'] = ['#99ffcc'];
    validation['total'] = 1;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
    setCarregando(true);
    apiFind('Contrato', '*', '', "TB02111_CODIGO = '" + props.contrato + "' ").then((response) => {
      if (response.status === 200) {
        setContrato(response.data);
      }
    });
  }, []);

  useEffect(() => {
    valuesfield[0] = contrato.codigo;
    valuesfield[1] = contrato.codcli;
    valuesfield[2] = contrato.nome;
    valuesfield[3] = contrato.qtdecontrata;
    valuesfield[4] = contrato.vlrcontrata;
    valuesfield[5] = contrato.qtde;
    valuesfield[6] = contrato.vlrnota;
    valuesfield[7] = contrato.codemp;
    valuesfield[8] = contrato.codemp2;
    valuesfield[9] = contrato.vend;
    if (contrato.venccontr !== undefined && contrato.venccontr !== null) {
      const dt1 = contrato.venccontr.substring(3, 5) + '/' + contrato.venccontr.substring(0, 2) + '/' + contrato.venccontr.substring(6, 10);
      const datafim = new Date(dt1);
      valuesfield[10] = datafim;
    }
    valuesfield[11] = contrato.duracao;
    setValuesfield([...valuesfield]);
    apiList('ContratoVisaoEquipamentoVW', '*', '', "CODIGO = '" + props.contrato + "' ").then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  }, [contrato]);

  useEffect(() => {
    if (parseInt(valuesfield[12]) === 0) {
      setColumns([
        { headerClassName: 'header-list', field: 'numserie', headerName: 'Serial', width: 156 },
        { headerClassName: 'header-list', field: 'pat', headerName: 'PAT', width: 116 },
        { headerClassName: 'header-list', field: 'produto', headerName: 'Código', width: 70 },
        { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 124 },
        { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Equipamento', width: 295 },
        { headerClassName: 'header-list', field: 'nomesite', headerName: 'Site', width: 229 },
        { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 189 },
        { headerClassName: 'header-list', field: 'estado', headerName: 'UF', width: 60 },
        { headerClassName: 'header-list', field: 'cep', headerName: 'Cep', width: 100 },
        { headerClassName: 'header-list', field: 'nomedepto', headerName: 'Departamento', width: 159 },
        { headerClassName: 'header-list', field: 'instalacao', headerName: 'Instalação', width: 106, type: 'date' },
        { headerClassName: 'header-list', field: 'ultpb', headerName: 'Medidor PB', width: 115, type: 'number' },
        { headerClassName: 'header-list', field: 'ultcor', headerName: 'Medidor COR', width: 115, type: 'number' }
      ]);
    } else {
      setColumns([
        { headerClassName: 'header-list', field: 'numserie', headerName: 'Serial', width: 156 },
        { headerClassName: 'header-list', field: 'pat', headerName: 'PAT', width: 116 },
        { headerClassName: 'header-list', field: 'produto', headerName: 'Código', width: 70 },
        { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 124 },
        { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Equipamento', width: 295 },
        { headerClassName: 'header-list', field: 'nomesite', headerName: 'Site', width: 229 },
        { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 189 },
        { headerClassName: 'header-list', field: 'estado', headerName: 'UF', width: 60 },
        { headerClassName: 'header-list', field: 'cep', headerName: 'Cep', width: 100 },
        { headerClassName: 'header-list', field: 'nomedepto', headerName: 'Departamento', width: 159 },
        { headerClassName: 'header-list', field: 'instalacao', headerName: 'Instalação', width: 106, type: 'date' },
        { headerClassName: 'header-list', field: 'prodpb', headerName: 'Prod. PB', width: 115, type: 'number' },
        { headerClassName: 'header-list', field: 'prodcolor', headerName: 'Prod. COR', width: 115, type: 'number' }
      ]);
    }
  }, [valuesfield[12]]);

  const handleClosesite = () => {
    setShowsite(false);
  };

  const handleCloseprod = () => {
    setShowprod(false);
  };
  return (
    <React.Fragment>
      <div id="frmvisaoequip" name="frmvisaoequip">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col style={{ marginLeft: '10px', marginBottom: '4px', marginTop: '-18px' }}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações Cadastrais</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '3px' }}>
                {fieldscontrato.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldscontrato}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                    disabled={true}
                  ></CreateObject>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginLeft: '10px', marginRight: '1px', marginTop: '10px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Listagem de Equipamentos</Card.Title>
            </Card.Header>

            <Col>
              <Row style={{ marginBottom: '5px' }}>
                <Col lg={2}>
                  <Row style={{ marginTop: '30px' }}>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#99ffcc', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col lg={9}>
                      <p style={{ marginTop: '4px', marginLeft: '6px' }} className="text-muted">
                        Leitura já lançada no mês atual
                      </p>
                    </Col>
                  </Row>
                </Col>
                {fieldsselec.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldsselec}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                  ></CreateObject>
                ))}
              </Row>
            </Col>

            <AGGrid
              width="100%"
              height="345px"
              rows={rows}
              columns={columns}
              loading={carregando}
              item={itemselec}
              setItem={(data) => setItemselec(data)}
              validations={validations}
            ></AGGrid>
          </Card>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'right' }}>
          <Col>
            <Button id="btnSite" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowsite(true)}>
              <i className={'feather icon-map-pin'} />
              Site
            </Button>
            <Button id="btnModelo" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowprod(true)}>
              <i className={'feather icon-search'} />
              Modelo
            </Button>
            <Button id="btnFechar" className="btn btn-success shadow-2 mb-2" onClick={(e) => setShowequip(false)}>
              <i className={'feather icon-x-circle'} />
              Fechar
            </Button>
          </Col>
        </Row>
      </div>
      <Modal backdrop="static" size="xl" show={showsite} centered={true} onHide={handleClosesite}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-map-pin'} />
          &nbsp;Site : {itemselec !== undefined ? itemselec.nomesite : ''}
        </Modal.Header>
        <ModalBody>
          {itemselec !== undefined ? <GmoSite itemselec={itemselec} setItemselec={(data) => setItemselec(data)}></GmoSite> : <></>}
        </ModalBody>
        <ModalFooter>
          <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleClosesite}>
            <i className={'feather icon-x-circle'} />
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal backdrop="static" fullscreen={true} show={showprod} centered={true} onHide={handleCloseprod}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-search'} />
          &nbsp; Equipamento selecionado:{' '}
          {itemselec !== undefined ? itemselec.produto + ' - ' + itemselec.referencia + ' - ' + itemselec.nome : ''}
        </Modal.Header>
        <ModalBody>{itemselec !== undefined ? <ProdutoInfor produto={itemselec.produto}></ProdutoInfor> : <></>}</ModalBody>
        <ModalFooter>
          <Button id="btnFecharprod" className="btn btn-success shadow-2 mb-2" onClick={() => handleCloseprod()}>
            <i className={'feather icon-x-circle'} />
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default ContratoVisaoEquipamento;
