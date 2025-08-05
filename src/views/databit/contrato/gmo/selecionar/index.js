import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';


const SeriaisSelector = ({ produto, onConfirm, onClose }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [selecionados, setSelecionados] = useState([]);

  const carregarSeriais = () => {
    setCarregando(true);

    apiList(
      'PrecontratoDevolucao',
      'TB02308_NUMSERIE as numserie, TB02308_PRODUTO as produto', // já normalizando nomes
      '',
      `TB02308_PRECONTRATO = '${produto}' ORDER BY TB02308_NUMSERIE`
    )
      .then((response) => {
        if (response.status === 200) {
          setRows(response.data);
        }
      })
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    setColumns([
      {
        headerCheckboxSelection: true, // checkbox no cabeçalho
        checkboxSelection: true,       // checkbox nas linhas
        width: 50
      },
      { headerClassName: 'header-list', field: 'numserie', headerName: 'Número de Série', width: 250 },
      { headerClassName: 'header-list', field: 'produto', headerName: 'Produto', width: 150 }
    ]);

    carregarSeriais();
  }, [produto]);

  const handleConfirmar = () => {
    // Pega só os numserie selecionados
    const numSeries = selecionados.map((item) => item.numserie);
    onConfirm(numSeries);
    onClose();
  };

  return (
    <>
      <Row>
        <Col>
          <Button variant="secondary" className="mb-2 me-2" onClick={onClose}>
            Fechar
          </Button>
          <Button
            variant="primary"
            className="mb-2"
            onClick={handleConfirmar}
            disabled={selecionados.length === 0}
          >
            Confirmar Seleção
          </Button>
        </Col>
      </Row>

      {carregando && <LinearProgress color="primary" />}

      <AGGrid
        width="100%"
        height="400px"
        rows={rows}
        columns={columns}
        loading={carregando}
        rowSelection="multiple"
        rowMultiSelectWithClick={true} // permite selecionar clicando na linha também
        onSelectionChange={(newSelection) => setSelecionados(newSelection)}
      />
    </>
  );
};

export default SeriaisSelector;
