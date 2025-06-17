import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiUpdate } from '../../../../api/crudapi';

const ComissaoItem = (props) => {
  const { cabecalho, itemselec, classitem } = props;
  const { showcomissao, setShowcomissao } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'COMISSAO',
        funcao: '% Comissão',
        tipo: 'numeric',
        nome: 'comissao',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: false,
        decimal: 2
      }
    ]);
  }, []);

  useEffect(() => {
    setValuesfield([itemselec.comissao]);
  }, [itemselec]);

  const Salvar = () => {
    setCarregando(true);
    let itemsave = {};
    itemsave['codigo'] = cabecalho.codigo;
    itemsave['codemp'] = cabecalho.codemp;
    itemsave['produto'] = itemselec.produto;
    itemsave['comissao'] = parseFloat(valuesfield[0]);
    const keys = Object.keys(itemselec);
    keys.forEach((campo) => {
      if (campo.toLowerCase().endsWith('b')) {
        const campofim = campo.slice(0, -1);
        itemsave[campo] = itemselec[campofim] ?? 0;
      }
    });
    apiUpdate(classitem, itemsave).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setShowcomissao(false);
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmcomissao" name="frmcomissao">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Comissão do Item</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              {fields.map((field, index) => (
                <CreateObject
                  key={index}
                  field={field}
                  index={field.id}
                  fields={fields}
                  valuesfield={valuesfield}
                  setValuesfield={setValuesfield}
                  disabled={field.disabled}
                />
              ))}
            </Row>
          </Card.Body>
        </Card>
        <Row style={{ textAlign: 'center', marginTop: '20px' }}>
          <Col>
            <Button id="btnSalvar" className="btn-primary shadow-2 mb-3" onClick={() => Salvar()}>
              <i className={'feather icon-save'} />
              Confirmar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ComissaoItem;
