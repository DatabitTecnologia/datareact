import React, { useEffect, useRef, useState } from 'react';
import { Decode64 } from '../../../../../../utils/crypto';
import { apiExec, apiGetPicture } from '../../../../../../api/crudapi';
import { Modal, Button } from 'react-bootstrap';
import avatar from '../../../../../../assets/images/user/avatar-2.jpg'; 

const INTERVALO_MS = 10_000; // 10s
const COOLDOWN_MS = 1 * 60_000; // 1min

// Config da foto (troque se necessário)
const PICTURE_TABLE = 'TB00035';
const PICTURE_PK = Decode64(sessionStorage.getItem('seller')) || '';
const PICTURE_IMAGE_FIELD = 'TB00035_PHOTO';

const FluxoNotifier = ({ habilitado = true, onOpenFluxo }) => {
  const ultimaChaveRef = useRef(null);
  const lastNotifyAtRef = useRef(0);
  const timerRef = useRef(null);
  const stoppedRef = useRef(false);

  const [showModal, setShowModal] = useState(false);
  const [fotoUser, setFotoUser] = useState('');

  useEffect(() => {
    if (!habilitado) return;

    // Carrega a foto do usuário via apiGetPicture (padrão AvatarProduto)
    (async () => {
      try {
        const user = Decode64(sessionStorage.getItem('user')) || '';
        if (!user) return;

        const resp = await apiGetPicture(PICTURE_TABLE, PICTURE_PK, PICTURE_IMAGE_FIELD, user);
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
      } catch (_) { /* ignora erros transitórios */ }
    }

    let ativo = true;

    (async () => {
      try {
        if (ativo) await checarPendencias(); // checagem imediata
        if (ativo) timerRef.current = setInterval(checarPendencias, INTERVALO_MS);
      } catch (_) { /* ignora erros transitórios */ }
    })();

    return () => {
      try { if (timerRef.current) clearInterval(timerRef.current); } catch (_) { /* ignora erros transitórios */ }
    };
  }, [habilitado, onOpenFluxo]);

  const handleVerAgora = () => {
    try { if (typeof onOpenFluxo === 'function') onOpenFluxo(); } catch (_) { /* ignora erros transitórios */ }
    finally { setShowModal(false); }
  };

  const handleDepois = () => setShowModal(false);

  // interrompe novas notificações
  const handleParar = () => {
    stoppedRef.current = true;
    try { if (timerRef.current) clearInterval(timerRef.current); } catch (_) { /* ignora erros transitórios */ }
    setShowModal(false);
  };

  // dados básicos (se quiser preencher Setor/Email, salve em sessionStorage)
  const nomeUser = (() => {
    try { return (Decode64(sessionStorage.getItem('user')) || '').toUpperCase(); } catch { return 'USUÁRIO'; }
  })();
  const setorUser = sessionStorage.getItem('setorUser') || '';
  const emailUser = sessionStorage.getItem('emailUser') || '';

  return (
    <>
      <Modal show={showModal} onHide={handleDepois} centered>
        <Modal.Header closeButton>
          <Modal.Title>Fluxo de Processos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Card da foto no padrão base64 + fallback */}
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
