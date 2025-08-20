import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AGGrid from '../../../../../../components/AGGrid'; // ajuste o caminho se necessário
import { Decode64 } from '../../../../../../utils/crypto';
import { apiExec } from '../../../../../../api/crudapi';

const ListaNotificacoes = ({ show, onHide }) => {
  const [carregando, setCarregando] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (!show) return;

    const carregar = async () => {
      setCarregando(true);

      const user = (Decode64(sessionStorage.getItem('user')) || '').replace(/'/g, "''");
      const seller = (Decode64(sessionStorage.getItem('seller')) || '').replace(/'/g, "''");
      const sql = `select CONVERT(varchar(10), data, 103) AS Date,* from Ft02027('${user}','${seller}')`;

      const response = await apiExec(sql, 'S');
      const data = Array.isArray(response?.data) ? response.data : [];

      setRows(data);

      setColumns([
        {
          field: 'codigo',
          headerName: 'Código',
          headerClassName: 'header-list',
          width: 100
        },
        {
          field: 'Date',
          headerName: 'Data',
          headerClassName: 'header-list',
          width: 130
        },
        {
          field: 'nomecli',
          headerName: 'Nome Cliente',
          headerClassName: 'header-list',
          width: 350
        },
        {
          field: 'nometipo',
          headerName: 'Tipo',
          headerClassName: 'header-list',
          width: 250
        },
        {
          field: 'qtde',
          headerName: 'Qtde',
          headerClassName: 'header-list',
          width: 80
        },
        {
          field: 'nomestatus',
          headerName: 'Status',
          headerClassName: 'header-list',
          width: 250
        },
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
          multselec={false}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ListaNotificacoes;
