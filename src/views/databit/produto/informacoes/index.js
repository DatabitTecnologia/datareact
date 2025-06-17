import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFind, apiGetPicture } from '../../../../api/crudapi';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import ProdutoObs from '../obs';
import ProdutoEstoque from '../estoque';
import ProdutoSerial from '../serial';

const ProdutoInfor = (props) => {
  const steps = ['Observações Normal', 'Observações Interna', 'Observações NFe', 'Posição Estoque', 'Seriais'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [carregando, setCarregando] = React.useState(false);
  const [completed, setCompleted] = React.useState({});
  const { produto } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [prodselec, setProdselec] = React.useState([]);
  const [foto, setFoto] = React.useState();

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB01010_CODIGO',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 5,
        tipoobject: 1,
        widthfield: 6,
        measure: '6rem',
        disabled: true
      },
      {
        id: 1,
        campo: 'TB01010_REFERENCIA',
        funcao: 'Referência',
        tipo: 'varchar',
        nome: 'referencia',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 14,
        measure: '14rem',
        disabled: true
      },
      {
        id: 2,
        campo: 'TB01010_CODBARRAS',
        funcao: 'Código Barras',
        tipo: 'varchar',
        nome: 'codbarras',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 14,
        measure: '14rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'TB01010_CODAUXILIAR',
        funcao: 'Código Auxiliar',
        tipo: 'varchar',
        nome: 'codauxiliar',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 14,
        measure: '14rem',
        disabled: true
      },
      {
        id: 4,
        campo: 'TB01010_NOME',
        funcao: 'Descrição Produto',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 36,
        measure: '36rem',
        disabled: true
      },
      {
        id: 5,
        campo: 'TB01010_RESUMIDO',
        funcao: 'Descrição Resumida',
        tipo: 'varchar',
        nome: 'resumido',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 32,
        measure: '32rem',
        disabled: true
      },
      {
        id: 6,
        campo: 'TB01010_GRUPO',
        funcao: 'Grupo',
        tipo: 'varchar',
        nome: 'grupo',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 29,
        measure: '29rem',
        tabelaref: 'TB01002',
        widthname: 20,
        disabled: true
      },
      {
        id: 7,
        campo: 'TB01010_SUBGRUPO',
        funcao: 'Subgrupo',
        tipo: 'varchar',
        nome: 'subgrupo',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 29,
        measure: '29rem',
        tabelaref: 'TB01018',
        widthname: 20,
        disabled: true
      },

      {
        id: 8,
        campo: 'TB01010_MARCA',
        funcao: 'Marca',
        tipo: 'varchar',
        nome: 'marca',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 29,
        measure: '29rem',
        tabelaref: 'TB01047',
        widthname: 20,
        disabled: true
      },
      {
        id: 9,
        campo: 'TB01010_LOCPPROD',
        funcao: 'Local',
        tipo: 'varchar',
        nome: 'locpprod',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 29,
        measure: '29rem',
        tabelaref: 'TB01003',
        widthname: 20,
        disabled: true
      }
    ]);
    setCarregando(true);
    apiFind(
      'Produto',
      'TB01010_CODIGO,TB01010_REFERENCIA,TB01010_CODBARRAS,TB01010_CODAUXILIAR,TB01010_NOME,TB01010_RESUMIDO,TB01010_GRUPO,TB01010_SUBGRUPO,TB01010_MARCA,TB01010_LOCPPROD,TB01010_OBS,TB01010_OBSINT,TB01010_OBSNF',
      '',
      "TB01010_CODIGO = '" + produto + "' "
    ).then((response) => {
      if (response.status === 200) {
        setProdselec(response.data);
        apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', produto).then((response) => {
          if (response.status === 200) {
            setFoto(response.data[0].picture);
            setCarregando(false);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    valuesfield[0] = prodselec.codigo;
    valuesfield[1] = prodselec.referencia;
    valuesfield[2] = prodselec.codbarras;
    valuesfield[3] = prodselec.codauxiliar;
    valuesfield[4] = prodselec.nome;
    valuesfield[5] = prodselec.resumido;
    valuesfield[6] = prodselec.grupo;
    valuesfield[7] = prodselec.subgrupo;
    valuesfield[8] = prodselec.marca;
    valuesfield[9] = prodselec.locpprod;
    valuesfield[10] = prodselec.obs;
    valuesfield[11] = prodselec.obsint;
    valuesfield[12] = prodselec.obsnf;
    if (valuesfield[10] === undefined || valuesfield[10] === null) {
      valuesfield[10] = '';
    }
    if (valuesfield[11] === undefined || valuesfield[11] === null) {
      valuesfield[11] = '';
    }
    if (valuesfield[12] === undefined || valuesfield[12] === null) {
      valuesfield[12] = '';
    }
    setValuesfield([...valuesfield]);
  }, [prodselec]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <React.Fragment>
      <div id="frminforprod" name="frminforprod">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col style={{ marginLeft: '10px', marginBottom: '4px', marginTop: '-20px' }}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações Cadastrais</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '3px' }}>
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
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={2} style={{ width: '30%', marginLeft: '10px', marginBottom: '4px' }}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Foto do Produto</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row style={{ width: '100%', textAlign: 'center' }}>
                  <Col>
                    {foto === undefined || foto === '' || foto === null ? (
                      <img src={nopicture} alt="foto" width={'79%'} height={'372px'} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${foto}`} alt="foto" width={'79%'} height={'372px'} />
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ width: '70%', marginLeft: '10px', marginBottom: '4px' }}>
            <Box sx={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {activeStep === 0 ? (
              <ProdutoObs
                optionselec={0}
                valuesfield={valuesfield}
                setValuesfield={(data) => setValuesfield(data)}
                valuesfield2={valuesfield2}
                setValuesfield2={(data) => setValuesfield2(data)}
              ></ProdutoObs>
            ) : (
              <></>
            )}
            {activeStep === 1 ? (
              <ProdutoObs
                optionselec={1}
                valuesfield={valuesfield}
                setValuesfield={(data) => setValuesfield(data)}
                valuesfield2={valuesfield2}
                setValuesfield2={(data) => setValuesfield2(data)}
              ></ProdutoObs>
            ) : (
              <></>
            )}
            {activeStep === 2 ? (
              <ProdutoObs
                optionselec={2}
                valuesfield={valuesfield}
                setValuesfield={(data) => setValuesfield(data)}
                valuesfield2={valuesfield2}
                setValuesfield2={(data) => setValuesfield2(data)}
              ></ProdutoObs>
            ) : (
              <></>
            )}
            {activeStep === 3 ? <ProdutoEstoque produto={produto}></ProdutoEstoque> : <></>}
            {activeStep === 4 ? <ProdutoSerial produto={produto}></ProdutoSerial> : <></>}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ProdutoInfor;
