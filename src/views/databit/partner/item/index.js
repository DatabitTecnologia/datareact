import React, { useEffect } from 'react';
import { Row, Col, Button, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { useToasts } from 'react-toast-notifications';
import AGGrid from '../../../../components/AGGrid';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFind, apiList, apiDelete, apiGetPicture } from '../../../../api/crudapi';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import PartnerInfo from '../info';
import PartnerBrowse from '../browse';
import { Confirmation } from '../../../../components/Confirmation';

const PartnerItem = (props) => {
  const { compra, setCompra, disabled } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [foto, setFoto] = React.useState();
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [showselec, setShowselec] = React.useState(false);
  const [showbrowse, setShowbrowse] = React.useState(false);
  const { valuescab, setValuescab } = props;
  const { valuesname, setValuesname } = props;
  const { addToast } = useToasts();
  const [uf, setUf] = React.useState([]);
  const [propsstatus, setPropstatus] = React.useState();

  useEffect(() => {
    setFields([
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
        disabled: true
      },
      {
        id: 1,
        campo: 'referencia',
        funcao: 'Referência',
        tipo: 'varchar',
        nome: 'referencia',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disabled: true
      },
      {
        id: 2,
        campo: 'codbarras',
        funcao: 'Código Barras',
        tipo: 'varchar',
        nome: 'codbarras',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'codauxiliar',
        funcao: 'Código Auxiliar',
        tipo: 'varchar',
        nome: 'codauxiliar',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disabled: true
      },
      {
        id: 5,
        campo: 'marca',
        funcao: 'Marca',
        tipo: 'varchar',
        nome: 'marca',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 30,
        measure: '30rem',
        disabled: true
      },
      {
        id: 4,
        campo: 'nomeproduto',
        funcao: 'Descrição Produto',
        tipo: 'varchar',
        nome: 'nomeproduto',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 45,
        measure: '45rem',
        disabled: true
      },
      {
        id: 7,
        campo: 'qtprod',
        funcao: 'Quantidade',
        tipo: 'varchar',
        nome: 'prazo',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        decimal: 3
      },
      {
        id: 6,
        campo: 'prunit',
        funcao: 'Preço Unitário',
        tipo: 'varchar',
        nome: 'prunit',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        decimal: 2
      },

      {
        id: 8,
        campo: 'totvalor',
        funcao: 'Valor Total',
        tipo: 'varchar',
        nome: 'totvalor',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        decimal: 2
      },
      {
        id: 9,
        campo: 'nomecli',
        funcao: 'Parceiro Fornecedor',
        tipo: 'varchar',
        nome: 'nomecli',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 38,
        measure: '38rem',
        disabled: true
      },
      {
        id: 10,
        campo: 'nomestatus',
        funcao: 'Status Atual',
        tipo: 'varchar',
        nome: 'nomestatus',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 37,
        measure: '37rem',
        disabled: true
      }
    ]);
    setColumns([
      { headerClassName: 'header-list', field: 'produto', headerName: 'Código', width: 76 },
      { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 136 },
      { headerClassName: 'header-list', field: 'nomeprod', headerName: 'Descrição do Produto', width: 345 },
      { headerClassName: 'header-list', field: 'qtprod', headerName: 'Quantidade', width: 125, type: 'number', decimal: 3 },
      { headerClassName: 'header-list', field: 'prunit', headerName: 'Preço Unitário', width: 125, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'totvalor', headerName: 'Valor Total', width: 145, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'nomecli', headerName: 'Parceiro Fornecedor', width: 230 },
      { headerClassName: 'header-list', field: 'entrega', headerName: 'Entrega', width: 100 },
      { headerClassName: 'header-list', field: 'nomestatus', headerName: 'Status', width: 230 }
    ]);
  }, [compra]);

  useEffect(() => {
    if (!showselec && !showbrowse) {
      Filtrar();
    }
  }, [compra, showselec, showbrowse]);

  useEffect(() => {
    if (itemselec !== undefined) {
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.produto).then((response) => {
        setFoto(response.data[0].picture);
        valuesfield[0] = itemselec.produto;
        valuesfield[1] = itemselec.referencia;
        valuesfield[2] = itemselec.codbarras;
        valuesfield[3] = itemselec.codauxiliar;
        valuesfield[4] = itemselec.nomeprod;
        valuesfield[5] = itemselec.nomemarca;
        valuesfield[6] = itemselec.prunit;
        valuesfield[7] = itemselec.qtprod;
        valuesfield[8] = itemselec.totvalor;
        valuesfield[9] = itemselec.nomecli;
        valuesfield[10] = itemselec.nomestatus;
        setValuesfield([...valuesfield]);
        apiFind('PartnerStatus', '*', '', "TB01148_CODIGO = '" + itemselec.status + "' ").then((response) => {
          if (response.status === 200) {
            setPropstatus(response.data);
          }
        });
      });
    }
  }, [itemselec]);

  const Filtrar = () => {
    setCarregando(true);
    apiList('PartnerItemVW', '*', '', "codigo = '" + compra.codigo + "' ").then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        apiFind('Partner', '*', '', "TB02300_CODIGO = '" + compra.codigo + "' ").then((response) => {
          if (response.status === 200) {
            compra.qtde = response.data.qtde;
            compra.vlrnota = response.data.vlrnota;
            setCompra(compra);
            valuescab[valuesname.indexOf('qtde')] = response.data.qtde;
            valuescab[valuesname.indexOf('vlrnota')] = response.data.vlrnota;
            setValuescab([...valuescab]);
            apiFind('Site', 'TB02176_ESTADO', '', "TB02176_CODIGO = '" + compra.codsite + "' ").then((response) => {
              setUf(response.data.estado);
              setCarregando(false);
            });
          }
        });
      }
    });
  };

  const Incluir = () => {
    if (propsstatus.alterar === 'S' || propsstatus.alterar === undefined) {
      setShowbrowse(true);
    } else {
      addToast('Não é permitido adicionar mais itens por este status !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    }
  };

  const Excluir = () => {
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      if (propsstatus.excluir === 'S' || propsstatus.excluir === undefined) {
        Confirmation('frmitem', 'Confirma a exclusão deste registro ?').then((result) => {
          if (result.isConfirmed) {
            setCarregando(true);
            apiDelete('PartnerItem', itemselec).then((response) => {
              if (response.status === 200) {
                if (response.data.status === 1) {
                  setCarregando(false);
                  addToast('Registro excluído com Sucesso !', {
                    placement: 'bottom-rigth',
                    appearance: 'success',
                    autoDismiss: true
                  });
                  Filtrar();
                }
              } else {
                addToast(response.data, {
                  placement: 'bottom-rigth',
                  appearance: 'danger',
                  autoDismiss: false
                });
              }
            });
          }
        });
      } else {
        addToast('Não é permitido excluir por este status !', {
          placement: 'bottom-rigth',
          appearance: 'warning',
          autoDismiss: true
        });
      }
    } else {
      addToast('Não possui nenhum registro para ser excluído !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    }
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselec(newSelection);
      setShowselec(true);
    }
  };

  const handleCloseselec = () => {
    setShowselec(false);
  };

  const handleClosebrowse = () => {
    setShowbrowse(false);
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowselec(true);
  };

  return (
    <React.Fragment>
      <div id="frmitem" name="frmitem">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>

        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
          <Col>
            <Button id="btnNovoprod" className="btn" disabled={!disabled} onClick={(e) => Incluir()}>
              <i className={'feather icon-star'} /> Incluir
            </Button>
            <Button
              id="btnDelprod"
              className="btn-success"
              disabled={!disabled}
              onClick={(e) => {
                Excluir();
              }}
            >
              <i className={'feather icon-trash'} /> Excluir
            </Button>
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <AGGrid
            width="100%"
            height="280px"
            rows={rows}
            columns={columns}
            loading={carregando}
            item={itemselec}
            setItem={(data) => setItemselec(data)}
            disabled={!disabled}
            onKeyDown={keyGrid}
            onDoubleClick={dblClickGrid}
            onCelClick={clickGrid}
            focus={true}
          ></AGGrid>
        </Row>

        <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Col lg={1}>
            <Row style={{ width: '100%', marginRight: '20px' }}>
              <Col>
                {foto === undefined || foto === '' || foto === null ? (
                  <img src={nopicture} alt="foto" width={'250px'} height={'250px'} />
                ) : (
                  <img src={`data:image/jpeg;base64,${foto}`} alt="foto" width={'250px'} height={'250px'} />
                )}
              </Col>
            </Row>
          </Col>
          <Col lg={11}>
            <Row style={{ marginLeft: '180px', marginRight: '5px', marginBottom: '3px' }}>
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
                  disabled={true}
                ></CreateObject>
              ))}
            </Row>
          </Col>
        </Row>
        <Modal backdrop="static" size="xl" show={showselec} centered={true} onHide={handleCloseselec}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} />
            &nbsp;Lançamento de Itens
          </Modal.Header>
          <ModalBody>
            <PartnerInfo
              itemselec={itemselec}
              inclusao={false}
              compra={compra}
              showselec={showselec}
              setShowselec={(data) => setShowselec(data)}
              propsstatus={propsstatus}
            ></PartnerInfo>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" fullscreen={true} show={showbrowse} centered={true} onHide={handleClosebrowse}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} />
            &nbsp;Lançamento de Itens
          </Modal.Header>
          <ModalBody>
            <PartnerBrowse
              uf={uf}
              itemselec={itemselec}
              inclusao={false}
              compra={compra}
              showselec={showselec}
              setShowselec={(data) => setShowselec(data)}
            ></PartnerBrowse>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default PartnerItem;
