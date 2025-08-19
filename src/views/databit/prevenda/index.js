import React from 'react';
import Cadastro from '../cadastro';
import { Decode64 } from '../../../utils/crypto';

const Prevenda = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Controle de Pré-Vendas"
        table="TB02303"
        object="VW02317"
        classname="Prevenda"
        classobject="PrevendaVW"
        termlist="Pré-Vendas"
        moduleoption="26"
        primarykey="TB02303_CODIGO"
        fieldsdefault="TB02303_CODIGO,TB02303_DATA,TB02303_CODCLI,TB01008_NOME,TB02303_QTDE,TB01127_VLRBRUTO,TB02303_VLRNOTA,TB02303_PREVISAO,TB02303_NUMORC"
        filterseller={Decode64(sessionStorage.getItem('manager')) === 'N' && Decode64(sessionStorage.getItem('seller')) !== 'ZZZZ'}
        setFilterseller={(data) => setFilterseller(data)}
        codseller={'CODVEN'}
        setCodseller={(data) => setCodseller(data)}
      />
    </React.Fragment>
  );
};

export default Prevenda;
