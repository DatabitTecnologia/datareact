import React, { useEffect } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';

const Total = (props) => {
  const { cabecalho, table } = props;
  const { showtotal, setShowtotal } = props;
  const [fields, setFields] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [valuesfield, setValuesfield] = React.useState([]);

  useEffect(() => {
    setCarregando(true);
    apiList(
      'FieldFormVW',
      'TB00109_ORDEM,TB00109_TABELA,TB00109_CAMPO,TB00109_ISPRIMARY,TB00109_FUNCAO,TB00109_SELEC,TB00109_FORM,TB00109_TIPO,TB00109_TAMANHO,' +
        'TB00109_FOREIGN,TB00109_KEY,TB00109_TABELAREF,TB00109_CAMPOREF,TB00109_DESCRICAOREF,TB00109_ISFOREIGN,TB00109_TIPOOBJECT,TB00109_TIPOMASCARA,' +
        'TB00109_DECIMAL,TB00109_LARGURA,TB00109_VALUECHECKED,TB00109_VALUEUNCHECKED,TB00109_ITENS,TB00109_VALUES,TB00109_VIEW,TB00109_MASCARA,TB00109_TIPOMULT,' +
        'TB00109_DISABLEINSERT,TB00109_DISABLEUPDATE,TB00109_CAMPOLIST,TB00109_CAMPOREFDROP,TB00109_FILTERAUX,TB00109_CHARNORMAL',
      "cast(1 as int) as line, 13 as widthfield, '13rem' as measure, cast(TB00109_LARGURA - 10 as int) as widthname," +
        ' case TB00109_TIPOOBJECT ' +
        "      when 1 then 'Texto Simples' " +
        "      when 2 then 'Pesquisa' " +
        "      when 4 then 'Numérico' " +
        "      when 5 then 'Data' " +
        "      when 6 then 'Mult-Texto' " +
        "      when 8 then 'Texto Especial' " +
        ' end as nometipo, LOWER(SUBSTRING(TB00109_CAMPO,9,50)) as namefield, ' +
        "TB00003_SELEC2 as selec2, UPPER(TB00003_VALOR) as valor, isnull(TB00003_DIGITA,'S') as digita, " +
        'TB00003_SELEC3 as selec3, TB00003_SELEC4 as selec4,TB00003_SINAL as sinal,' +
        'TB00003_TIPOTAB as tipotab,TB00003_VALORVAL as valorval, TB00003_MENSAGEM as mensagem,TB00003_VOLTAR as voltar, cast(0 as int) as taborder, TB00003_CAMVAL1 as camval1',
      "TB00109_TABELA = '" +
        table +
        "' AND TB00109_TIPO IN ('int','numeric') and TB00109_SYSTEM = " +
        Decode64(sessionStorage.getItem('system')) +
        ' ORDER BY TB00109_FUNCAO '
    ).then((response) => {
      if (response.status === 200) {
        setFields(response.data);
        setCarregando(false);
      }
    });
  }, []);

  useEffect(() => {
    fields.forEach((item, index) => {
      valuesfield[index] = cabecalho[item.namefield];
    });
    setValuesfield([...valuesfield]);
  }, [fields]);

  return (
    <React.Fragment>
      <div id="frmtotal" name="frmtotal">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Totalizadores do movimento selecionado</Card.Title>
          </Card.Header>
          <Card.Body>
            {fields ? (
              <Row style={{ marginLeft: '1px' }}>
                {fields.map((field, index) => {
                  if (parseFloat(valuesfield[index]) > 0) {
                    return (
                      <CreateObject
                        key={index}
                        field={field}
                        index={field.id}
                        fields={fields}
                        valuesfield={valuesfield}
                        setValuesfield={setValuesfield}
                        disabled={true}
                      ></CreateObject>
                    );
                  }
                })}
              </Row>
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
        <Row style={{ textAlign: 'right', marginTop: '20px' }}>
          <Col>
            <Button id="btnFechar" className="btn-success shadow-2 mb-3" onClick={(e) => setShowtotal(false)}>
              <i className={'feather icon-x'} />
              Fechar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Total;
