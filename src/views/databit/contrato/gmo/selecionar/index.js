import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';

const SeriaisSelector = ({ precontrato, produto, onConfirm, onClose }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    const carregarSeriais = async () => {
      setCarregando(true);
      const campos = 'TB02308_NUMSERIE,TB02308_CONTRATO,TB02308_PRECONTRATO,TB02308_CODITEM,TB02308_IDITEM';
      const filtro = `TB02308_PRODUTO = '${produto}' /*AND TB02308_SERIESELECIONADA IS NULL*/ AND TB02308_PRECONTRATO = '${precontrato}' ORDER BY TB02308_NUMSERIE`;

      try {
        const response = await apiList('PrecontratoDevolucao', campos, '', filtro);
        if (response?.status === 200 && Array.isArray(response.data)) {
          setRows(response.data);
        } else {
          setRows([]);
        }
      } catch (error) {
        console.error('Erro ao carregar seriais:', error);
        setRows([]);
      } finally {
        setCarregando(false);
      }
    };

    setColumns([
      {
        field: 'numserie',
        headerName: 'Número de Série',
        headerClassName: 'header-list',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: 250
      },
      {
        field: 'produto',
        headerName: 'Produto',
        headerClassName: 'header-list',
        width: 150
      }
    ]);

    carregarSeriais();
  }, [precontrato]);

  const handleConfirmar = () => {

    console.log('Selecionados:', selecionados); 
    
    onConfirm(selecionados); 
    onClose();
  };

  return (
    <>
      <Row>
        <Col>
          <Button variant="secondary" className="mb-2 me-2" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="primary" className="mb-2" onClick={handleConfirmar} disabled={selecionados.length === 0}>
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
        multselec={true}
        onMultselec={setSelecionados}
      />

      <Row className="mt-2">
        <Col>
          <div className="text-muted">
            {selecionados.length} {selecionados.length === 1 ? 'item selecionado' : 'itens selecionados'}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SeriaisSelector;
