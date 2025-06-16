import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import total from '../../../../assets/images/databit/valortotal.png';
import aprovado from '../../../../assets/images/databit/aprovado.png';
import contratado from '../../../../assets/images/databit/contratado.png';
import liberado from '../../../../assets/images/databit/liberado.png';
import alteracao from '../../../../assets/images/databit/alteracao.png';
import contrato from '../../../../assets/images/databit/contrato.png';
import distrato from '../../../../assets/images/databit/distrato.png';
import pendente from '../../../../assets/images/databit/pendente.png';
import instalada from '../../../../assets/images/databit/instalado.png';
import entregue from '../../../../assets/images/databit/entregue2.png';
import aliberar from '../../../../assets/images/databit/aliberar.png';
import transito from '../../../../assets/images/databit/transito.png';

const PendenciaTotal = (props) => {
  const { rows, setRows } = props;
  const [totais, setTotais] = useState([]);

  useEffect(() => {
    const tmptotais = [
      {
        id: 0,
        name: 'Valor Total',
        value: 0,
        color: 'rgb(51, 153, 255)',
        background: `linear-gradient(rgba(51, 153, 255), transparent)`,
        colortitle: '#ffff',
        icon: total
      },
      {
        id: 1,
        name: 'Total Contratado',
        value: 0,
        color: 'rgb(0, 204, 0)',
        background: `linear-gradient( rgba(0, 204, 0), transparent)`,
        colortitle: '#ffff',
        icon: contratado
      },
      {
        id: 2,
        name: 'Total Aprovado',
        value: 0,
        color: 'rgb(210, 210, 0)',
        background: `linear-gradient(rgba(210, 210, 0), transparent)`,
        colortitle: '#ffff',
        icon: aprovado
      },
      {
        id: 3,
        name: 'Total Pendente',
        value: 0,
        color: 'rgb(153, 51, 255)',
        background: `linear-gradient(rgb(153, 51, 255), transparent)`,
        colortitle: '#ffff',
        icon: pendente
      },
      {
        id: 4,
        name: 'Em Contrato',
        value: 0,
        color: 'rgb(204, 0, 204)',
        background: `linear-gradient(rgba(205, 0, 204), transparent)`,
        colortitle: '#ffff',
        icon: liberado
      },
      {
        id: 5,
        name: 'Em Trânsito',
        value: 0,
        color: 'rgb(255, 0, 0)',
        background: `linear-gradient(rgb(255, 0, 0), transparent)`,
        colortitle: '#ffff',
        icon: transito
      },
      {
        id: 6,
        name: 'Total Instalado',
        value: 0,
        color: 'rgb(255, 204, 102)',
        background: `linear-gradient(rgb(255, 204, 102), transparent)`,
        colortitle: '#ffff',
        icon: instalada
      },
      {
        id: 7,
        name: 'Total Entregue',
        value: 0,
        color: 'rgb(102, 255, 102)',
        background: `linear-gradient(rgb(102, 255, 102), transparent)`,
        colortitle: '#ffff',
        icon: entregue
      },
      {
        id: 8,
        name: 'Total à Liberar',
        value: 0,
        color: 'rgb(0, 204, 255)',
        background: `linear-gradient(rgb(0, 204, 255), transparent)`,
        colortitle: '#ffff',
        icon: aliberar
      },
      {
        id: 9,
        name: 'Operação Alteração',
        value: 0,
        color: 'rgb(0, 102, 153)',
        background: `linear-gradient(rgba(0, 102, 153), transparent)`,
        colortitle: '#ffff',
        icon: alteracao
      },
      {
        id: 10,
        name: 'Operação Contrato',
        value: 0,
        color: 'rgb(255, 204, 0)',
        background: `linear-gradient(rgb(255, 204, 0) transparent)`,
        colortitle: '#ffff',
        icon: contrato
      },
      {
        id: 11,
        name: 'Operação Distrato',
        value: 0,
        color: 'rgb(51, 102, 153)',
        background: `linear-gradient(rgb(51, 102, 153), transparent)`,
        colortitle: '#ffff',
        icon: distrato
      }
    ];
    if (rows !== undefined && rows.length > 0) {
      rows.forEach((element) => {
        let valor = element.TB02264_VLRCONTRATA;
        if (valor === null) {
          valor = 0;
        }
        tmptotais[0].value = tmptotais[0].value + parseFloat(valor.toFixed(2));
        tmptotais[1].value = tmptotais[1].value + element.TB02264_QTCONTRATADA;
        tmptotais[2].value = tmptotais[2].value + element.TB02264_QTAPROVADA;
        tmptotais[3].value = tmptotais[3].value + element.TB02264_QTPENDENTE;
        tmptotais[4].value = tmptotais[4].value + element.TB02264_QTLIBERADA;
        tmptotais[5].value = tmptotais[5].value + element.TB02264_QTTRANSITO;
        tmptotais[6].value = tmptotais[6].value + element.TB02264_QTINSTALADA;
        tmptotais[7].value = tmptotais[7].value + element.TB02264_QTENTREGUE;
        tmptotais[8].value = tmptotais[8].value + element.TB02264_QTALIBERAR;

        switch (element.TB01138_OPERACAO) {
          case 'A': {
            tmptotais[9].value = tmptotais[9].value + element.TB02264_QTAPROVADA;
            break;
          }
          case 'C': {
            tmptotais[10].value = tmptotais[10].value + element.TB02264_QTAPROVADA;
            break;
          }
          case 'D': {
            tmptotais[11].value = tmptotais[11].value + element.TB02264_QTAPROVADA;
            break;
          }
        }
      });
      setTotais([...tmptotais]);
    }
  }, []);

  return (
    <React.Fragment>
      <Row>
        {totais.map((data, index) => {
          return (
            <Col key={index} md={6} xl={4}>
              <Card
                style={{
                  //background: data.background,
                  backgroundColor: data.color,
                  boxShadow: '0rem 0rem 1rem 0.1rem',
                  height: '130px'
                }}
              >
                <Card.Body>
                  <Row>
                    <Col key={index} md={2} xl={3}>
                      <img style={{ height: '40px', width: '40px' }} src={data.icon} alt={data.icon}></img>
                    </Col>
                    <Col key={index} md={1} xl={7}>
                      <h5 style={{ color: data.colortitle }}>{data.name}</h5>
                    </Col>
                  </Row>
                  <h3 className="mb-3 f-w-200" style={{ textAlign: 'right', color: data.colortitle }}>
                    {data.value}
                  </h3>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default PendenciaTotal;
