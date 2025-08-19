import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import PropostaContrato from './contrato';
import PropostaTotal from './total';
import PropostaComissao from './comissao';
import PropostaEquipamento from './equipamento';
import PropostaEndereco from './endereco';
import PropostaComplementar from './complementar';

const OportunidadeProposta = (props) => {
  const steps = [
    'Dados Cadastrais',
    'Totalizadores',
    'Definição de Endereços',
    'Equipamentos / Serviços',
    'Comissões',
    'Outras Informações'
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const { valuesfield, setValuesfield } = props; // Valores dos campos
  const { valuesname, setValuesname } = props; // Nomes dos campos
  const [completed, setCompleted] = React.useState({});

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <React.Fragment>
      <Box sx={{ width: '100%', marginBottom: '15px' }}>
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
        <PropostaContrato
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PropostaContrato>
      ) : (
        <></>
      )}
      {activeStep === 1 ? (
        <PropostaTotal
          valuesfield={valuesfield}
          setValuesfield={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PropostaTotal>
      ) : (
        <></>
      )}
      {activeStep === 2 ? (
        <PropostaEndereco
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PropostaEndereco>
      ) : (
        <></>
      )}
      {activeStep === 3 ? (
        <PropostaEquipamento
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PropostaEquipamento>
      ) : (
        <></>
      )}

      {activeStep === 4 ? (
        <PropostaComissao
          valuesfield={valuesfield}
          setValuesfield={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PropostaComissao>
      ) : (
        <></>
      )}
      {activeStep === 5 ? (
        <PropostaComplementar
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PropostaComplementar>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default OportunidadeProposta;

/*
<React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button className="btn" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Anterior
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button className="btn" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Próximo' : 'Próximo'}
            </Button>
          </Box>
        </React.Fragment>
*/
