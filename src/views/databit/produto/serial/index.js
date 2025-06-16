import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import AGGrid from '../../../../components/AGGrid';
import { apiList } from '../../../../api/crudapi';

const ProdutoSerial = (props) => {
  const { produto } = props;
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'numserie', headerName: 'Serial', width: 170 },
      { headerClassName: 'header-list', field: 'pat', headerName: 'PAT', width: 152 },
      { headerClassName: 'header-list', field: 'codemp', headerName: 'Emp', width: 76 },
      { headerClassName: 'header-list', field: 'nomefor', headerName: 'Fabricante / Fornecedor', width: 250 },
      { headerClassName: 'header-list', field: 'dtvalidade', headerName: 'Validade', width: 106, type: 'date' },
      { headerClassName: 'header-list', field: 'locser', headerName: 'Local Armazenamento', width: 150 },
      { headerClassName: 'header-list', field: 'conservacao', headerName: 'Conservação', width: 110 },
      { headerClassName: 'header-list', field: 'tipo', headerName: 'Estoque', width: 110 },
      { headerClassName: 'header-list', field: 'situacao', headerName: 'Situação Serial', width: 150 }
    ]);
    apiList(
      'SerialVW',
      'TB02054_NUMSERIE, TB02054_PAT, TB02054_CODEMP, TB02054_DTVALIDADE, TB02054_NOMEFOR, TB02054_LOCSER',
      "TB01096_NOME AS situacao, CASE WHEN TB02054_TIPOCON = 'N' THEN 'Novo' ELSE 'Usado' END AS conservacao, CASE WHEN TB02054_RMAG - TB02054_RMAR > 0 THEN 'RMA' WHEN TB02054_IMOB = 'S' THEN 'Imobilizado' ELSE 'Comercio/Industria' end as tipo",
      "TB02054_PRODUTO = '" + produto + "' AND (TB02054_QTPROD - TB02054_QTPRODS) > 0 "
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        console.log(response.data);
      }
    });
  }, []);
  return (
    <React.Fragment>
      <div id="frmserial" name="frmserial">
        <Row style={{ height: '350px' }}>
          <Col>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Listagem de Seriais</Card.Title>
              </Card.Header>
            </Card>
            <Row style={{ marginTop: '10px' }}>
              <AGGrid width="100%" height="360px" rows={rows} columns={columns}></AGGrid>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ProdutoSerial;
