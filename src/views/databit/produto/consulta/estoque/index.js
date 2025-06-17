import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import AGGrid from '../../../../../components/AGGrid';
import { apiList } from '../../../../../api/crudapi';

const ProdutoConsultaEstoque = (props) => {
  const { produto } = props;
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'cademp', headerName: 'Emp', width: 76 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Empresa', width: 510 },
      { headerClassName: 'header-list', field: 'qtprodp', headerName: 'Pedido', width: 95, type: 'number' },
      { headerClassName: 'header-list', field: 'qtprod', headerName: 'Comércio', width: 95, type: 'number' },
      { headerClassName: 'header-list', field: 'qtprodr', headerName: 'Reserva', width: 95, type: 'number' },
      { headerClassName: 'header-list', field: 'qtprodd', headerName: 'Disponível', width: 95, type: 'number' },
      { headerClassName: 'header-list', field: 'qtprodd_i', headerName: 'Indústria', width: 95, type: 'number' },
      { headerClassName: 'header-list', field: 'rmag', headerName: 'RMA', width: 95, type: 'number' },
      { headerClassName: 'header-list', field: 'qtprod_u', headerName: 'Imobilizado', width: 95, type: 'number' },
      { headerClassName: 'header-list', field: 'dtent', headerName: 'Entrega', width: 106 }
    ]);
    setCarregando(true);
    apiList(
      'EstoqueVW',
      'TB02001_CADEMP,TB01007_NOME,TB02001_QTPRODP,TB02001_QTPROD,TB02001_QTPRODR,TB02001_QTPRODD,TB02001_QTPRODD_I,TB02001_RMAG,TB02001_QTPROD_U,TB02031_DTENT',
      '',
      "TB02001_PRODUTO = '" + produto + "' AND TB01007_SITUACAO = 'A' ORDER BY TB02001_CADEMP "
    ).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  }, [produto]);

  return (
    <React.Fragment>
      <div id="frmestoque" name="frmestoque">
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

export default ProdutoConsultaEstoque;
