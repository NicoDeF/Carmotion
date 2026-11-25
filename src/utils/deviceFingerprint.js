/**
 * Device fingerprint de Payway (Cybersource / ThreatMetrix).
 *
 * El antifraude de Payway pide identificar el dispositivo del comprador.
 * Generamos un ID al azar, cargamos con él los recursos de ThreatMetrix
 * (session_id = prefijo + ID) y mandamos el mismo ID al server, que lo usa como
 * `device_unique_identifier` (token) y `device_unique_id` (pago).
 *
 * org_id: 1snn5n9w en sandbox, k8vif92e en producción (documentación de Decidir/Payway).
 * Se pueden pisar con VITE_PAYWAY_FP_ORG_ID / VITE_PAYWAY_FP_PREFIX si Payway indica otros.
 */
const IS_PROD = import.meta.env.VITE_PAYWAY_ENV === 'production';
const ORG_ID = import.meta.env.VITE_PAYWAY_FP_ORG_ID || (IS_PROD ? 'k8vif92e' : '1snn5n9w');
const PREFIX = import.meta.env.VITE_PAYWAY_FP_PREFIX || 'decidir_agregador';
const BASE = 'https://h.online-metrix.net/fp';

let current = null; // { id, nodes }

const newId = () => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join(''); // 32 hex
};

/** Carga el fingerprint (una vez por apertura del checkout) y devuelve el ID. */
export function startDeviceFingerprint() {
  if (current) return current.id;
  const id = newId();
  const qs = `org_id=${ORG_ID}&session_id=${PREFIX}${id}`;

  const img = document.createElement('img');
  img.src = `${BASE}/clear.png?${qs}&m=2`;
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');
  img.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px';

  const script = document.createElement('script');
  script.src = `${BASE}/check.js?${qs}`;
  script.async = true;

  document.body.append(img, script);
  current = { id, nodes: [img, script] };
  return id;
}

/** Al cerrar el checkout: descarta el ID para que la próxima compra use uno nuevo. */
export function resetDeviceFingerprint() {
  current?.nodes.forEach((n) => n.remove());
  current = null;
}
