import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiExec } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import AGGrid from '../../../../components/AGGrid';
import { zeroLeft } from '../../../../utils/zeroleft';
import { Decode64 } from '../../../../utils/crypto';

const PartnerConcluir = (props) => {
  const { compra, parceiro, status, valor, validar, setValidar } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [fieldsgera, setFieldsgera] = React.useState([]);
  const [valuesfieldgera, setValuesfieldgera] = React.useState([]);
  const [valuesfieldgera2, setValuesfieldgera2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);
  const [disabledgera, setDisabledgera] = React.useState(true);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [itemselec, setItemselec] = React.useState();

  useEffect(() => {
    setValuesdisable([true, true, true, true, true, true]);
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'ID', width: 90 },
      { headerClassName: 'header-list', field: 'numtitulo', headerName: 'Título', width: 120 },
      { headerClassName: 'header-list', field: 'dtvenc', headerName: 'Vencimento', width: 100, type: 'date' },
      { headerClassName: 'header-list', field: 'vlrtitulo', headerName: 'Valor', width: 115, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'nometipo', headerName: 'Tipo Documento', width: 280 }
    ]);
    setFieldsgera([
      {
        id: 0,
        campo: 'ntfisc',
        funcao: 'Nota Fiscal',
        tipo: 'varchar',
        nome: 'ntfisc',
        tamanho: 10,
        tipoobject: 1,
        widthfield: 8,
        measure: '8rem',
        disabled: disabledgera
        //methodBlur: notaFiscal
      },
      {
        id: 1,
        campo: 'condpag',
        funcao: 'Condição',
        tipo: 'varchar',
        nome: 'condpag',
        tipoobject: 2,
        tamanho: 3,
        widthfield: 36,
        measure: '37rem',
        tabelaref: 'TB01014',
        widthname: 28,
        disabled: disabledgera,
        filteraux:
          " AND (EXISTS (SELECT 1 FROM TB01153 WHERE TB01153_CONDPAG = TB01014_CODIGO AND TB01153_CODCLI = '" +
          parceiro +
          "') AND TB01014_CODIGO IN (SELECT TB01153_CONDPAG FROM TB01153 WHERE TB01153_CODCLI = '" +
          parceiro +
          "')) OR NOT EXISTS (SELECT 1 FROM TB01153 WHERE TB01153_CODCLI = '" +
          parceiro +
          "')"
      }
    ]);

    setFields([
      {
        id: 0,
        campo: 'codigo',
        funcao: 'ID',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 1,
        tamanho: 8,
        widthfield: 9,
        measure: '9rem',
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'dtvenc',
        funcao: 'Vencimento',
        tipo: 'datetime',
        nome: 'dtvenc',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'tipodoc',
        funcao: 'Tipo Documento',
        tipo: 'varchar',
        nome: 'tipodoc',
        tipoobject: 2,
        tamanho: 3,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB04003',
        widthname: 23,
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'vlrdoc',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrdoc',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        decimal: 2,
        disabled: valuesdisable[3]
      }
    ]);
  }, []);

  /*const notaFiscal = () => {
    console.log(valuesfieldgera[0]);
    let valor = valuesfieldgera[0];
    console.log(valor);
    if (valor !== undefined && valor !== '' && valor !== null) {
      valor = zeroLeft(valor, 10);
      console.log(valor);
    }
  };*/

  const Salvar = () => {
    if (valuesfieldgera[0] === undefined || valuesfieldgera[0] === '' || valuesfieldgera[0] === null) {
      setItemvariant(1);
      setMensagem('Campo Nota Fiscal é preenchimento obrigatório !');
      document.getElementById('ntfisc').focus();
    } else if (valuesfieldgera[1] === undefined || valuesfieldgera[1] === '' || valuesfieldgera[1] === null) {
      setItemvariant(1);
      setMensagem('Campo Condição é preenchimento obrigatório !');
      document.getElementById('condpag').focus();
    } else {
      valuesfieldgera[0] = zeroLeft(valuesfieldgera[0], 10);
      setValuesfieldgera([...valuesfieldgera]);
      setCarregando(true);
      apiExec(
        "EXEC SP02300 '" +
          compra +
          "','" +
          parceiro +
          "','" +
          Decode64(sessionStorage.getItem('user')) +
          "','" +
          valuesfieldgera[0] +
          "','" +
          valuesfieldgera[1] +
          "','" +
          status +
          "'",
        'N'
      ).then((response) => {
        if (response.status === 200) {
          apiList('PartnerParcelaVW', '*', '', "compra = '" + compra + "' and codcli = '" + parceiro + "'").then((response) => {
            if (response.status === 200) {
              setRows(response.data);
              setCarregando(false);
              setDisabledgera(true);
              setValidar(true);
            }
          });
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div id="frmconcluir" name="frmconcluir">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginBottom: '20px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações Nota Fiscal / Condição</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '1px' }}>
                {fieldsgera.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldsgera}
                    valuesfield={valuesfieldgera}
                    setValuesfield={(data) => setValuesfieldgera(data)}
                    valuesfield2={valuesfieldgera2}
                    setValuesfield2={(data) => setValuesfieldgera2(data)}
                    disabled={disabledgera}
                  ></CreateObject>
                ))}
              </Row>
            </Card>
          </Row>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Listagem das Parcelas</Card.Title>
              </Card.Header>
              <Row>
                <AGGrid
                  width="100%"
                  height="400px"
                  rows={rows}
                  columns={columns}
                  loading={carregando}
                  item={itemselec}
                  setItem={(data) => setItemselec(data)}
                  focus={true}
                  disabled={!disabledgera}
                ></AGGrid>
              </Row>
            </Card>
          </Row>
        </Row>
        <hr></hr>
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
        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
          <Row style={{ textAlign: 'rigth' }}>
            <Col>
              <Button id="btnEditar" className="btn" disabled={!disabledgera} onClick={(e) => setDisabledgera(false)}>
                <i className={'feather icon-edit'} /> Editar
              </Button>
              <Button id="btnSalvar" className="btn btn-success" disabled={disabledgera} onClick={(e) => Salvar()}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
              <Button id="btnCancelar" className="btn btn-warning" disabled={disabledgera} onClick={(e) => setDisabledgera(true)}>
                <i className={'feather icon-x'} /> Cancelar
              </Button>
            </Col>
          </Row>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default PartnerConcluir;
