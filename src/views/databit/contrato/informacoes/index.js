import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import ContratoTotal from './total';
import ContratoComissao from './comissao';
import ContratoApuracao from './apuracao';
import ContratoEndereco from './endereco';
import ContratoComplementar from './complementar';

const ContratoInformacoes = (props) => {
  const steps = ['Totalizadores', 'Definição de Endereços', 'Equipamentos / Serviços', 'Comissões', 'Outras Informações'];
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
        <ContratoTotal
          valuesfield={valuesfield}
          setValuesfield={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></ContratoTotal>
      ) : (
        <></>
      )}
      {activeStep === 1 ? (
        <ContratoEndereco
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></ContratoEndereco>
      ) : (
        <></>
      )}
      {activeStep === 2 ? (
        <ContratoApuracao
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></ContratoApuracao>
      ) : (
        <></>
      )}

      {activeStep === 3 ? (
        <ContratoComissao
          valuesfield={valuesfield}
          setValuesfield={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></ContratoComissao>
      ) : (
        <></>
      )}
      {activeStep === 4 ? (
        <ContratoComplementar
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></ContratoComplementar>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default ContratoInformacoes;
