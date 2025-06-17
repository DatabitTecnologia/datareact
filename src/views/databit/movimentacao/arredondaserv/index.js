import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiUpdate } from '../../../../api/crudapi';

const ArredondaServ = (props) => {
  const { cabecalho, itemselec, classserv, fieldsarredondaserv } = props;
  const { showarredonda, setShowarredonda } = props;
  const [valuesfield, setValuesfield] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  useEffect(() => {
    fieldsarredondaserv.forEach((item, index) => {
      const field = item.campo;
      valuesfield[index] = itemselec[field];
    });
    setValuesfield([...valuesfield]);
  }, [fieldsarredondaserv]);

  useEffect(() => {
    const posicao = fieldsarredondaserv.findIndex((x) => x.campo === 'manual');
    if (posicao > -1) {
      setDisabled(valuesfield[posicao] === 'N' || valuesfield[posicao] === undefined);
    }
  }, [valuesfield]);

  const Salvar = () => {
    setCarregando(true);
    let itemsave = {};
    itemsave['codigo'] = cabecalho.codigo;
    itemsave['codcli'] = '00000000';
    itemsave['grupo'] = '000000';
    itemsave['codserv'] = itemselec.codserv;
    const keys = Object.keys(itemselec);
    keys.forEach((campo) => {
      if (campo.toLowerCase().endsWith('b')) {
        const campofim = campo.slice(0, -1);
        itemsave[campo] = itemselec[campofim] ?? 0;
      }
    });
    fieldsarredondaserv.forEach((item, index) => {
      const field = item.campo;
      itemsave[field] = valuesfield[index];
    });
    apiUpdate(classserv, itemsave).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setShowarredonda(false);
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmarredonda" name="frmarredonda">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Lançamento de Valores</Card.Title>
          </Card.Header>
          <Card.Body>
            {fieldsarredondaserv ? (
              <Row style={{ marginLeft: '1px' }}>
                {fieldsarredondaserv.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldsarredondaserv}
                    valuesfield={valuesfield}
                    setValuesfield={setValuesfield}
                    disabled={field.campo !== 'manual' ? disabled : false}
                  />
                ))}
              </Row>
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
        <Row style={{ textAlign: 'right', marginTop: '20px' }}>
          <Col>
            <Button id="btnConfirmar" className="btn-primary shadow-2 mb-3" onClick={(e) => Salvar()}>
              <i className={'feather icon-save'} />
              Salvar
            </Button>
            <Button id="btnCancelar" className="btn-success shadow-2 mb-3" onClick={(e) => setShowarredonda(false)}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ArredondaServ;
