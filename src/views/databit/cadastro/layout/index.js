import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import GroupForm from '../groupform';
import DefForm from '../defform';
import FieldsForm from '../fieldsform';

const Layout = (props) => {
  const steps = ['Grupos de formulários', 'Definição de formulários', 'Definição de campos'];
  const { table, object, primarykey, modulo } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [primaryfim, setPrimaryfim] = React.useState('');

  useEffect(() => {
    let listpk = primarykey.split(',');
    let pkfim = '';
    listpk.forEach((campo) => {
      pkfim += table + '_' + campo + ',';
    });
    pkfim = pkfim.slice(0, -1);
    setPrimaryfim(pkfim);
  }, []);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <React.Fragment>
      <div>
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
        {activeStep === 0 ? <GroupForm object={table} view={object} modulo={modulo}></GroupForm> : <></>}
        {activeStep === 1 ? <DefForm object={table}></DefForm> : <></>}
        {activeStep === 2 ? <FieldsForm table={table} object={object} primarykey={primaryfim}></FieldsForm> : <></>}
      </div>
    </React.Fragment>
  );
};

export default Layout;
