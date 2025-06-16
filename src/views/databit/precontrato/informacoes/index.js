import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import PreContratoTotal from './total';
import PreContratoComissao from './comissao';
import PreContratoEquipamento from './equipamento';
import PreContratoEndereco from './endereco';
import PreContratoComplementar from './complementar';

const PreContratoInformacoes = (props) => {
  const steps = ['Totalizadores', 'Definição de Endereços', 'Equipamentos / Serviços', 'Comissões', 'Outras Informações'];
  const [activeStep, setActiveStep] = React.useState(0);
  const { valuesfield, setValuesfield } = props; // Valores dos campos
  const { valuesname, setValuesname } = props; // Nomes dos campos
  const [completed, setCompleted] = React.useState({});

  const handleStep = (step) => () => {
    console.log(step);
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
        <PreContratoTotal
          valuesfield={valuesfield}
          setValuesfield={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PreContratoTotal>
      ) : (
        <></>
      )}
      {activeStep === 1 ? (
        <PreContratoEndereco
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PreContratoEndereco>
      ) : (
        <></>
      )}
      {activeStep === 2 ? (
        <PreContratoEquipamento
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PreContratoEquipamento>
      ) : (
        <></>
      )}

      {activeStep === 3 ? (
        <PreContratoComissao
          valuesfield={valuesfield}
          setValuesfield={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PreContratoComissao>
      ) : (
        <></>
      )}
      {activeStep === 4 ? (
        <PreContratoComplementar
          cabecalho={valuesfield}
          setCabecalho={(data) => setValuesfield(data)}
          valuesname={valuesname}
          setValuesname={(data) => setValuesname(data)}
        ></PreContratoComplementar>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default PreContratoInformacoes;
