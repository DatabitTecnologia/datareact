import React, { useEffect, useRef, useState } from 'react';
import { Decode64 } from '../../../../../../utils/crypto';
import { apiExec, apiGetPicture } from '../../../../../../api/crudapi';
import { Modal, Button } from 'react-bootstrap';
import avatar from '../../../../../../assets/images/user/avatar-2.jpg'; 

const INTERVALO_MS = 10_000; 
const COOLDOWN_MS = 1 * 60_000; 

const table = 'TB00035';
const fieldpk = Decode64(sessionStorage.getItem('seller')) || '';
const field = 'TB00035_PHOTO';

const FluxoNotifier = ({ habilitado = true, onOpenFluxo }) => {
  const ultimaChaveRef = useRef(null);
  const lastNotifyAtRef = useRef(0);
  const timerRef = useRef(null);
  const stoppedRef = useRef(false);

  const [showModal, setShowModal] = useState(false);
  const [fotoUser, setFotoUser] = useState('');

  useEffect(() => {
    if (!habilitado) return;

    (async () => {
      try {
        const user = Decode64(sessionStorage.getItem('user')) || '';
        if (!user) return;

        const resp = await apiGetPicture(table, fieldpk, field, value);
        if (resp?.status === 200 && Array.isArray(resp.data) && resp.data[0]?.picture) {
          setFotoUser(resp.data[0].picture); // base64 sem prefixo
        }
      } catch (_) { /* ignora erro da foto */ }
    })();

    async function checarPendencias() {
      try {
        if (stoppedRef.current) return;

        const user = Decode64(sessionStorage.getItem('user')) || '';
        const seller = Decode64(sessionStorage.getItem('seller')) || '';

        const sql =
          "select * from Ft02027('" +
          user.replace(/'/g, "''") +
          "','" +
          seller.replace(/'/g, "''") +
          "')";

        const [respOp] = await Promise.all([apiExec(sql, 'S')]);

        const rowsOp = Array.isArray(respOp?.data) ? respOp.data : [];
        if (rowsOp.length === 0) return; // só notifica se Ft02027 trouxer dados

        const chaveAtual = JSON.stringify({
          op: rowsOp.map((r) => r.codigo ?? r.id ?? r.pk ?? JSON.stringify(r)),
          pre: []
        });

        const agora = Date.now();
        const mesmaChave = chaveAtual === ultimaChaveRef.current;
        const emCooldown = agora - lastNotifyAtRef.current < COOLDOWN_MS;
        if (mesmaChave && emCooldown) return;

        setShowModal(true);
        ultimaChaveRef.current = chaveAtual;
        lastNotifyAtRef.current = agora;
      } catch (_) { /* ignora erros  */ }
    }

    let ativo = true;

    (async () => {
      try {
        if (ativo) await checarPendencias(); // checagem imediata
        if (ativo) timerRef.current = setInterval(checarPendencias, INTERVALO_MS);
      } catch (_) { /* ignora erros  */ }
    })();

    return () => {
      try { if (timerRef.current) clearInterval(timerRef.current); } catch (_) { /* ignora erros  */ }
    };
  }, [habilitado, onOpenFluxo]);

  const handleVerAgora = () => {
    try { if (typeof onOpenFluxo === 'function') onOpenFluxo(); } catch (_) { /* ignora erros  */ }
    finally { setShowModal(false); }
  };

  const handleDepois = () => setShowModal(false);

  // interrompe novas notificações
  const handleParar = () => {
    stoppedRef.current = true;
    try { if (timerRef.current) clearInterval(timerRef.current); } catch (_) { /* ignora erros  */ }
    setShowModal(false);
  };

  const nomeUser = (() => {
    try { return (Decode64(sessionStorage.getItem('user')) || '').toUpperCase(); } catch { return 'USUÁRIO'; }
  })();
  

  return (
    <>
      <Modal show={showModal} onHide={handleDepois} centered>
        <Modal.Header closeButton>
          <Modal.Title>Fluxo de Processos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div
            style={{
              background: '#03A9F4',
              color: '#fff',
              borderRadius: 8,
              padding: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 12
            }}
          >
            <img
              src={fotoUser ? `data:image/jpeg;base64,${fotoUser}` : avatar}
              alt="Foto do usuário"
              style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', background: '#b3e5fc' }}
            />
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontWeight: 700 }}>{nomeUser || 'USUÁRIO'}</div>
            </div>
          </div>

          Há pendências a serem analisadas, deseja ver?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleParar}>
            Parar notificações
          </Button>
          <Button variant="secondary" onClick={handleDepois}>
            Depois
          </Button>
          <Button variant="primary" onClick={handleVerAgora}>
            Ver agora
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FluxoNotifier;
