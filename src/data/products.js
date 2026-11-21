/**
 * Catálogo CARMOTION — fuente única de verdad.
 * Lo usan el frontend (PricingRolex, carrito) y el backend (api/checkout.js),
 * así el precio que se cobra siempre sale del servidor, nunca del navegador.
 *
 * price: pesos argentinos enteros (sin centavos).
 */

export const PRODUCTS = [
  {
    id: 'moto',
    label: 'MOTO',
    price: 699000,
    badge: null,
    description: 'Para motos y scooters de cualquier cilindrada.',
    includes: [
      'Estructura de acero inoxidable',
      'Lona Oxford 600D impermeable',
      'Amortiguadores de despliegue',
      'Anclaje en 7 puntos',
      '3,3 × 1,4 × 1,9 m (largo/alto/ancho)',
    ],
    highlight: false,
  },
  {
    id: 'auto',
    label: 'AUTO',
    price: 1549000,
    badge: null,
    description: 'Para sedanes, hatchbacks y utilitarios compactos.',
    includes: [
      'Estructura de acero inoxidable',
      'Lona Oxford 600D impermeable',
      'Amortiguadores de despliegue',
      'Anclaje en 7 puntos',
      '5,5 × 2,5 × 2,4 m (largo/alto/ancho)',
    ],
    highlight: false,
  },
  {
    id: 'camioneta',
    label: 'CAMIONETA',
    price: 1749000,
    badge: 'MÁS ELEGIDO',
    description: 'Para pickups, SUVs y vehículos de mayor porte.',
    includes: [
      'Estructura de acero inoxidable reforzada',
      'Lona Oxford 600D impermeable',
      'Amortiguadores de despliegue',
      'Anclaje en 7 puntos',
      '6 × 2,7 × 2,8 m (largo/alto/ancho)',
    ],
    highlight: true,
  },
  {
    id: 'fullsize',
    label: 'FULLSIZE',
    price: 1999000,
    badge: null,
    description: 'Para camionetas grandes, doble cabina y vehículos de trabajo.',
    includes: [
      'Estructura de acero inoxidable reforzada',
      'Lona Oxford 600D impermeable',
      'Amortiguadores de despliegue',
      'Anclaje en 7 puntos',
      '6,8 × 2,8 × 2,8 m (largo/alto/ancho)',
    ],
    highlight: false,
  },
];

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export const MAX_QTY = 10;

/**
 * Medios de pago aceptados → payment_method_id de Payway.
 * Amex = 65 está confirmado en el ejemplo oficial del SDK; el resto sale de la
 * tabla de Payway — verificar contra tu contrato en:
 * https://documentacion-ventasonline.payway.com.ar/docs/gateway/3jw3eiapx1jwu-medios-de-pago
 */
export const PAYMENT_METHODS = [
  { id: 1, label: 'Visa crédito' },
  { id: 31, label: 'Visa débito' },
  { id: 104, label: 'Mastercard crédito' },
  { id: 105, label: 'Mastercard débito' },
  { id: 65, label: 'American Express' },
  { id: 24, label: 'Naranja' },
  { id: 27, label: 'Cabal' },
];

/** Cuotas ofrecidas. Las "sin interés" dependen del plan contratado con Payway. */
export const INSTALLMENTS = [1, 3, 6, 12];

export const formatARS = (pesos) => new Intl.NumberFormat('es-AR').format(pesos);
