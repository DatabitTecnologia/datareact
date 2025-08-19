import React, { useEffect, useRef } from 'react';
import { Decode64 } from '../../../../../../utils/crypto';
import { apiList } from '../../../../../../api/crudapi';

const INTERVALO_MS = 6_000; // ajuste o período de checagem

const FluxoNotifier = ({ habilitado = true, onOpenFluxo }) => {
  const ultimaChaveRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!habilitado) return;

    // Mesmo critério do InforFluxo: filtra por CODVEN conforme 'seller' de sessão (exceto 'ZZZZ')
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

    async function pedirPermissao() {
      if (!('Notification' in window)) return false;
      if (Notification.permission === 'granted') return true;
      if (Notification.permission === 'denied') return false;
      try {
        const perm = await Notification.requestPermission();
        return perm === 'granted';
      } catch (_) {
        return false;
      }
    }

    // Checa as duas views do fluxo, como o InforFluxo
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

        // Monte uma "assinatura" para evitar notificar repetidamente o mesmo conjunto
        // Tente usar identificadores estáveis das linhas (ajuste os campos caso precise)
        const chaveAtual = JSON.stringify({
          op: rowsOp.map(r => r.codigo ?? r.id ?? r.pk ?? JSON.stringify(r)),
          pre: rowsPre.map(r => r.codigo ?? r.id ?? r.pk ?? JSON.stringify(r))
        });

        if (chaveAtual === ultimaChaveRef.current) return;

        // Notificação do sistema
        if ('Notification' in window && Notification.permission === 'granted') {
          const notif = new Notification('Fluxo de Processos', {
            body: 'Há pendências a serem analisadas, deseja ver?',
            requireInteraction: true,
            tag: 'fluxo-pendencias' // evita empilhar múltiplas
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
          // Fallback simples caso o usuário negue/permissão não exista
          const ver = window.confirm('Há pendências a serem analisadas, deseja ver?');
          if (ver && typeof onOpenFluxo === 'function') onOpenFluxo();
        }

        ultimaChaveRef.current = chaveAtual;
      } catch (_) {
        // erros transitórios ignorados
      }
    }

    let ativo = true;

    (async () => {
      try {
        await pedirPermissao();
        if (ativo) await checarPendencias(); // dispara uma verificação imediata
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

  return null; // componente invisível (não renderiza nada)
};

export default FluxoNotifier;
