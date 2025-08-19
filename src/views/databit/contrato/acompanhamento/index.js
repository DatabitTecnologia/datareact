import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFind } from '../../../../api/crudapi';
import AcompanhamentoFranquia from './franquia';
import AcompanhamentoFatura from './fatura';
import AcompanhamentoRequisicao from './requisicao';
import AcompanhamentoOs from './os';
import AcompanhamentoLucro from './lucro';
import AcompanhamentoProducao from './producao';
import AcompanhamentoFinanceiro from './financeiro';
import { Password } from '../../../../components/Password';

const ContratoAcompanhamento = (props) => {
  const [steps, setSteps] = React.useState([
    'Franquia/Observações',
    'Faturamento',
    'Requisições',
    'Ordens de Serviço',
    'Lucratividade',
    'Produção',
    'Financeiro'
  ]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [carregando, setCarregando] = React.useState(false);
  const [contrato, setContrato] = React.useState([]);
  const [fieldscontrato, setFieldscontrato] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [senhafin, setSenhafin] = React.useState([]);

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
    setCarregando(true);
    apiFind('Contrato', '*', '', "TB02111_CODIGO = '" + props.contrato + "' ").then((response) => {
      if (response.status === 200) {
        setCarregando(false);
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
    apiFind('Senha', 'TB00008_ATIVO,TB00008_SENHA,TB00008_FUNCAO', '', 'TB00008_ID = 113').then((response) => {
      if (response.status === 200) {
        setSenhafin(response.data);
      }
    });
  }, [contrato]);

  const handleStep = (step) => () => {
    if (step === 1 || step === 4 || step === 6) {
      Password('frmacompanhamento', senhafin.senha, 113, senhafin.funcao, senhafin.ativo === 'S').then((result) => {
        if (!result.isConfirmed) {
          setActiveStep(0);
        } else {
          setActiveStep(step);
        }
      });
    } else {
      setActiveStep(step);
    }
  };

  return (
    <React.Fragment>
      <div id="frmacompanhamento" name="frmacompanhamento">
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
        <Box sx={{ width: '100%', marginTop: '3px', marginBottom: '13px' }}>
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
          <AcompanhamentoFranquia contrato={contrato} setContrato={(data) => setContrato(data)}></AcompanhamentoFranquia>
        ) : (
          <></>
        )}
        {activeStep === 1 ? (
          <AcompanhamentoFatura contrato={contrato} setContrato={(data) => setContrato(data)}></AcompanhamentoFatura>
        ) : (
          <></>
        )}
        {activeStep === 2 ? (
          <AcompanhamentoRequisicao contrato={contrato} setContrato={(data) => setContrato(data)}></AcompanhamentoRequisicao>
        ) : (
          <></>
        )}
        {activeStep === 3 ? <AcompanhamentoOs contrato={contrato} setContrato={(data) => setContrato(data)}></AcompanhamentoOs> : <></>}
        {activeStep === 4 ? (
          <AcompanhamentoLucro contrato={contrato} setContrato={(data) => setContrato(data)}></AcompanhamentoLucro>
        ) : (
          <></>
        )}
        {activeStep === 5 ? (
          <AcompanhamentoProducao contrato={contrato} setContrato={(data) => setContrato(data)}></AcompanhamentoProducao>
        ) : (
          <></>
        )}
        {activeStep === 6 ? (
          <AcompanhamentoFinanceiro contrato={contrato} setContrato={(data) => setContrato(data)}></AcompanhamentoFinanceiro>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
};

export default ContratoAcompanhamento;
