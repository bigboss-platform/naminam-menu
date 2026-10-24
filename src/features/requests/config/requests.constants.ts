/** Delivery districts — PRD: free delivery in SMP and nearby districts (placeholder list). */
export const DELIVERY_DISTRICTS = [
  'San Martín de Porres',
  'Los Olivos',
  'Independencia',
  'Comas',
  'Rímac',
  'Cercado de Lima',
  'Callao',
  'Otro distrito (consultar costo)',
];

export const DOCUMENT_TYPES = ['DNI', 'Carné de extranjería', 'Pasaporte', 'RUC'];
export const ITEM_TYPES = ['Producto', 'Servicio'];
export const CLAIM_TYPES = [
  { value: 'Reclamo', hint: 'Disconformidad con el producto o servicio.' },
  { value: 'Queja', hint: 'Malestar con la atención, sin relación con el producto.' },
];

/** Hidden "website" field — real people never fill it; bots usually do. */
export const HONEYPOT_FIELD = 'website';
