import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AGGrid from '../../../../../../components/AGGrid'; // ajuste o caminho se necessário
import { Decode64 } from '../../../../../../utils/crypto';
import { apiExec } from '../../../../../../api/crudapi';

const ListaNotificacoes = ({ show, onHide }) => {
  const [carregando, setCarregando] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const selecionadosRef = useRef([]);

  const handleMultSelect = (linhasSelecionadas) => {
    selecionadosRef.current = Array.isArray(linhasSelecionadas) ? linhasSelecionadas : [];
  };

  useEffect(() => {
    if (!show) return;

    const carregar = async () => {
      setCarregando(true);

      const user = (Decode64(sessionStorage.getItem('user')) || '').replace(/'/g, "''");
      const seller = (Decode64(sessionStorage.getItem('seller')) || '').replace(/'/g, "''");
      const sql = `select * from Ft02027('${user}','${seller}')`;

      const resp = await apiExec(sql, 'S');
      const data = Array.isArray(resp?.data) ? resp.data : [];

      setRows(data);

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
    };

    carregar();
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} centered size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Pendências</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AGGrid
          width="100%"
          height="60vh"
          rows={rows}
          columns={columns}
          loading={carregando}
          multselec={true}
          onMultselec={handleMultSelect}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListaNotificacoes;
