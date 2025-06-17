import React from 'react';
import Cadastro from '../cadastro';
import { Decode64 } from '../../../utils/crypto';

const PreContrato = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Pré-Contratos"
        table="TB02264"
        object="VW02280"
        classname="Precontrato"
        classobject="PrecontratoVW"
        termlist="Pré-Contrato"
        moduleoption="10"
        primarykey="TB02264_CODIGO"
        fieldsdefault="TB02264_CODIGO,TB02264_NOME,TB02264_CODEMP3,TB02264_CODCLI,TB01008_NOME,TB02264_OPORTUNIDADE,TB02264_QTDECONTRATA,
                       TB02266_VLRCONTRATA,TB02264_CONTATO,TB01128_NOME,TB02264_STATUS,TB01136_NOME,TB02264_TIPOPRE,TB01138_NOME"
        filterseller={Decode64(sessionStorage.getItem('manager')) === 'N' && Decode64(sessionStorage.getItem('seller')) !== 'ZZZZ'}
        setFilterseller={(data) => setFilterseller(data)}
        codseller={'CODVEN'}
        setCodseller={(data) => setCodseller(data)}
      />
    </React.Fragment>
  );
};

export default PreContrato;
