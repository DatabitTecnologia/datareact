import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiGetPicture } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import AGGrid from '../../../../components/AGGrid';
import nopicture from '../../../../assets/images/databit/nopicture.png';

const MovimentacaoConsultaItem = (props) => {
  const { codigo, tipo } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [foto, setFoto] = React.useState();

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'produto', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 140 },
      {
        headerClassName: 'header-list',
        field: 'nome',
        headerName: 'Descrição Produto',
        width: 325
      },
      { headerClassName: 'header-list', field: 'unprod', headerName: 'UN', width: 60 },
      { headerClassName: 'header-list', field: 'qtprod', headerName: 'Qtde.', width: 80, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'perdesc', headerName: 'Desc.', width: 70, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'totvalor', headerName: 'Liquido.', width: 100, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'vlrimpostos', headerName: 'Impostos.', width: 100, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'vlrtotal', headerName: 'R$ Total', width: 100, type: 'number', decimal: 2 }
    ]);

    setFields([
      {
        id: 17,
        campo: 'codigo',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 6,
        tipoobject: 1,
        widthfield: 6,
        measure: '6rem',
        disabled: false
      },
      {
        id: 0,
        campo: 'produto',
        funcao: 'Produto',
        tipo: 'varchar',
        nome: 'produto',
        tamanho: 5,
        tipoobject: 1,
        widthfield: 45,
        measure: '45rem',
        disabled: false
      },
      {
        id: 1,
        campo: 'referencia',
        funcao: 'Referência',
        tipo: 'varchar',
        nome: 'referencia',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 11,
        measure: '11rem',
        disabled: false
      },
      {
        id: 2,
        campo: 'codbarras',
        funcao: 'Código Barras',
        tipo: 'varchar',
        nome: 'codbarras',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 11,
        measure: '11rem',
        disabled: false
      },
      {
        id: 3,
        campo: 'codauxiliar',
        funcao: 'Código Auxiliar',
        tipo: 'varchar',
        nome: 'codauxiliar',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 11,
        measure: '11rem',
        disabled: false
      },
      /*
      {
        id: 4,
        campo: 'marca',
        funcao: 'Marca',
        tipo: 'varchar',
        nome: 'marca',
        tamanho: 21,
        tipoobject: 1,
        widthfield: 16,
        measure: '21rem',
        disabled: false
      },*/
      {
        id: 5,
        campo: 'qtprod',
        funcao: 'Quantidade',
        tipo: 'numeric',
        nome: 'qtprod',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 9,
        measure: '9rem',
        disabled: false,
        decimal: 3
      },
      {
        id: 6,
        campo: 'prunit',
        funcao: 'Preço Unitário',
        tipo: 'numeric',
        nome: 'marca',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 9,
        measure: '9rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 7,
        campo: 'vlrdesc',
        funcao: 'Valor Desconto',
        tipo: 'numeric',
        nome: 'vlrdesc',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 8,
        campo: 'totvalor',
        funcao: 'Valor Líquido',
        tipo: 'numeric',
        nome: 'totvalor',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 9,
        campo: 'vlricms',
        funcao: 'Valor ICMS',
        tipo: 'numeric',
        nome: 'vlricms',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 10,
        campo: 'vlripi',
        funcao: 'Valor IPI',
        tipo: 'numeric',
        nome: 'vlripi',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 11,
        campo: 'vlrst',
        funcao: 'Valor ST',
        tipo: 'numeric',
        nome: 'vlrst',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 12,
        campo: 'vlrfcp',
        funcao: 'Valor FCP',
        tipo: 'numeric',
        nome: 'vlrfcp',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 13,
        campo: 'vlrfcptotst',
        funcao: 'Valor FCP ST',
        tipo: 'numeric',
        nome: 'vlrfcptotst',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 14,
        campo: 'vlrfree',
        funcao: 'Valor Frete',
        tipo: 'numeric',
        nome: 'vlrfrete',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 15,
        campo: 'vlroutdesp',
        funcao: 'Valor Despesas',
        tipo: 'numeric',
        nome: 'vlroutdesp',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 16,
        campo: 'vlrtotal',
        funcao: 'Valor Total',
        tipo: 'numeric',
        nome: 'vlrtotal',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: false,
        decimal: 2
      }
    ]);
  }, []);

  useEffect(() => {
    setCarregando(true);
    apiList('ConsultaMovimentoItemVW', '*', '', "CODIGO = '" + codigo + "' AND TIPO = " + tipo).then((response) => {
      setRows(response.data);
      setCarregando(false);
    });
  }, [fields]);

  useEffect(() => {
    if (itemselec !== undefined) {
      valuesfield[0] = itemselec.nome;
      valuesfield[1] = itemselec.referencia;
      valuesfield[2] = itemselec.codbarras;
      valuesfield[3] = itemselec.codauxiliar;
      valuesfield[4] = itemselec.nomemarca;
      valuesfield[5] = itemselec.qtprod;
      valuesfield[6] = itemselec.prunit;
      valuesfield[7] = itemselec.vlrdesc;
      valuesfield[8] = itemselec.totvalor;
      valuesfield[9] = itemselec.vlricms;
      valuesfield[10] = itemselec.vlripi;
      valuesfield[11] = itemselec.vlrst;
      valuesfield[12] = itemselec.vlrfcp;
      valuesfield[13] = itemselec.vlrfcptotst;
      valuesfield[14] = itemselec.vlrfrete;
      valuesfield[15] = itemselec.vlroutdesp;
      valuesfield[16] = itemselec.vlrtotal;
      valuesfield[17] = itemselec.produto;

      setValuesfield([...valuesfield]);
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.produto).then((response) => {
        setFoto(response.data[0].picture);
        setCarregando(false);
      });
    }
  }, [itemselec]);

  return (
    <React.Fragment>
      <div id="frmclienteprodutoselec" name="frmclienteprodutoselec">
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px', marginTop: '-15px' }}>
          <AGGrid
            width="100%"
            height="280px"
            rows={rows}
            columns={columns}
            loading={carregando}
            item={itemselec}
            setItem={(data) => setItemselec(data)}
            focus={true}
          ></AGGrid>
        </Row>
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Informações do Produto selecionado</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px' }}>
              <Col lg={2}>
                <Row style={{ width: '100%', textAlign: 'center' }}>
                  <Col>
                    {foto === undefined || foto === '' || foto === null ? (
                      <img src={nopicture} alt="foto" width={'230px'} height={'230px'} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${foto}`} alt="foto" width={'230px'} height={'230px'} />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row style={{ marginLeft: '65px', marginRight: '5px', marginBottom: '5px' }}>
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
          </Card>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default MovimentacaoConsultaItem;
