import React from 'react';
import Cadastro from '../cadastro';
import { Decode64 } from '../../../utils/crypto';

const Prospect = () => {
  return (
    <React.Fragment>
      <Cadastro
        title="Clientes Prospect"
        table="TB01127"
        object="VW01124"
        classname="Prospect"
        classobject="ProspectVW"
        termlist="Clientes Prospect"
        moduleoption="2"
        primarykey="TB01127_CODIGO"
        fieldsdefault="TB01127_CODIGO,TB01127_NOME,TB00012_FONE,TB00012_CELULAR,TB00012_WHATSAPP,TB00012_CONTATO,TB01127_NIVEL,TB01127_VENDEDOR"
        filterseller={Decode64(sessionStorage.getItem('manager')) === 'N' && Decode64(sessionStorage.getItem('seller')) !== 'ZZZZ'}
        setFilterseller={(data) => setFilterseller(data)}
        codseller={'VENDEDOR'}
        setCodseller={(data) => setCodseller(data)}
        // Campanhas
        fieldemail="TB00012_EMAIL"
        fieldwhats="TB00012_CELULAR2"
        possuicampanhas={true}
        tabcampanha="TB01127"
        classcampanha="Prospect"
      />
    </React.Fragment>
  );
};

export default Prospect;
