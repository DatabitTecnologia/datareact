import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import AGGrid from '../../../../../components/AGGrid';
import { apiList } from '../../../../../api/crudapi';

const ProdutoConsultaSerial = (props) => {
  const { produto } = props;
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'numserie', headerName: 'Serial', width: 170 },
      { headerClassName: 'header-list', field: 'pat', headerName: 'PAT', width: 152 },
      { headerClassName: 'header-list', field: 'codemp', headerName: 'Emp', width: 76 },
      { headerClassName: 'header-list', field: 'nomefor', headerName: 'Fabricante / Fornecedor', width: 290 },
      { headerClassName: 'header-list', field: 'dtvalidade', headerName: 'Validade', width: 106, type: 'date' },
      { headerClassName: 'header-list', field: 'locser', headerName: 'Local Armazenamento', width: 170 },
      { headerClassName: 'header-list', field: 'conservacao', headerName: 'Conservação', width: 110 },
      { headerClassName: 'header-list', field: 'tipo', headerName: 'Estoque', width: 130 },
      { headerClassName: 'header-list', field: 'situacao', headerName: 'Situação Serial', width: 150 }
    ]);
    setCarregando(true);
    apiList(
      'SerialVW',
      'TB02054_NUMSERIE, TB02054_PAT, TB02054_CODEMP, TB02054_DTVALIDADE, TB02054_NOMEFOR, TB02054_LOCSER',
      "TB01096_NOME AS situacao, CASE WHEN TB02054_TIPOCON = 'N' THEN 'Novo' ELSE 'Usado' END AS conservacao, CASE WHEN TB02054_RMAG - TB02054_RMAR > 0 THEN 'RMA' WHEN TB02054_IMOB = 'S' THEN 'Imobilizado' ELSE 'Comercio/Industria' end as tipo",
      "TB02054_PRODUTO = '" + produto + "' AND (TB02054_QTPROD - TB02054_QTPRODS) > 0 "
    ).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  }, [produto]);

  return (
    <React.Fragment>
      <div id="frmserial" name="frmserial">
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

export default ProdutoConsultaSerial;
