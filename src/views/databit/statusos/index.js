import React from 'react';
import Cadastro from '../cadastro';

const StatusOs = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Status de OS"
        table="TB01073"
        object="TB01073"
        classname="OsStatus"
        classobject="OsStatus"
        termlist="OsStatus"
        moduleoption="30"
        primarykey="TB01009_CODIGO"
        fieldsdefault="TB01009_CODIGO,TB01009_NOME"
      />
    </React.Fragment>
  );
};

export default StatusOs;
