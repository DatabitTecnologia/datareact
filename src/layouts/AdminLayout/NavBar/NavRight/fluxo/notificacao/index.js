import React, { useEffect, useRef, useState } from 'react';
import { Decode64 } from '../../../../../../utils/crypto';
import { apiList } from '../../../../../../api/crudapi';
import { Modal, Button } from 'react-bootstrap';

const INTERVALO_MS = 10_000;      // checa a cada 60s
const COOLDOWN_MS  = 1 * 60_000; // re-notifica a cada 15min mesmo sem mudança

const FluxoNotifier = ({ habilitado = true, onOpenFluxo }) => {
  const ultimaChaveRef = useRef(null);
  const lastNotifyAtRef = useRef(0);
  const timerRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!habilitado) return;

    // Mesmo critério do InforFluxo: filtra por CODVEN conforme 'seller' (exceto 'ZZZZ')
    const montarFiltro = () => {
      let filtro = ' 0 = 0 ';
      try {
        const seller = Decode64(sessionStorage.getItem('seller'));
        if (seller !== 'ZZZZ') {
          filtro += ` and CODVEN = '${seller}' `;
        }
      } catch (_) {
        // erro ignorado intencionalmente
      }
      return filtro;
    };

    /* apiList(
      'OportunidadeNotificacao',
      'TB02255_STATUS',
      '',
      `TB02255_CODVEN = "${seller}"`
    ).then((response) => {
      if (response.status === 200) {
        //console.log(response.data);
      }
    }); */

    async function checarPendencias() {
      try {
        const filtro = montarFiltro();

        const [respOp, respPre] = await Promise.all([
          apiList('OportunidadeFluxoVW', '*', '', filtro),
          apiList('PrecontratoFluxoVW', '*', '', filtro)
        ]);

        const rowsOp = Array.isArray(respOp?.data) ? respOp.data : [];
        const rowsPre = Array.isArray(respPre?.data) ? respPre.data : [];

        // Se não há nada em nenhuma, não notifica
        if (rowsOp.length === 0 && rowsPre.length === 0) return;

        // Assinatura para deduplicar (use campos estáveis quando possível)
        const chaveAtual = JSON.stringify({
          op: rowsOp.map(r => r.codigo ?? r.id ?? r.pk ?? JSON.stringify(r)),
          pre: rowsPre.map(r => r.codigo ?? r.id ?? r.pk ?? JSON.stringify(r))
        });

        const agora = Date.now();
        const mesmaChave = chaveAtual === ultimaChaveRef.current;
        const emCooldown = (agora - lastNotifyAtRef.current) < COOLDOWN_MS;
        if (mesmaChave && emCooldown) return;

        // Exibe modal (não precisa de permissão do navegador)
        setShowModal(true);

        ultimaChaveRef.current = chaveAtual;
        lastNotifyAtRef.current = Date.now();
      } catch (_) {
        // erros transitórios ignorados
      }
    }

    let ativo = true;

    (async () => {
      try {
        // checagem imediata
        if (ativo) await checarPendencias();
        // checagens periódicas
        if (ativo) timerRef.current = setInterval(checarPendencias, INTERVALO_MS);
      } catch (_) {
        // erro ignorado intencionalmente
      }
    })();

    return () => {
      try {
        if (timerRef.current) clearInterval(timerRef.current);
      } catch (_) {
        // erro ignorado intencionalmente
      }
    };
  }, [habilitado, onOpenFluxo]);

  const handleVerAgora = () => {
    try {
      if (typeof onOpenFluxo === 'function') onOpenFluxo();
    } catch (_) {
      // erro ignorado intencionalmente
    } finally {
      setShowModal(false);
    }
  };

  const handleDepois = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Modal de notificação*/}
      <Modal show={showModal} onHide={handleDepois} centered>
        <Modal.Header closeButton>
          <Modal.Title>Fluxo de Processos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Há pendências a serem analisadas, deseja ver?
        </Modal.Body>
        <Modal.Footer>
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
