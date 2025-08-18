import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';

const SeriaisSelector = ({ precontrato, produto, codsite, qtde = 0, onConfirm, onClose }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [selecionados, setSelecionados] = useState([]);

  // status de limite
  const overLimit = qtde > 0 && selecionados.length > qtde;
  const confirmEnabled = qtde > 0 ? selecionados.length === qtde : selecionados.length > 0;

  useEffect(() => {
    const carregarSeriais = async () => {
      setCarregando(true);
      const campos = '*';
      const filtro = `produto = '${produto}' AND requisicao IS NULL AND precontrato = '${precontrato}' AND codsite ='${codsite}' ORDER BY numserie`;

      try {
        const response = await apiList('PrecontratoDevolucaoVW', campos, '', filtro);
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
        width: 150
      },
      {
        field: 'pat',
        headerName: 'Patrimônio',
        headerClassName: 'header-list',
        width: 100
      },
      {
        field: 'produto',
        headerName: 'Produto',
        headerClassName: 'header-list',
        width: 100
      },
      {
        field: 'local',
        headerName: 'Local de Instalação',
        headerClassName: 'header-list',
        width: 250
      },
      {
        field: 'data',
        headerName: 'Instalação',
        headerClassName: 'header-list',
        width: 114
      }
    ]);

    carregarSeriais();
  }, [precontrato, produto]);

  // recebe seleção do grid
  const handleMultSelect = (lista) => {
    setSelecionados(Array.isArray(lista) ? lista : []);
  };

  const handleConfirmar = () => {
    if (!confirmEnabled) return; // proteção dupla
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
          <Button
            variant="primary"
            className="mb-2"
            onClick={handleConfirmar}
            disabled={!confirmEnabled}
            title={qtde > 0 ? `Selecione exatamente ${qtde} item(ns) para confirmar` : 'Selecione ao menos 1 item'}
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
        multselec={true}
        onMultselec={handleMultSelect}
      />

      <Row className="mt-2">
        <Col>
          {qtde > 0 ? (
            overLimit ? (
              <div className="text-danger fw-semibold">
                Quantidade alcançada! ({selecionados.length} de {qtde})
              </div>
            ) : (
              <div className="text-muted">
                Selecionados: {selecionados.length} / {qtde}
              </div>
            )
          ) : (
            <div className="text-muted">
              {selecionados.length} {selecionados.length === 1 ? 'item selecionado' : 'itens selecionados'}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SeriaisSelector;
