import React, { useEffect, useRef, useState } from 'react';
import { Decode64 } from '../../../../../../utils/crypto';
import { apiExec, apiGetPicture } from '../../../../../../api/crudapi';
import { Modal, Button } from 'react-bootstrap';
import avatar from '../../../../../../assets/images/user/avatar-2.jpg'; 
import './index.css';

const INTERVALO_MS = 10_000; 
const COOLDOWN_MS = 5 * 60_000; 

const table = 'TB00035';
const fieldpk = 'TB00035_NOME';
const field = 'TB00035_PHOTO';
const value = Decode64(sessionStorage.getItem('user')) || ''

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

        const response = await apiGetPicture(table, fieldpk, field, value);
        if (response?.status === 200 && Array.isArray(response.data) && response.data[0]?.picture) {
          setFotoUser(response.data[0].picture); 
        }
      } catch (_) { /* ignora  */ }
    })();

    async function checarPendencias() {
      try {
        if (stoppedRef.current) return;

        const user = Decode64(sessionStorage.getItem('user')) || '';
        const seller = Decode64(sessionStorage.getItem('seller')) || '';

        const sql =`select * from FT02027('${user}','${seller}')`;

        const [responseOp] = await Promise.all([apiExec(sql, 'S')]);

        const rowsOp = Array.isArray(responseOp?.data) ? responseOp.data : [];
        if (rowsOp.length === 0) return; //so notifica se exstir regisrtros

        /* cria uma chave dos id dos registros encontrados */
        const chaveAtual = JSON.stringify({
          op: rowsOp.map((r) => r.codigo ?? r.id ?? r.pk ?? JSON.stringify(r)),
          pre: []
        });

        /* monta as chaves */
        const agora = Date.now();
        const mesmaChave = chaveAtual === ultimaChaveRef.current;
        const emCooldown = agora - lastNotifyAtRef.current < COOLDOWN_MS;

        /* compara os ultimos id com os atuais  */
        if (mesmaChave && emCooldown) return;

        /* abre modal se houver coisa nova */
        setShowModal(true);

        /* atualiza chave */
        ultimaChaveRef.current = chaveAtual;
        /* começa a contar tempo */
        lastNotifyAtRef.current = agora;
      } catch (_) { /* ignora erros  */ }
    }

    let ativo = true;

    (async () => {
      try {
         // checagem imediata para não esperar 10s na primeira vez
        if (ativo) await checarPendencias();

        if (ativo) timerRef.current = setInterval(checarPendencias, INTERVALO_MS);
      } catch (_) { /* ignora erros  */ }
    })();

    return () => {
      /* limpa contagem de tempo */
      try { if (timerRef.current) clearInterval(timerRef.current); } catch (_) { /* ignora erros  */ }
    };
  }, [habilitado, onOpenFluxo]);

  /* btns do modal */
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

  /* preenche nome na telinha */
  const nomeUser = (() => {
    try { return (Decode64(sessionStorage.getItem('user')) || '').toUpperCase(); } catch { return 'USUÁRIO'; }
  })();
  

  return (
    <>
      <Modal className='modalNotifier' show={showModal} onHide={handleDepois} backdrop='static' centered>
        <Modal.Header closeButton>
          <i className={'feather icon-bell'}/>&nbsp;&nbsp;<Modal.Title style={{fontSize: '15px'}}>Fluxo de Processos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div
            style={{
              background: '#03A9F4',
              color: '#fff',
              borderRadius: 8,
              padding: 10,
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

          <h5 className='msgNotifier'>Há pendências a serem analisadas, deseja ver?</h5>
        </Modal.Body>

        <Modal.Footer className='footerModalNotifier'>
          <Button className='btnPararNotifier' variant="outline-danger" onClick={handleParar}>
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
