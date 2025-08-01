import React, { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import { Row, Col, Button, Modal, ModalFooter, ModalBody, Alert, Card, Form } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiFind, apiGetPicture, apiInsert, apiUpdate, apiSetPicture } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';
import nopicture from '../../../../../assets/images/databit/nopicture.png';
import { getBase64 } from '../../../../../utils/crypto';
import { getCEP } from '../../../../../api/correios';
import Pointer from '../../../../../assets/images/databit/pointer_blue.png';
import { getZipCode } from '../../../../../api/location';
import { Decode64 } from '../../../../../utils/crypto';

const AnyReactComponent = ({ text }) => <img src={Pointer} alt="pointer" />;

const Composicaoselec = (props) => {
  const { itemselec, codcli } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [fieldsobs, setFieldsobs] = React.useState([]);
  const [fieldsaddress, setFieldsaddress] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [foto, setFoto] = React.useState();
  const [disabled, setDisabled] = React.useState(true);
  const [inclusao, setInclusao] = React.useState(false);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const { showselec, setShowselec } = props;
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [showfile, setShowfile] = useState(false);
  const [url, setUrl] = React.useState();
  const [img64, setImg64] = useState('');
  const [steps, setSteps] = React.useState([]);
  const [icons, setIcons] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [showmapa, setShowmapa] = React.useState(false);
  const [location, setLocation] = React.useState([]);


  useEffect(() => {
    let tmpsteps = [];
    let tmpicons = [];
    let tmpoptions = [];
    // Cabeçalho
    tmpsteps.push('Observações');
    tmpicons.push('feather icon-file-text');
    tmpoptions.push(0);

    tmpsteps.push('Localização');
    tmpicons.push('feather icon-map');
    tmpoptions.push(1);

    setSteps(tmpsteps);
    setIcons(tmpicons);
    setOptions(tmpoptions);

    setFields([
      { id: 0, campo: 'codigo', funcao: 'Código', tipo: 'varchar', nome: 'produto', tamanho: 5, tipoobject: 1, widthfield: 6, measure: '6rem', disabled: true },
      { id: 1, campo: 'referencia', funcao: 'Referência', tipo: 'varchar', nome: 'referencia', tamanho: 20, tipoobject: 1, widthfield: 15, measure: '21rem', disabled: true },
      { id: 2, campo: 'codbarras', funcao: 'Código Barras', tipo: 'varchar', nome: 'codbarras', tamanho: 20, tipoobject: 1, widthfield: 15, measure: '15rem', disabled: true },
      { id: 3, campo: 'codauxiliar', funcao: 'Código Auxiliar', tipo: 'varchar', nome: 'codauxiliar', tamanho: 20, tipoobject: 1, widthfield: 15, measure: '15rem', disabled: true },
      { id: 4, campo: 'unprod', funcao: 'UN', tipo: 'varchar', nome: 'unprod', tamanho: 60, tipoobject: 1, widthfield: 13, measure: '5rem', disabled: true },
      { id: 5, campo: 'qtde', funcao: 'Qtde', tipo: 'varchar', nome: 'marca', tamanho: 60, tipoobject: 1, widthfield: 13, measure: '5rem', disabled: true },
      { id: 6, campo: 'nome', funcao: 'Descrição Produto', tipo: 'varchar', nome: 'nomeproduto', tamanho: 60, tipoobject: 1, widthfield: 51, measure: '45rem', disabled: true },
      { id: 7, campo: 'grupo', funcao: 'Grupo', tipo: 'varchar', nome: 'grupo', tamanho: 60, tipoobject: 1, widthfield: 10, measure: '11rem', disabled: true, decimal: 2 },
      { id: 8, campo: 'subgrupo', funcao: 'Subgrupo', tipo: 'varchar', nome: 'subgrupo', tamanho: 60, tipoobject: 1, widthfield: 10, measure: '11rem', disabled: true },
    ]);

  }, []);

  useEffect(() => {
    if (itemselec === undefined) {
      setInclusao(true);
      setDisabled(false);
      setValuesdisable([
        false,
        false,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]);
    } else {
      setInclusao(false);
      setValuesdisable([
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
      ]);
      valuesfield[0] = itemselec.equipamento;
      valuesfield[1] = itemselec.produto;
      if (itemselec.dtinstalacao !== undefined && itemselec.dtinstalacao !== null) {
        const dt1 =
          itemselec.dtinstalacao.substring(3, 5) +
          '/' +
          itemselec.dtinstalacao.substring(0, 2) +
          '/' +
          itemselec.dtinstalacao.substring(6, 10);
        const datafim = new Date(dt1);
        valuesfield[6] = datafim;
      }
      if (itemselec.dtvalidade !== undefined && itemselec.dtvalidade !== null) {
        const dt1 =
          itemselec.dtvalidade.substring(3, 5) + '/' + itemselec.dtvalidade.substring(0, 2) + '/' + itemselec.dtvalidade.substring(6, 10);
        const datafim = new Date(dt1);
        valuesfield[7] = datafim;
      }
      valuesfield[8] = itemselec.pat;
      valuesfield[9] = itemselec.obs;
      valuesfield[10] = itemselec.cep;
      valuesfield[11] = itemselec.logradouro;
      valuesfield[12] = itemselec.num;
      valuesfield[13] = itemselec.comp;
      valuesfield[14] = itemselec.bairro;
      valuesfield[15] = itemselec.cidade;
      valuesfield[16] = itemselec.estado;
      valuesfield[17] = itemselec.fone;
      valuesfield[18] = itemselec.foneaux;
      valuesfield[19] = itemselec.whatsapp;
      valuesfield[20] = itemselec.contato;
      valuesfield[21] = itemselec.email;
      valuesfield[22] = itemselec.local;
      valuesfield[23] = itemselec.libleitura;
      setValuesfield([...valuesfield]);
    }
  }, [itemselec]);

  useEffect(() => {
    if (valuesfield[1] !== undefined) {
      const codprod = valuesfield[1];
      if (codprod.length === 5) {
        setCarregando(true);
        apiFind(
          'Produto',
          'TB01010_REFERENCIA,TB01010_CODBARRAS,TB01010_CODAUXILIAR,TB01010_MARCA',
          '',
          "TB01010_CODIGO = '" + codprod + "' "
        ).then((response) => {
          if (response.status === 200) {
            valuesfield[2] = response.data.referencia;
            valuesfield[3] = response.data.codbarras;
            valuesfield[4] = response.data.codauxiliar;
            const codmarca = response.data.marca;
            apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', codprod).then((response) => {
              setFoto(response.data[0].picture);
              apiFind('Marca', 'TB01047_NOME', '', "TB01047_CODIGO = '" + codmarca + "' ").then((response) => {
                if (response.status === 200) {
                  valuesfield[5] = response.data.nome;
                  setValuesfield([...valuesfield]);
                  setCarregando(false);
                }
              });
            });
          }
        });
      }
    }
  }, [valuesfield[1]]);

  useEffect(() => {
    if (!disabled) {
      let valor = valuesfield[10];
      if (valor !== undefined && valor !== '' && valor !== null) {
        if (valor.length === 8) {
          setCarregando(true);
          getCEP(valor).then((response) => {
            if (response.status === 200) {
              try {
                valuesfield[11] = response.data.logradouro.toUpperCase().substring(0, 60);
                valuesfield[14] = response.data.bairro.toUpperCase().substring(0, 30);
                valuesfield[15] = response.data.localidade.toUpperCase().substring(0, 30);
                valuesfield[16] = response.data.uf.toUpperCase();
              } catch (error) {
                setItemvariant(1);
                setMensagem('Endereço não encontrado !');
              }
              setCarregando(false);
            }
          });
        }
      }
    }
  }, [valuesfield[10]]);

  const Editar = () => {
    setInclusao(false);
    setDisabled(false);
    setValuesdisable([
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  };

  const Salvar = () => {
    if (valuesfield[0] === undefined || valuesfield[0] === '' || valuesfield[0] === null) {
      setItemvariant(1);
      setMensagem('Campo SERIAL é preenchimento obrigatório !');
    } else if (valuesfield[1] === undefined || valuesfield[1] === '' || valuesfield[1] === null) {
      setItemvariant(1);
      setMensagem('Campo PRODUTO é preenchimento obrigatório !');
    } else {
      let item = {};
      item['codcli'] = codcli;
      item['equipamento'] = valuesfield[0];
      item['produto'] = valuesfield[1];
      if (valuesfield[6] !== undefined) {
        const tmdata1 = Date.parse(valuesfield[6]);
        const dt1 = new Date(tmdata1);
        const data1 = dt1.toLocaleDateString('en-US');
        item['dtinstalacao'] = data1 + ' 00:00:00';
      }
      if (valuesfield[7] !== undefined) {
        const tmdata1 = Date.parse(valuesfield[7]);
        const dt1 = new Date(tmdata1);
        const data1 = dt1.toLocaleDateString('en-US');
        item['dtvalidade'] = data1 + ' 00:00:00';
      }
      item['pat'] = valuesfield[8];
      item['obs'] = valuesfield[9];
      item['cep'] = valuesfield[10];
      item['end'] = valuesfield[11];
      item['num'] = valuesfield[12];
      item['comp'] = valuesfield[13];
      item['bairro'] = valuesfield[14];
      item['cidade'] = valuesfield[15];
      item['estado'] = valuesfield[16];
      item['fone'] = valuesfield[17];
      item['foneaux'] = valuesfield[18];
      item['whatsapp'] = valuesfield[19];
      item['contato'] = valuesfield[20];
      item['email'] = valuesfield[21];
      item['local'] = valuesfield[22];
      item['libleitura'] = valuesfield[23];
      //console.log(item);
      setCarregando(true);
      if (inclusao) {
        apiInsert('ProdutoComposicao', item).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              setShowselec(false);
            }
          } else {
            setCarregando(false);
            setItemvariant(-1);
            setMensagem(response.data);
          }
        });
      } else {
        apiUpdate('ProdutoComposicao', item).then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            if (response.data.status === 1) {
              setShowselec(false);
            }
          } else {
            setCarregando(false);
            setItemvariant(-1);
            setMensagem(response.data);
          }
        });
      }
    }
  };

  const handleCloseShowFile = () => {
    setShowfile(false);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleClosemapa = () => {
    setShowmapa(false);
  };

  const salvarFoto = () => {
    setCarregando(true);
    apiSetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', valuesfield[0], img64).then((response) => {
      if (response.status === 200) {
        apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', valuesfield[0]).then((response) => {
          setFoto(response.data[0].picture);
          setCarregando(false);
          setShowfile(false);
        });
      }
    });
  };


  return (
    <React.Fragment>
      <div id="frmClienteEquipamentoselec" name="frmClienteEquipamentoselec">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Informações do Produto selecionado</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px' }}>
              <Col>
                <Row className='g-2'>
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
                      disabled={valuesdisable[field.id]}
                    ></CreateObject>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
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
              <Button id="btnEditprod" className="btn" disabled={!disabled} onClick={(e) => Editar()}>
                <i className={'feather icon-edit'} /> Editar
              </Button>
              <Button id="btnSalvprod" className="btn btn-success" disabled={disabled} onClick={(e) => Salvar()}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
              <Button id="btnCancprod" className="btn btn-warning" disabled={disabled} onClick={(e) => setShowselec(false)}>
                <i className={'feather icon-x'} /> Cancelar
              </Button>
            </Col>
          </Row>
        </Row>
        
       
      </div>
    </React.Fragment>
  );
};

export default Composicaoselec;
