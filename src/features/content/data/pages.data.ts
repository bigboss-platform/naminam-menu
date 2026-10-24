/**
 * Copy for the content pages. "Cómo ordenar" steps and note come from the PRD; testimonials,
 * values and the "Sobre Santanita" story are PLACEHOLDER COPY for the MVP.
 */

export const HOW_TO_ORDER_STEPS = [
  { icon: 'menu_book', title: 'Revisa el menú', text: 'Pasapalos, postres, bebidas y los inventos del mes.' },
  { icon: 'favorite', title: 'Escoge lo que se te antoje', text: 'Elige el sabor o la variante que más te guste.' },
  { icon: 'add_shopping_cart', title: 'Agrégalo al carrito', text: 'Toca "Añadir" en cada producto.' },
  { icon: 'shopping_bag', title: 'Chequea tu orden', text: 'Cuando tengas todo, toca el ícono del carrito arriba y revisa tu pedido.' },
  { icon: 'check_circle', title: 'Selecciona "Solicitar"', text: 'Completa tus datos de entrega. Aquí no pagas nada.' },
];

export const HOW_TO_ORDER_NOTE =
  'Recibirás un correo con tu orden y luego otro con la disponibilidad de los productos y delivery. Te contactaremos por WhatsApp para agilizar la coordinación.';

export const PAYMENT_METHODS = ['Yape', 'Plin', 'Transferencia'];

export type Testimonial = { name: string; district: string; message: string; reply: string; time: string };

/** "Nuestros antojaditos nos cuentan…" — styled as WhatsApp chats until real screenshots arrive. */
export const TESTIMONIALS: Testimonial[] = [
  { name: 'Carla M.', district: 'Los Olivos', time: '8:42 p. m.', message: 'Santaa 😍 el quesillo llegó perfecto, mi mamá dice que sabe igualito al de Caracas', reply: '¡Qué bonito! Gracias Carla 🥹💛' },
  { name: 'Jorge P.', district: 'SMP', time: '9:15 p. m.', message: 'Los tequeños de guayaba son otro nivel. Ya pedí dos docenas más para el cumple de mi hija 🎉', reply: '¡Listo Jorge! Te los separo 🙌' },
  { name: 'Andrea R.', district: 'Independencia', time: '7:03 p. m.', message: 'Probé el ají de huacatay con los tequeños y me volví fan. Venezuela + Perú = amor', reply: 'Ese es nuestro giro favorito 😎' },
  { name: 'Luis F.', district: 'Comas', time: '6:28 p. m.', message: 'La torta tres leches estaba buenazaa, la gente no dejó ni las migajas jaja', reply: '¡Así nos gusta! 🍰' },
];

export const ABOUT_STORY = [
  'Santanita llegó a Lima con una maleta llena de recetas de su abuela y muchas ganas de compartir el sabor de Venezuela. Empezó haciendo tequeños para sus amigos los fines de semana… y los amigos de sus amigos empezaron a pedir más.',
  'Hoy prepara cada antojito a mano en San Martín de Porres, con ingredientes frescos y mucho cariño. Le encanta mezclar lo mejor de los dos países: un quesillo con caramelo de chicha morada, tequeños con ají amarillo o un ají de huacatay para acompañar.',
  'Su sueño es que cada bocado te saque una sonrisa — porque la felicidad empieza por un buen bocado.',
];

export const BRAND_VALUES = [
  { icon: 'volunteer_activism', title: 'Hecho a mano', text: 'Cada tequeño se enrolla uno por uno, cada quesillo se hornea en casa.' },
  { icon: 'eco', title: 'Ingredientes frescos', text: 'Sin conservantes: preparamos en pequeñas cantidades para que todo llegue fresquito.' },
  { icon: 'handshake', title: 'Trato cercano', text: 'Te atendemos como a familia, por WhatsApp y con paciencia.' },
  { icon: 'auto_awesome', title: 'Venezuela + Perú', text: 'Recetas de siempre con giros peruanos que te van a sorprender.' },
];
