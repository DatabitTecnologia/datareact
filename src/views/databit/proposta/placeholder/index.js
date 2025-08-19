import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiDelete, apiID } from '../../../../api/crudapi';
import { Confirmation } from '../../../../components/Confirmation';
import AGGrid from '../../../../components/AGGrid';
import PlaceHolderField from '../field';

const PlaceHolder = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [disabled, setDisabled] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const { cabecalho, setCabecalho } = props;
  const { valuesname, setValuesname } = props;
  const [inclusao, setInclusao] = React.useState(false);
  const [itemselec, setItemselec] = React.useState();
  const [showsave, setShowsave] = useState(false);
  const [altproposta, setAltproposta] = React.useState();
  const [precontrato, setPrecontrato] = React.useState('');
  const { tabela, setTabela } = props;

  useEffect(() => {
    if (!showsave) {
      Filtrar();
    }
  }, [showsave]);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'PlaceHolder',
      'TB01141_MODELO,TB01141_CODIGO,TB01141_CAMPO,TB01141_PLACEHOLDER,TB01141_VALOR,TB01141_TIPO,' +
        'TB01141_TIPOTABELA,TB01141_SQL,TB01141_TAMANHO,TB01141_TABELA,TB01141_CAMPOREF,TB01141_CAMPOCHAVE,TB01141_TABELA2,TB01141_CAMPOREF2,TB01141_CAMPOCHAVE2',
      "case TB01141_TIPO when 0 then 'Definir Campo' when 1 then 'Valor Fixo' when 2 then 'Referência Tabela' when 3 then 'Data' when 4 then 'Data Extenso' end as nome_tipo," +
        "case TB01141_TIPOTABELA when 0 then 'Individual' when 1 then 'Listagem Simples' when 2 then 'Listagem SQL' end as nome_exibe ",
      " TB01141_MODELO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);

        setColumns([
          { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 76 },
          { headerClassName: 'header-list', field: 'placeholder', headerName: 'PlaceHolder', width: 370 },
          { headerClassName: 'header-list', field: 'nome_tipo', headerName: 'Tipo Leitura', width: 166 },
          { headerClassName: 'header-list', field: 'nome_exibe', headerName: 'Tipo Exibição', width: 116 },
          { headerClassName: 'header-list', field: 'campo', headerName: 'Nome do Campo', width: 155 },
          { headerClassName: 'header-list', field: 'valor', headerName: 'Valor Fixo', width: 163 }
        ]);

        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    if (itemselec !== undefined && !inclusao) {
      valuesfield[0] = itemselec['codigo'];
      valuesfield[1] = itemselec['placeholder'];
      valuesfield[2] = itemselec['tipo'];
      valuesfield[3] = itemselec['tipotabela'];
      valuesfield[4] = itemselec['valor'];
      valuesfield[5] = itemselec['campo'];
      valuesfield[6] = itemselec['tamanho'];
      valuesfield[7] = itemselec['tabela'];
      valuesfield[8] = itemselec['campochave'];
      valuesfield[9] = itemselec['camporef'];
      valuesfield[10] = itemselec['tabela2'];
      valuesfield[11] = itemselec['campochave2'];
      valuesfield[12] = itemselec['camporef2'];
      valuesfield[13] = itemselec['sql'];
      valuesfield[14] = cabecalho[valuesname.indexOf('codigo')];
      setValuesfield([...valuesfield]);
    }
  }, [itemselec]);

  const Incluir = () => {
    valuesfield[0] = '';
    valuesfield[1] = '';
    valuesfield[2] = 0;
    valuesfield[3] = 0;
    valuesfield[4] = '';
    valuesfield[5] = '';
    valuesfield[6] = 0;
    valuesfield[7] = '';
    valuesfield[8] = '';
    valuesfield[9] = '';
    valuesfield[10] = '';
    valuesfield[11] = '';
    valuesfield[12] = '';
    valuesfield[13] = '';
    valuesfield[14] = cabecalho[valuesname.indexOf('codigo')];
    setValuesfield([...valuesfield]);
    apiID('PlaceHolder').then((response) => {
      if (response.status === 200) {
        valuesfield[0] = response.data.mensagem;
        setValuesfield([...valuesfield]);
        setDisabled(false);
        setInclusao(true);
        setShowsave(true);
      }
    });
  };

  const Excluir = () => {
    if (rows.length > 0 && valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmholder', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          let item = {};
          item['codigo'] = valuesfield[0];
          item['placeholder'] = valuesfield[1];
          item['tipo'] = valuesfield[2];
          item['tipotabela'] = valuesfield[3];
          item['valor'] = valuesfield[4];
          item['campo'] = valuesfield[5];
          item['tamanho'] = valuesfield[6];
          item['tabela'] = valuesfield[7];
          item['campochave'] = valuesfield[8];
          item['camporef'] = valuesfield[9];
          item['tabela2'] = valuesfield[10];
          item['campochave2'] = valuesfield[11];
          item['camporef2'] = valuesfield[12];
          item['sql'] = valuesfield[13];
          item['modelo'] = cabecalho[valuesname.indexOf('codigo')];
          apiDelete('PlaceHolder', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setItemselec(undefined);
                setDisabled(true);
                setShowsave(false);
                Filtrar();
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        }
      });
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser excluído !');
    }
  };

  const handleCloseShowsave = () => {
    setItemselec(undefined);
    setDisabled(true);
    setShowsave(false);
  };

  const dblClickGrid = (newSelection) => {
    setInclusao(false);
    setItemselec(newSelection);
    setShowsave(true);
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setInclusao(false);
      setItemselec(newSelection);
      setShowsave(true);
    }
    if (altproposta && (precontrato === '' || precontrato === undefined || precontrato === null)) {
      if (event.key === 'Delete') {
        setItemselec(newSelection);
        Excluir();
      }
    }
  };

  return (
    <React.Fragment>
      <div id="frmholder" name="frmholder">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginBottom: '20px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Listagem de PlaceHolder</Card.Title>
              </Card.Header>
              <AGGrid
                width="100%"
                height="360px"
                rows={rows}
                columns={columns}
                loading={carregando}
                onKeyDown={keyGrid}
                onDoubleClick={dblClickGrid}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
                //onCelClick={clickGrid}
              ></AGGrid>
            </Card>
          </Row>

          <Row style={{ textAlign: 'right', marginTop: '10px' }}>
            <Col>
              <Button id="btnIncluir" className="btn btn-primary  mb-2" onClick={Incluir}>
                <i className={'feather icon-star'} /> Novo
              </Button>
              <Button id="btnExcluir" className="btn btn-success  mb-2" disabled={!disabled} onClick={Excluir}>
                <i className={'feather icon-trash'} /> Excluir
              </Button>
            </Col>
          </Row>
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
        <div id="frmitem" name="frmitem">
          <Modal backdrop="static" size="xl" show={showsave} centered={true} onHide={handleCloseShowsave}>
            <Modal.Header className="h5" closeButton>
              <i className={'feather icon-external-link h1'} />
              &nbsp;Definição de PlaceHolder
            </Modal.Header>
            <ModalBody>
              <PlaceHolderField
                valuesfield={valuesfield}
                setValuesfield={(data) => setValuesfield(data)}
                valuesfield2={valuesfield2}
                setValuesfield2={(data) => setValuesfield2(data)}
                inclusao={inclusao}
                setInclusao={(data) => setInclusao(data)}
                itemselec={itemselec}
                setItemselec={(data) => setItemselec(data)}
                tabela={tabela}
                setTabela={(data) => setTabela(data)}
                showsave={showsave}
                setShowsave={(data) => setShowsave(data)}
                cabecalho={cabecalho}
                setCabecalho={(data) => setCabecalho(data)}
                valuesname={valuesname}
                setValuesname={(data) => setValuesname(data)}
              ></PlaceHolderField>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlaceHolder;
