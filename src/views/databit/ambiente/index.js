import React, { useEffect } from 'react';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiDelete, apiInsert, apiFind, apiUpdate } from '../../../api/crudapi';
import { Confirmation } from '../../../components/Confirmation';
import AGGrid from '../../../components/AGGrid';
import { Decode64 } from '../../../utils/crypto';
import { CreateObject } from '../../../components/CreateObject';

const Ambiente = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [disabled, setDisabled] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [itemselec, setItemselec] = React.useState();
  const { showambiente, setShowambiente } = props;

  useEffect(() => {
    /*setCarregando(true);
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      if (key !== undefined && key !== null) {
        key = '!!' + key.toUpperCase() + '!!';
        let value = '';
        try {
          value = Decode64(sessionStorage.getItem(sessionStorage.key(i)));
        } catch (error) {
          //console.log(error);
        }
        apiFind('Ambiente', '*', '', "TB00057_SESSION = '" + key + "' ").then((response) => {
          if (response.status === 200) {
            let item = {};
            item['session'] = key;
            item['valor'] = value;
            item['iditem'] = response.data.iditem;
            if (response.data !== undefined || response.data !== '' || response.data !== null) {
              apiUpdate('Ambiente', item).then((response) => {
                Filtrar();
              });
            }
          }
        });
      }
    }*/
    setFields([
      {
        id: 0,
        campo: 'TB00057_VALOR',
        funcao: 'Valor Variável',
        tipo: 'text',
        nome: 'valor',
        tamanho: 60,
        tipoobject: 6,
        disabled: true,
        widthfield: 40,
        measure: '40rem'
      }
    ]);
    Filtrar();
  }, []);

  useEffect(() => {
    if (itemselec !== undefined) {
      if (itemselec.valor !== undefined && itemselec.valor !== null && itemselec.valor !== '') {
        valuesfield[0] = itemselec.valor;
      } else {
        valuesfield[0] = '';
      }
      setValuesfield([...valuesfield]);
    }
  }, [itemselec]);

  const Filtrar = () => {
    setCarregando(true);
    apiList('Ambiente', '*', '', ' 0 = 0 order by TB00057_SESSION').then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setColumns([
          { headerClassName: 'header-list', field: 'session', headerName: 'Variável', width: 250 },
          { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição da Variável', width: 796 }
        ]);
        setCarregando(false);
      }
    });
  };

  const Excluir = () => {
    if (rows.length > 0 && itemselec !== undefined) {
      Confirmation('frmambiente', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          let item = {};
          item['iditem'] = itemselec.iditem;
          apiDelete('Ambiente', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setItemselec(undefined);
                setDisabled(true);
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

  const Carregar = () => {
    setCarregando(true);
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      if (key !== undefined && key !== null) {
        key = '!!' + key.toUpperCase() + '!!';
        let value = '';
        try {
          value = Decode64(sessionStorage.getItem(sessionStorage.key(i)));
        } catch (error) {
          console.log(error);
        }
        apiFind('Ambiente', '*', '', "TB00057_SESSION = '" + key + "' ").then((response) => {
          if (response.status === 200) {
            let item = {};
            item['session'] = key;
            item['valor'] = value;
            console.log(response.data);
            if (response.data === undefined || response.data === '' || response.data === null) {
              apiInsert('Ambiente', item).then((response) => {
                if (response.status === 200) {
                  console.log(response.data);
                }
              });
            } else {
              item['iditem'] = response.data.iditem;
              apiUpdate('Ambiente', item).then((response) => {
                if (response.status === 200) {
                  console.log(response.data);
                }
              });
            }
          }
        });
      }
    }
    setCarregando(false);
    Filtrar();
  };

  return (
    <React.Fragment>
      <div id="frmambiente" name="frmambiente">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginBottom: '20px' }}>
          <Row style={{ marginBottom: '10px' }}>
            <Card className="Recent-Users" style={{ marginBottom: '10px' }}>
              <Card.Header>
                <Card.Title as="h5">Listagem de Variáveis</Card.Title>
              </Card.Header>
              <Row style={{ marginBottom: '10px' }}>
                <AGGrid
                  width="100%"
                  height="510px"
                  rows={rows}
                  columns={columns}
                  loading={carregando}
                  item={itemselec}
                  setItem={(data) => setItemselec(data)}
                  focus={true}
                ></AGGrid>
              </Row>
            </Card>
          </Row>

          <Row style={{ textAlign: 'right' }}>
            <Col>
              {Decode64(sessionStorage.getItem('user')) === 'SIDNEY.DB' ? (
                <Button id="btnExcluir" className="btn btn-success mb-2" onClick={(e) => Excluir()}>
                  <i className={'feather icon-trash'} /> Excluir
                </Button>
              ) : (
                <></>
              )}
              {Decode64(sessionStorage.getItem('user')) === 'SIDNEY.DB' ? (
                <Button id="btnCarregar" className="btn btn-warning mb-2" onClick={(e) => Carregar()}>
                  <i className={'feather icon-repeat'} /> Carregar
                </Button>
              ) : (
                <></>
              )}
              <Button id="btnFechar" className="btn btn-primary mb-2" onClick={(e) => setShowambiente(false)}>
                <i className={'feather icon-x'} /> Fechar
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
      </div>
    </React.Fragment>
  );
};

export default Ambiente;
