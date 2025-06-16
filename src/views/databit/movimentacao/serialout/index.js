import React, { useEffect, useRef } from 'react';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiExec, apiGetPicture, apiInsert, apiDelete, apiFind } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import AGGrid from '../../../../components/AGGrid';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import { Message } from '../../../../components/Message';

const SerialOut = (props) => {
  const { cabecalho, table, itemselec } = props;
  const { showserial, setShowserial } = props;
  const { rows, setRows } = props;
  const { qtlanc, setQtlanc } = props;
  const [columns, setColumns] = React.useState([]);
  const [columns2, setColumns2] = React.useState([]);

  const [rows2, setRows2] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [foto, setFoto] = React.useState();
  const [serial, setSerial] = React.useState();
  const [serial2, setSerial2] = React.useState();
  const [findserial, setFindserial] = React.useState();
  const [findserial2, setFindserial2] = React.useState();
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'numserie', headerName: 'Serial', width: 160 },
      { headerClassName: 'header-list', field: 'dtvalidadefim', headerName: 'Validade', width: 106, type: 'date' },
      { headerClassName: 'header-list', field: 'saldo', headerName: 'Quant', width: 70, type: 'number' },
      { headerClassName: 'header-list', field: 'nomesituacao', headerName: 'Situação Atual', width: 120 }
    ]);

    setColumns2([
      { headerClassName: 'header-list', field: 'numserie', headerName: 'Serial', width: 160 },
      { headerClassName: 'header-list', field: 'dtvalidadefim', headerName: 'Validade', width: 106, type: 'date' },
      { headerClassName: 'header-list', field: 'qtprod', headerName: 'Quant', width: 70, type: 'number' },
      { headerClassName: 'header-list', field: 'nomesituacao', headerName: 'Situação Atual', width: 120 }
    ]);

    setFields([
      {
        id: 0,
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
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        campo: 'qtlanc',
        funcao: 'Quant. Lançada',
        tipo: 'numeric',
        nome: 'qtlanc',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 9,
        measure: '9rem',
        disabled: false,
        decimal: 3
      }
    ]);
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (itemselec !== undefined) {
      valuesfield[0] = itemselec.produto;
      valuesfield[1] = itemselec.nomeprod;
      valuesfield[2] = itemselec.referencia;
      valuesfield[3] = itemselec.codbarras;
      valuesfield[4] = itemselec.codauxiliar;
      valuesfield[5] = itemselec.qtprod;
      valuesfield[6] = qtlanc;
      setCarregando(true);
      setValuesfield([...valuesfield]);
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.produto).then((response) => {
        setFoto(response.data[0].picture);
        Filtrar();
      });
    }
  }, [itemselec]);

  useEffect(() => {
    setQtlanc(rows2.reduce((soma, item) => soma + item.qtprod, 0));
  }, [rows2]);

  useEffect(() => {
    valuesfield[6] = qtlanc;
    setValuesfield([...valuesfield]);
  }, [qtlanc]);

  const Filtrar = (focused = false, operation = 0) => {
    setCarregando(true);
    apiExec("EXEC SP02309 '" + table + "', '" + itemselec.produto + "', '" + cabecalho.codemp + "' ", 'S').then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        apiExec(
          "EXEC SP02310 '" + table + "', '" + itemselec.produto + "', '" + cabecalho.codemp + "', '" + cabecalho.codigo + "' ",
          'S'
        ).then((response) => {
          setRows2(response.data);
          setCarregando(false);
          if (focused) {
            switch (operation) {
              case 1: {
                inputRef.current.focus();
                break;
              }
              case 2: {
                inputRef2.current.focus();
                break;
              }
            }
          }
        });
      }
    });
  };

  const handleChangeserial = (e) => {
    setFindserial(e.target.value);
  };

  const handleChangeserial2 = (e) => {
    setFindserial2(e.target.value);
  };

  const Add = (item, focused = false) => {
    if (item !== undefined) {
      let itemsave = item;
      itemsave['codigo'] = cabecalho.codigo;
      itemsave['tabela'] = table;
      itemsave['operacao'] = 'S';
      itemsave['qtprodb'] = 0;
      itemsave['codemp2'] = cabecalho.codemp;
      itemsave['codigo2'] = cabecalho.codigo;
      itemsave['nomestatus'] = item.nomesituacao;
      const tmdata1 = Date.parse(item.dtvalidadefim);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');
      itemsave['dtvalidade'] = data1;
      const tmdata2 = Date.parse(item.dtfabricacaofim);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      itemsave['dtfabricacao'] = data2;
      itemsave['qtprod'] = item.saldo;
      setCarregando(true);
      apiInsert('SerialMov', itemsave).then((response) => {
        if (response.status === 200) {
          Filtrar(focused, 1);
        }
      });
    }
  };

  const Substract = (item, focused = false) => {
    if (item !== undefined) {
      setCarregando(true);
      apiDelete('SerialMov', item).then((response) => {
        if (response.status === 200) {
          Filtrar(focused, 2);
        }
      });
    }
  };

  const clickGrid = (newSelection) => {
    setSerial(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    Add(newSelection);
  };

  const keyGrid = (newSelection, event) => {
    setSerial(newSelection);
    if (event.key === 'Enter') {
      Add(newSelection);
    }
  };

  const clickGrid2 = (newSelection) => {
    setSerial2(newSelection);
  };

  const dblClickGrid2 = (newSelection) => {
    Substract(newSelection);
  };

  const keyGrid2 = (newSelection, event) => {
    setSerial2(newSelection);
    if (event.key === 'Enter') {
      Substract(newSelection);
    }
  };

  const Fechar = async () => {
    if (qtlanc !== itemselec.qtprod && rows.length > 0) {
      await Message(
        'frmserialout',
        '',
        'warning',
        'A quantidade de número de serie, está diferente que a quantidade lançada no produto ! !'
      );
    } else {
      setShowserial(false);
    }
  };

  const handleFindserial = async () => {
    if (findserial !== '' && findserial !== undefined && findserial !== null) {
      const itemfind = rows.filter((item) => item.numserie === findserial);
      if (itemfind !== undefined && itemfind.length > 0) {
        setFindserial('');
        Add(itemfind[0], true);
      } else {
        setFindserial('');
        await Message('frmserialout', '', 'warning', 'Serial não existente ! !');
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }
  };

  const handleKeyDownSerial = (e) => {
    if (e.key === 'Enter') {
      handleFindserial();
    }
  };

  const handleFindserial2 = async () => {
    if (findserial2 !== '' && findserial2 !== undefined && findserial2 !== null) {
      const itemfind = rows2.filter((item) => item.numserie === findserial2);
      if (itemfind !== undefined && itemfind.length > 0) {
        setFindserial2('');
        Substract(itemfind[0], true);
      } else {
        setFindserial2('');
        await Message('frmserialout', '', 'warning', 'Serial não existente ! !');
        if (inputRef2.current) {
          inputRef2.current.focus();
        }
      }
    }
  };

  const handleKeyDownSerial2 = (e) => {
    if (e.key === 'Enter') {
      handleFindserial2();
    }
  };

  return (
    <React.Fragment>
      <div id="frmserialout" name="frmserialout">
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
                      <img src={nopicture} alt="foto" width={'230px'} height={'130px'} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${foto}`} alt="foto" width={'230px'} height={'170px'} />
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

            <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px', marginTop: '5px', textAlign: 'center' }}>
              <Col>
                <Row style={{ marginTop: '6px', marginBottom: '6px', width: '500px' }}>
                  <input
                    id="edtprocurar"
                    name="edtprocurar"
                    onChange={(e) => handleChangeserial(e)}
                    onBlur={handleFindserial}
                    style={{ width: '480px', marginLeft: '10px', marginBottom: '6px' }}
                    className="form-control"
                    placeholder="Serial à procurar"
                    value={findserial}
                    ref={inputRef}
                    onKeyDown={handleKeyDownSerial}
                  />
                  <AGGrid
                    width="100%"
                    height="350px"
                    rows={rows}
                    columns={columns}
                    loading={carregando}
                    item={serial}
                    setItem={(data) => setSerial(data)}
                    onKeyDown={keyGrid}
                    onDoubleClick={dblClickGrid}
                    onCelClick={clickGrid}
                  ></AGGrid>
                </Row>
              </Col>
              <Col style={{ marginLeft: '10px' }}>
                <Row style={{ marginTop: '70px', width: '50px' }}>
                  <Button id="btnAddlist" className="btn-icon" onClick={() => Add(serial)}>
                    <i className={'feather icon-chevron-right'} />
                  </Button>
                  <Button id="btnRetlist" className="btn-icon" onClick={() => Substract(serial2)}>
                    <i className={'feather icon-chevron-left'} />
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row style={{ marginTop: '6px', marginBottom: '6px', width: '500px' }}>
                  <Col>
                    <input
                      id="edtprocurar2"
                      name="edtprocurar2"
                      onChange={(e) => handleChangeserial2(e)}
                      onBlur={handleFindserial2}
                      style={{ width: '480px', marginBottom: '6px' }}
                      className="form-control"
                      placeholder="Serial à procurar"
                      value={findserial2}
                      ref={inputRef2}
                      onKeyDown={handleKeyDownSerial2}
                    />
                  </Col>
                  <AGGrid
                    width="100%"
                    height="350px"
                    rows={rows2}
                    columns={columns2}
                    loading={carregando}
                    item={serial2}
                    setItem={(data) => setSerial2(data)}
                    onKeyDown={keyGrid2}
                    onDoubleClick={dblClickGrid2}
                    onCelClick={clickGrid2}
                  ></AGGrid>
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'right' }}>
          <Col style={{ textAlign: 'right' }}>
            <Button id="btnFechar" className="btn-success shadow-2 mb-2" onClick={(e) => Fechar()}>
              <i className={'feather icon-x'} /> Fechar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default SerialOut;
