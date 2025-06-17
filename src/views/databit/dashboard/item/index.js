import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiInsert, apiUpdate, apiFind } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import DashboardColor from '../color';
import { getRandomColor } from '../../../../utils/color';
import DashboardImage from '../image';

const DashboardItem = (props) => {
  const { itemselec, dashboard, setItemselec, rows, setRows, showitem, setShowitem } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [disable, setDisabled] = React.useState(true);
  const [showcolor, setShowcolor] = React.useState(false);
  const handleCloseShowcolor = () => setShowcolor(false);
  const [inclusao, setInclusao] = React.useState(false);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [typesname, setTypesname] = React.useState('');
  const [typesoption, setTypesoption] = React.useState('');
  const [mixed, setMixed] = React.useState(false);
  const [typecolor, setTypecolor] = React.useState(1);
  const [showimage, setShowimage] = React.useState(false);
  const handleCloseShowimage = () => setShowimage(false);

  useEffect(() => {
    setMixed(dashboard.tipo >= 30 && dashboard.tipo <= 33);
    switch (dashboard.tipo) {
      case 30: {
        setTypesname('Linha,Coluna');
        setTypesoption('0,1');
        break;
      }
      case 31: {
        setTypesname('Linha,Coluna');
        setTypesoption('0,1');
        break;
      }
      case 32: {
        setTypesname('Linha,Área');
        setTypesoption('0,2');
        break;
      }
      case 33: {
        setTypesname('Linha,Coluna,Área');
        setTypesoption('0,1,2');
        break;
      }
    }
  }, []);

  useEffect(() => {
    let tamlegenda = '47rem';
    if (mixed) {
      tamlegenda = '36rem';
    }
    let tmpfields = [
      {
        id: 0,
        campo: 'TB00116_QUERY',
        funcao: 'Defina a Query',
        tipo: 'varchar',
        nome: 'query',
        tipoobject: 2,
        tamanho: 6,
        widthfield: 49,
        measure: '49rem',
        tabelaref: 'TB00113',
        widthname: 38,
        disable: disable
      },
      {
        id: 1,
        campo: 'TB00116_CAMPOX',
        funcao: 'Campo Eixo X',
        tipo: 'varchar',
        nome: 'campox',
        tamanho: 50,
        tipoobject: 1,
        widthfield: 18,
        measure: '18rem',
        disable: disable
      },
      {
        id: 2,
        campo: 'TB00116_TITULOX',
        funcao: 'Título Eixo X',
        tipo: 'varchar',
        nome: 'titulox',
        tamanho: 50,
        tipoobject: 1,
        widthfield: 29,
        measure: '29rem',
        disable: disable,
        charnormal: true
      },
      {
        id: 3,
        campo: 'TB00116_CAMPOY',
        funcao: 'Campo Eixo Y',
        tipo: 'varchar',
        nome: 'campoy',
        tamanho: 50,
        tipoobject: 1,
        widthfield: 18,
        measure: '18rem',
        disable: disable
      },
      {
        id: 4,
        campo: 'TB00116_TITULOY',
        funcao: 'Título Eixo Y',
        tipo: 'varchar',
        nome: 'tituloy',
        tamanho: 50,
        tipoobject: 1,
        widthfield: 29,
        measure: '29rem',
        disable: disable,
        charnormal: true
      },
      {
        id: 5,
        campo: 'TB00116_CAMPOVALOR',
        funcao: 'Campo Valor',
        tipo: 'varchar',
        nome: 'campovalor',
        tamanho: 50,
        tipoobject: 1,
        widthfield: 18,
        measure: '18rem',
        disable: disable
      },
      {
        id: 6,
        campo: 'TB00116_RANKING',
        funcao: 'Ranking',
        tipo: 'varchar',
        nome: 'ranking',
        tamanho: 50,
        tipoobject: 4,
        widthfield: 6,
        measure: '6rem',
        disable: disable,
        charnormal: true
      },
      {
        id: 7,
        campo: 'TB00116_CAMPOORDEM',
        funcao: 'Ordenar/Agrupar pelo Campo',
        tipo: 'varchar',
        nome: 'campoordem',
        tamanho: 50,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disable: disable
      },
      {
        id: 11,
        campo: 'OPCAO',
        funcao: 'Tipo Ordem',
        tipo: 'varchar',
        nome: 'modulo',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 10,
        measure: '10rem',
        itens: 'Crescente,Decrescente',
        values: 'ASC,DESC',
        disabled: disable
      },
      {
        id: 8,
        campo: 'TB00116_NOME',
        funcao: 'Legenda',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 48,
        measure: tamlegenda,
        disable: disable,
        charnormal: true
      },
      {
        id: 12,
        campo: 'TB00116_TYPE',
        funcao: 'Tipo Objeto',
        tipo: 'int',
        nome: 'type',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 11,
        measure: '11rem',
        itens: typesname,
        values: typesoption,
        disable: disable
      },
      {
        id: 9,
        campo: 'TB00116_PARAM',
        funcao: 'Parâmetro Padrão',
        tipo: 'int',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 1,
        measure: '12rem',
        valuechecked: 1,
        valueunchecked: 0,
        disable: disable
      }
    ];
    if (!mixed) {
      tmpfields = tmpfields.filter((field) => field.id < 12);
    }
    setFields(tmpfields);
  }, [typesoption]);

  useEffect(() => {
    setDisabled(itemselec !== undefined);
    setInclusao(itemselec === undefined);
    if (itemselec !== undefined) {
      valuesfield[0] = itemselec.query;
      valuesfield[1] = itemselec.campox;
      valuesfield[2] = itemselec.titulox;
      valuesfield[3] = itemselec.campoy;
      valuesfield[4] = itemselec.tituloy;
      valuesfield[5] = itemselec.campovalor;
      valuesfield[6] = itemselec.ranking;
      valuesfield[7] = itemselec.campoordem;
      valuesfield[8] = itemselec.nome;
      valuesfield[9] = parseInt(itemselec.param);
      valuesfield[10] = itemselec.color;
      valuesfield[11] = itemselec.tipoordem;
      valuesfield[12] = itemselec.type;
      valuesfield[13] = itemselec.colortitle;
      valuesfield[14] = itemselec.idquery;
    } else {
      valuesfield[6] = 10;
    }
    setValuesfield([...valuesfield]);
  }, [itemselec]);

  useEffect(() => {
    if (parseInt(valuesfield[9]) === 1 && valuesfield[0] !== undefined) {
      setCarregando(true);
      apiFind(
        'DashboardQuery',
        '*',
        '',
        "TB00116_DASHBOARD = '" + dashboard.codigo + "' and TB00116_PARAM = 1 and TB00116_QUERY <> '" + valuesfield[0] + "'"
      ).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          if (response.data) {
            setItemvariant(1);
            setMensagem('Já existe uma query como parâmetro padrão !');
            valuesfield[9] = 0;
            setValuesfield([...valuesfield]);
          }
        }
      });
    }
  }, [valuesfield[9]]);

  const Salvar = () => {
    if (document.getElementById('TB00116_QUERY').value === undefined || document.getElementById('TB00116_QUERY').value === '') {
      setItemvariant(1);
      setMensagem('Query é preenchimento obrigatório !');
      document.getElementById('TB00116_QUERY').focus();
    } else if (document.getElementById('TB00116_CAMPOX').value === undefined || document.getElementById('TB00116_CAMPOX').value === '') {
      setItemvariant(1);
      setMensagem('Campo X é preenchimento obrigatório !');
      document.getElementById('TB00116_CAMPOX').focus();
    } else if (document.getElementById('TB00116_TITULOX').value === undefined || document.getElementById('TB00116_TITULOX').value === '') {
      setItemvariant(1);
      setMensagem('Título X é preenchimento obrigatório !');
      document.getElementById('TB00116_TITULOX').focus();
    } else if (document.getElementById('TB00116_CAMPOY').value === undefined || document.getElementById('TB00116_CAMPOY').value === '') {
      setItemvariant(1);
      setMensagem('Campo Y é preenchimento obrigatório !');
      document.getElementById('TB00116_CAMPOY').focus();
    } else if (document.getElementById('TB00116_TITULOY').value === undefined || document.getElementById('TB00116_TITULOY').value === '') {
      setItemvariant(1);
      setMensagem('Título Y é preenchimento obrigatório !');
      document.getElementById('TB00116_TITULOY').focus();
    } else if (
      document.getElementById('TB00116_CAMPOVALOR').value === undefined ||
      document.getElementById('TB00116_CAMPOVALOR').value === ''
    ) {
      setItemvariant(1);
      setMensagem('Campo Valor é preenchimento obrigatório !');
      document.getElementById('TB00116_CAMPOVALOR').focus();
    } else if (document.getElementById('TB00116_RANKING').value === undefined || document.getElementById('TB00116_RANKING').value === '') {
      setItemvariant(1);
      setMensagem('Ranking é preenchimento obrigatório !');
      document.getElementById('TB00116_RANKING').focus();
    } else if (document.getElementById('TB00116_NOME').value === undefined || document.getElementById('TB00116_NOME').value === '') {
      setItemvariant(1);
      setMensagem('Legenda é preenchimento obrigatório !');
      document.getElementById('TB00116_NOME').focus();
    } else if (
      document.getElementById('TB00116_CAMPOORDEM').value === undefined ||
      document.getElementById('TB00116_CAMPOORDEM').value === ''
    ) {
      setItemvariant(1);
      setMensagem('Campo Ordem é preenchimento obrigatório !');
      document.getElementById('TB00116_CAMPOORDEM').focus();
    } else {
      setCarregando(true);
      let item = {};
      item['dashboard'] = dashboard.codigo;
      item['query'] = valuesfield[0];
      item['campox'] = valuesfield[1];
      item['titulox'] = valuesfield[2];
      item['campoy'] = valuesfield[3];
      item['tituloy'] = valuesfield[4];
      item['campovalor'] = valuesfield[5];
      item['ranking'] = valuesfield[6];
      item['campoordem'] = valuesfield[7];
      item['nome'] = valuesfield[8];
      item['param'] = valuesfield[9];
      item['tipoordem'] = valuesfield[11];
      if (mixed) {
        item['type'] = valuesfield[12];
      }
      if (valuesfield[10] !== undefined && valuesfield[10] !== null && valuesfield[10] !== '') {
        item['color'] = valuesfield[10];
      } else {
        item['color'] = getRandomColor();
      }
      if (valuesfield[13] !== undefined && valuesfield[13] !== null && valuesfield[13] !== '') {
        item['colortitle'] = valuesfield[13];
      } else {
        item['colortitle'] = '#fff';
      }
      console.log(item);
      if (inclusao) {
        item['ordem'] = rows.length + 1;
        apiInsert('DashboardQuery', item).then((response) => {
          if (response.status === 200) {
            setCarregando(false);
            setShowitem(false);
          }
        });
      } else {
        item['idquery'] = itemselec.idquery;
        apiUpdate('DashboardQuery', item).then((response) => {
          if (response.status === 200) {
            setCarregando(false);
            setShowitem(false);
          }
        });
      }
    }
  };

  const defineColor = (type) => {
    setTypecolor(type);
    setShowcolor(true);
  };

  return (
    <React.Fragment>
      <div id="frmdashquery" name="frmdashquery">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">{itemselec === undefined ? 'Nova Consulta' : 'Consulta selecionada'}</Card.Title>
          </Card.Header>

          <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '20px' }}>
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
                disabled={disable}
              ></CreateObject>
            ))}
          </Row>
        </Card>

        <Row style={{ textAlign: 'center', marginTop: '20px' }}>
          <Col>
            <Button id="btnEditar" className="btn shadow-2 mb-2" disabled={!disable} onClick={(e) => setDisabled(false)}>
              <i className={'feather icon-edit'} /> Editar
            </Button>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" disabled={disable} onClick={(e) => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={(e) => setShowitem(false)} disabled={disable}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
            <Button id="btnColor" className="btn btn-primary shadow-2 mb-2" onClick={(e) => defineColor(1)} disabled={disable}>
              <i className={'feather icon-loader'} /> Color
            </Button>
            {parseInt(dashboard.tipo) === 42 ? (
              <Button id="btnColor2" className="btn btn-primary shadow-2 mb-2" onClick={(e) => defineColor(2)} disabled={disable}>
                <i className={'feather icon-loader'} /> Color Title
              </Button>
            ) : (
              <></>
            )}
            {parseInt(dashboard.tipo) === 42 ? (
              <Button id="btnImage" className="btn btn-primary shadow-2 mb-2" onClick={(e) => setShowimage(true)} disabled={!disable}>
                <i className={'feather icon-camera'} /> Imagem
              </Button>
            ) : (
              <></>
            )}
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
      <Modal backdrop="static" size="sm" show={showcolor} centered={true} onHide={handleCloseShowcolor}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-loader h1'} />
          &nbsp;Definir Cor
        </Modal.Header>
        <ModalBody>
          <DashboardColor
            itemselec={itemselec}
            valuesfield={valuesfield}
            setValuesfield={(data) => setValuesfield(data)}
            showcolor={showcolor}
            setShowcolor={(data) => setShowcolor(data)}
            typecolor={typecolor}
          ></DashboardColor>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="lg" show={showimage} centered={true} onHide={handleCloseShowimage}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-camera h1'} />
          &nbsp;Definir Imagem
        </Modal.Header>
        <ModalBody>
          <DashboardImage valuesfield={valuesfield} setValuesfield={(data) => setValuesfield(data)}></DashboardImage>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default DashboardItem;
