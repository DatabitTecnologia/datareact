const SESSION_KEY = 'app_sessions';

/**
 * Incrementa o número de sessões ativas.
 */
export function incrementSession() {
  const sessions = JSON.parse(localStorage.getItem(SESSION_KEY)) || 0;
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessions + 1));
}

/**
 * Decrementa o número de sessões ativas.
 */
export function decrementSession() {
  const sessions = JSON.parse(localStorage.getItem(SESSION_KEY)) || 1;
  localStorage.setItem(SESSION_KEY, JSON.stringify(Math.max(sessions - 1, 0))); // Garante que não seja negativo
}

/**
 * Retorna o número atual de sessões ativas.
 * @returns {number} Número de sessões ativas.
 */
export function getActiveSessions() {
  return JSON.parse(localStorage.getItem(SESSION_KEY)) || 0;
}
