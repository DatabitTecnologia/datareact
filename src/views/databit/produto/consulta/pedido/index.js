import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import AGGrid from '../../../../../components/AGGrid';
import { apiList } from '../../../../../api/crudapi';

const ProdutoConsultaPedido = (props) => {
  const { produto } = props;
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Pedido', width: 96 },
      { headerClassName: 'header-list', field: 'codemp', headerName: 'Empresa', width: 90 },
      { headerClassName: 'header-list', field: 'nomeforn', headerName: 'Fornecedor', width: 690 },
      { headerClassName: 'header-list', field: 'qtpedido', headerName: 'Pedido', width: 125, type: 'number' },
      { headerClassName: 'header-list', field: 'qtentregue', headerName: 'Entregue', width: 125, type: 'number' },
      { headerClassName: 'header-list', field: 'saldo', headerName: 'Saldo', width: 125, type: 'number' },
      { headerClassName: 'header-list', field: 'dtent', headerName: 'Entrega', width: 106, type: 'date' }
    ]);
    setCarregando(true);
    apiList('ProdutoPedidoVW', '*', '', "PRODUTO = '" + produto + "' AND SALDO > 0 ORDER BY DTENT DESC ").then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  }, [produto]);

  return (
    <React.Fragment>
      <div id="frmpedido" name="frmpedido">
        <Card className="Recent-Users">
          <Row>
            <Col>
              <Row style={{ marginTop: '5px', marginRight: '2px' }}>
                <AGGrid width="100%" height="280px" rows={rows} columns={columns} loading={carregando}></AGGrid>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ProdutoConsultaPedido;
