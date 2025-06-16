import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiUpdate } from '../../../../../api/crudapi';
import { descontoMaximoFull } from '..';

const DescontoFull = (props) => {
  const { cabecalho, config, tablemov, itens, classcab, classitem } = props;
  const { showdesconto, setShowdesconto } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TIPODESC',
        funcao: 'Deseja aplicar o Desconto',
        tipo: 'int',
        nome: 'situacao',
        tamanho: 60,
        tipoobject: 10,
        widthfield: 45,
        measure: '45rem',
        itens: 'Valor de Desconto,Percentual',
        values: 'V,P',
        disabled: false,
        invisible: false
      },
      {
        id: 1,
        campo: 'VLRBRUTO',
        funcao: 'Valor Bruto',
        tipo: 'numeric',
        nome: 'vlrbruto',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: true,
        decimal: 2,
        invisible: false
      },
      {
        id: 2,
        campo: 'VLRSERV',
        funcao: 'Valor Serviços',
        tipo: 'numeric',
        nome: 'vlrserv',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: true,
        decimal: 2,
        invisible: false
      },
      {
        id: 3,
        campo: 'VLRDESCONTO',
        funcao: 'Valor Desconto',
        tipo: 'numeric',
        nome: 'vlrdesconto',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: valuesfield[10] === 'P',
        invisible: valuesfield[10] === 'P',
        decimal: 2
      },
      {
        id: 4,
        campo: 'PERCDESCONTO',
        funcao: '% Desconto',
        tipo: 'numeric',
        nome: 'percdesconto',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: valuesfield[10] === 'V',
        invisible: valuesfield[10] === 'V',
        decimal: 2
      },
      {
        id: 5,
        campo: 'VLRIPI',
        funcao: 'Valor IPI',
        tipo: 'numeric',
        nome: 'vlripi',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: true,
        decimal: 2,
        invisible: false
      },
      {
        id: 6,
        campo: 'VLRST',
        funcao: 'Valor ST',
        tipo: 'numeric',
        nome: 'vlrst',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: true,
        decimal: 2,
        invisible: false
      },
      {
        id: 7,
        campo: 'VLRFRETE',
        funcao: 'Valor Frete',
        tipo: 'numeric',
        nome: 'vlfrete',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: true,
        decimal: 2,
        invisible: false
      },
      {
        id: 8,
        campo: 'VLROUTDESP',
        funcao: 'Valor Outras Despesas',
        tipo: 'numeric',
        nome: 'vlroutdesp',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: true,
        decimal: 2,
        invisible: false
      },
      {
        id: 9,
        campo: 'VLRFCPTOTST',
        funcao: 'Valor FCP ST',
        tipo: 'numeric',
        nome: 'vlrfcpst',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: true,
        decimal: 2,
        invisible: false
      },
      {
        id: 10,
        campo: 'VLRNOTA',
        funcao: 'Valor Total',
        tipo: 'numeric',
        nome: 'vlrnota',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 15,
        measure: '15rem',
        disabled: true,
        decimal: 2,
        invisible: false
      }
    ]);
  }, []);

  useEffect(() => {
    setValuesfield([
      'V',
      cabecalho.vlrbruto,
      cabecalho.vlrserv,
      cabecalho.vlrdesconto,
      cabecalho.percdesconto,
      cabecalho.vlripi,
      cabecalho.vlricmssub,
      cabecalho.vlrfrete,
      cabecalho.vlroutdesp,
      cabecalho.vlrfcptotst,
      cabecalho.vlrnota
    ]);
  }, [cabecalho]);

  // Função para atualizar os valores
  const updateField = (index, value) => {
    setValuesfield((prev) => {
      const newValues = [...prev];
      newValues[index] = parseFloat(value).toFixed(2);
      return newValues;
    });
  };

  useEffect(() => {
    if (valuesfield[0] === 'V') {
      fields[3].disabled = false;
      fields[4].disabled = true;
      fields[3].invisible = false;
      fields[4].invisible = true;
      setFields([...fields]);
      const vlrbruto = parseFloat(valuesfield[1]) || 0;
      const vlrserv = parseFloat(valuesfield[2]) || 0;
      const vlrdesconto = parseFloat(valuesfield[3]) || 0;
      const vlripi = parseFloat(valuesfield[5]) || 0;
      const vlrst = parseFloat(valuesfield[6]) || 0;
      const vlrfrete = parseFloat(valuesfield[7]) || 0;
      const vlroutdesp = parseFloat(valuesfield[8]) || 0;
      const vlrfcptotst = parseFloat(valuesfield[9]) || 0;

      if (vlrbruto > 0) {
        const percdesconto = ((vlrdesconto / vlrbruto) * 100).toFixed(2);
        const vlrliquido = (vlrbruto - vlrdesconto + vlrserv + vlripi + vlrst + vlrfrete + vlroutdesp + vlrfcptotst).toFixed(2);
        updateField(4, percdesconto);
        updateField(10, vlrliquido);
      }
    }
  }, [valuesfield[3], valuesfield[0]]); // Executa quando o Valor Desconto muda

  useEffect(() => {
    if (valuesfield[0] === 'P') {
      fields[3].disabled = true;
      fields[4].disabled = false;
      fields[3].invisible = true;
      fields[4].invisible = false;
      setFields([...fields]);
      const vlrbruto = parseFloat(valuesfield[1]) || 0;
      const vlrserv = parseFloat(valuesfield[2]) || 0;
      const percdesconto = parseFloat(valuesfield[4]) || 0;
      const vlripi = parseFloat(valuesfield[5]) || 0;
      const vlrst = parseFloat(valuesfield[6]) || 0;
      const vlrfrete = parseFloat(valuesfield[7]) || 0;
      const vlroutdesp = parseFloat(valuesfield[8]) || 0;
      const vlrfcptotst = parseFloat(valuesfield[9]) || 0;

      if (vlrbruto > 0) {
        const vlrdesconto = ((percdesconto / 100) * vlrbruto).toFixed(2);
        const vlrliquido = (vlrbruto - parseFloat(vlrdesconto) + vlrserv + vlripi + vlrst + vlrfrete + vlroutdesp + vlrfcptotst).toFixed(2);
        updateField(3, vlrdesconto);
        updateField(10, vlrliquido);
      }
    }
  }, [valuesfield[4], valuesfield[0]]);

  const Confirmar = () => {
    descontoMaximoFull(tablemov, cabecalho, parseFloat(valuesfield[4]), config).then((retdesconto) => {
      if (retdesconto) {
        const perdescfull = parseFloat(valuesfield[4]);
        const vlrdescfull = parseFloat(valuesfield[3]);
        let somadesc = 0.0;
        if (perdescfull === cabecalho.percdesconto) {
          setShowdesconto(false);
        } else {
          let itemfim = [];
          itemfim = itemfim.concat(itens);
          itemfim = itemfim.sort((a, b) => b.totvalor - a.totvalor);

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
              itemsave['perdesc'] = perdescfull;

              somadesc += parseFloat(((item.totvalor * perdescfull) / 100).toFixed(2));
              let dif = 0.0;
              if (index + 1 === itemfim.length) {
                if (somadesc !== vlrdescfull) {
                  dif = vlrdescfull - somadesc;
                }
              }
              itemsave['vlrdesc'] = parseFloat((item.prunit * item.qtprod * perdescfull) / 100 + dif);
              itemsave['totvalor'] = parseFloat(item.prunit * item.qtprod) - parseFloat(itemsave['vlrdesc']);
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
              setShowdesconto(false);
              setCarregando(false); // Finaliza o carregamento
            })
            .catch((error) => {
              setCarregando(false); // Finaliza o carregamento mesmo em caso de erro
              console.error(error); // Loga o erro para depuração
            });
        }
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmdesconto" name="frmdesconto">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Informações do movimento selecionado</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row style={{ marginLeft: '1px' }}>
              {fields.map((field, index) => (
                <CreateObject
                  key={index}
                  field={field}
                  index={field.id}
                  fields={fields}
                  valuesfield={valuesfield}
                  setValuesfield={setValuesfield}
                  disabled={field.disabled}
                  invisible={field.invisible}
                />
              ))}
            </Row>
            <Row style={{ textAlign: 'center', marginTop: '30px' }}>
              <h6>Atenção os impostos poderão ser recalculados, e valor total poderá mudar.</h6>
            </Row>
          </Card.Body>
        </Card>

        <Row style={{ textAlign: 'center', marginTop: '20px' }}>
          <Col>
            <Button id="btnConfirmar" className="btn-success shadow-2 mb-3" onClick={() => Confirmar()}>
              <i className={'feather icon-check'} />
              Confirmar
            </Button>
            <Button id="btnCancelar" className="btn-warning shadow-2 mb-3" onClick={() => setShowdesconto(false)}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DescontoFull;
