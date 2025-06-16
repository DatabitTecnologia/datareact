import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import AGGrid from '../../../../components/AGGrid';
import { apiList } from '../../../../api/crudapi';

const ProdutoEstoque = (props) => {
  const { produto, compress, empselec } = props;
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [validations, setValidations] = React.useState([]);

  useEffect(() => {
    if (compress === undefined || !compress) {
      setColumns([
        { headerClassName: 'header-list', field: 'cademp', headerName: 'Emp', width: 76 },
        { headerClassName: 'header-list', field: 'nome', headerName: 'Empresa', width: 420 },
        { headerClassName: 'header-list', field: 'qtprodp', headerName: 'Pedido', width: 95, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprod', headerName: 'Comércio', width: 95, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprodr', headerName: 'Reserva', width: 95, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprodd', headerName: 'Disponível', width: 95, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprodd_i', headerName: 'Indústria', width: 95, type: 'number' },
        { headerClassName: 'header-list', field: 'rmag', headerName: 'RMA', width: 95, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprod_u', headerName: 'Imobilizado', width: 95, type: 'number' },
        { headerClassName: 'header-list', field: 'dtent', headerName: 'Entrega', width: 106 }
      ]);
    } else {
      setColumns([
        { headerClassName: 'header-list', field: 'cademp', headerName: 'Emp', width: 26 },
        { headerClassName: 'header-list', field: 'nome', headerName: 'Empresa', width: 300 },
        { headerClassName: 'header-list', field: 'qtprodp', headerName: 'Pedido', width: 90, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprod', headerName: 'Comércio', width: 90, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprodr', headerName: 'Reserva', width: 90, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprodd', headerName: 'Disponível', width: 90, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprodd_i', headerName: 'Indústria', width: 90, type: 'number' },
        { headerClassName: 'header-list', field: 'rmag', headerName: 'RMA', width: 90, type: 'number' },
        { headerClassName: 'header-list', field: 'qtprod_u', headerName: 'Imobilizado', width: 90, type: 'number' },
        { headerClassName: 'header-list', field: 'dtent', headerName: 'Entrega', width: 106 }
      ]);
    }

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['cademp'];
    validation['sinal'] = [1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [empselec];
    validation['cor'] = ['#66ffcc'];
    validation['total'] = 1;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);

    apiList(
      'EstoqueVW',
      'TB02001_CADEMP,TB01007_NOME,TB02001_QTPRODP,TB02001_QTPROD,TB02001_QTPRODR,TB02001_QTPRODD,TB02001_QTPRODD_I,TB02001_RMAG,TB02001_QTPROD_U,TB02031_DTENT',
      '',
      "TB02001_PRODUTO = '" + produto + "' AND TB01007_SITUACAO = 'A' ORDER BY TB02001_CADEMP "
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div id="frmestoque" name="frmestoque">
        <Row style={{ height: '350px' }}>
          <Col>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Posição de Estoque</Card.Title>
              </Card.Header>
            </Card>
            <Row style={{ marginTop: '10px' }}>
              <AGGrid width="100%" height="360px" rows={rows} columns={columns} validations={validations}></AGGrid>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ProdutoEstoque;
