import React, { useEffect, useRef } from 'react';
import { Decode64 } from '../../../../../../utils/crypto';
import { apiList } from '../../../../../../api/crudapi';

const INTERVALO_MS = 60_000;

const FluxoNotifier = ({ habilitado = true, onOpenFluxo }) => {
  const ultimaChaveNotificadaRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!habilitado) return;

    async function pedirPermissao() {
      if (!('Notification' in window)) return false;
      if (Notification.permission === 'granted') return true;
      if (Notification.permission === 'denied') return false;
      const perm = await Notification.requestPermission();
      return perm === 'granted';
    }

    async function checarPendencias() {
      try {
        const usuario = Decode64(sessionStorage.getItem('user')) || '';
        if (!usuario) return;

        const resp = await apiList(
          'FluxoPendenciasVW',           
          '*',
          '',
          `usuario='${usuario}' AND status IN ('PENDENTE','CRITICO')` 
        );

        const itens = Array.isArray(resp?.data) ? resp.data : [];
        if (itens.length === 0) return;

        const chaveAtual = JSON.stringify(itens.map(i => i.id || i.codigo || i.pk)); // AJUSTE: chave única
        if (chaveAtual === ultimaChaveNotificadaRef.current) return;

        if ('Notification' in window && Notification.permission === 'granted') {
          const notif = new Notification('Fluxo de Processos', {
            body: 'Há pendências a serem analisadas, deseja ver?',
            requireInteraction: true,
            tag: 'fluxo-pendencias'
          });

          notif.onclick = () => {
            try {
              window.focus();
              if (typeof onOpenFluxo === 'function') onOpenFluxo();
              notif.close();
            } catch (_) {
              // erro ignorado intencionalmente
            }
          };
        } else {
          const ver = window.confirm('Há pendências a serem analisadas, deseja ver?');
          if (ver && typeof onOpenFluxo === 'function') onOpenFluxo();
        }

        ultimaChaveNotificadaRef.current = chaveAtual;
      } catch (_) {
        // erro ignorado intencionalmente
      }
    }

    let ativo = true;

    (async () => {
      try {
        await pedirPermissao();
        if (ativo) await checarPendencias();
        if (ativo) timerRef.current = setInterval(checarPendencias, INTERVALO_MS);
      } catch (_) {
        // erro ignorado intencionalmente
      }
    })();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [habilitado, onOpenFluxo]);

  return null; // <-- ÚNICO return do componente
};

export default FluxoNotifier;
