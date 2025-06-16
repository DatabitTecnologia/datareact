import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiUpdate } from '../../../../api/crudapi';

const FreteDesp = (props) => {
  const { cabecalho, config, tablemov, itens, classcab, classitem } = props;
  const { showfretedesp, setShowfretedesp } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'VLRFRETE',
        funcao: 'Valor Frete',
        tipo: 'numeric',
        nome: 'vlfrete',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: false,
        decimal: 2
      },
      {
        id: 1,
        campo: 'VLROUTDESP',
        funcao: 'Valor Outras Despesas',
        tipo: 'numeric',
        nome: 'vlroutdesp',
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
    setValuesfield([cabecalho.vlrfrete2, cabecalho.vlroutdesp2]);
  }, [cabecalho]);

  const Confirmar = () => {
    let itemcab = {};
    itemcab['codigo'] = cabecalho.codigo;
    itemcab['vlrfrete2'] = parseFloat(valuesfield[0]);
    itemcab['vlroutdesp2'] = parseFloat(valuesfield[1]);
    setCarregando(true);
    apiUpdate(classcab, itemcab).then((response) => {
      if (response.status === 200) {
        let itemfim = [];
        itemfim = itemfim.concat(itens);
        itemfim = itemfim.sort((a, b) => b.totvalor - a.totvalor);
        const totfrete = parseFloat(valuesfield[0]);
        const totoutdesp = parseFloat(valuesfield[1]);
        const totbruto = parseFloat(cabecalho.vlrbruto);
        let somafrete = 0.0;
        let somadesp = 0.0;
        const promises = itemfim.map((item, index) => {
          return new Promise((resolve, reject) => {
            let itemsave = {};
            const keys = Object.keys(item);
            keys.forEach((campo) => {
              if (campo.toLowerCase().endsWith('b')) {
                const campofim = campo.slice(0, -1);
                itemsave[campo] = item[campofim] ?? 0;
              }
            });
            itemsave['codigo'] = cabecalho.codigo;
            itemsave['codemp'] = cabecalho.codemp;
            itemsave['produto'] = item.produto;

            // Cálculo Frete
            let percfrete = (parseFloat(item.totvalor) / totbruto) * 100;
            let vlrfrete = ((totfrete * percfrete) / 100).toFixed(2);
            somafrete += parseFloat(vlrfrete);
            let dif = 0.0;
            if (index + 1 === itemfim.length) {
              if (somafrete !== totfrete) {
                dif = parseFloat((totfrete - somafrete).toFixed(2));
              }
            }
            itemsave['vlrfrete'] = parseFloat(vlrfrete) + dif;

            // Calculo Outras Despesas
            let percoutdesp = (parseFloat(item.totvalor) / totbruto) * 100;
            let vlroutdesp = ((totoutdesp * percoutdesp) / 100).toFixed(2);
            somadesp += parseFloat(vlroutdesp);
            dif = 0.0;
            if (index + 1 === itemfim.length) {
              if (somadesp !== totoutdesp) {
                dif = parseFloat((totoutdesp - somadesp).toFixed(2));
              }
            }
            itemsave['vlroutdesp'] = parseFloat(vlroutdesp) + dif;

            setCarregando(true);
            apiUpdate(classitem, itemsave)
              .then((response) => {
                if (response.status === 200) {
                  resolve(); // Resolve a promessa quando o update for bem-sucedido
                } else {
                  reject(new Error('Erro na atualização do item'));
                }
              })
              .catch((error) => {
                reject(error); // Caso haja um erro na requisição
              });
          });
        });

        // Espera todas as promessas se resolverem para então executar o setShowdesconto(false)
        Promise.all(promises)
          .then(() => {
            setShowfretedesp(false);
            setCarregando(false); // Finaliza o carregamento
          })
          .catch((error) => {
            setCarregando(false); // Finaliza o carregamento mesmo em caso de erro
            console.error(error); // Loga o erro para depuração
          });
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmfretedesp" name="frmfretedesp">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Lançamento de Valores</Card.Title>
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
            <Button id="btnConfirmar" className="btn-primary shadow-2 mb-3" onClick={() => Confirmar()}>
              <i className={'feather icon-check'} />
              Confirmar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default FreteDesp;
