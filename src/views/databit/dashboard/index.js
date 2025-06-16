import React from 'react';
import Cadastro from '../cadastro';

const Dashboard = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Criação de Dashboards"
        table="TB00115"
        object="TB00115"
        classname="Dashboard"
        classobject="Dashboard"
        termlist="Dashboard"
        moduleoption="18"
        primarykey="TB00115_CODIGO"
        fieldsdefault="TB00115_CODIGO,TB00115_NOME"
      />
    </React.Fragment>
  );
};

export default Dashboard;
