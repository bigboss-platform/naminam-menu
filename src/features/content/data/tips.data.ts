/**
 * "Consejos de consumo" (PRD 4.4, SEO blog). Titles from the PRD; the article bodies are
 * PLACEHOLDER COPY written for the MVP — Santanita should review them.
 */
export type TipArticle = {
  slug: string;
  title: string;
  /** Meta description + card summary. */
  summary: string;
  icon: string;
  readingMinutes: number;
  sections: { heading: string; paragraphs: string[] }[];
};

export const TIP_ARTICLES: TipArticle[] = [
  {
    slug: 'pedido-congelado',
    title: '¿Pedido congelado? Te recomendamos…',
    summary: 'Cómo guardar tus tequeños y pasapalos congelados para que salgan como recién hechos.',
    icon: 'ac_unit',
    readingMinutes: 3,
    sections: [
      { heading: 'Directo al congelador', paragraphs: ['Apenas recibas tu pedido, guárdalo en el congelador sin descongelar. Los tequeños aguantan hasta 3 meses a -18 °C en su bolsa bien cerrada.'] },
      { heading: 'No los descongeles antes de cocinarlos', paragraphs: ['Fríelos u hornéalos directo del congelador. Si se descongelan, el queso se humedece y la masa se abre al freír.'] },
      { heading: 'Una vez descongelados, no vuelvas a congelar', paragraphs: ['Si se te descongelaron por accidente, cocínalos ese mismo día.'] },
    ],
  },
  {
    slug: 'postres-refrigeracion',
    title: 'Postres: refrigeración y almacenamiento',
    summary: 'Cuánto dura tu quesillo, tu torta y tu dulce de higo en la refri (y cómo servirlos).',
    icon: 'kitchen',
    readingMinutes: 3,
    sections: [
      { heading: 'Quesillo', paragraphs: ['Siempre refrigerado, en su tupper hexagonal tapado. Dura hasta 5 días. Agrégale el caramelo extra justo antes de servir para que brille.'] },
      { heading: 'Tortas', paragraphs: ['Las tortas con crema van a la refri y duran 3 días. Sácalas 15 minutos antes de comer para que la textura sea más suave.'] },
      { heading: 'Dulce de higo', paragraphs: ['Cerrado dura un mes en un lugar fresco. Una vez abierto, guárdalo en la refri y úsalo en dos semanas, siempre con cuchara limpia.'] },
    ],
  },
  {
    slug: 'freir-hornear-freidora-de-aire',
    title: '¿Freír, hornear o freidora de aire?',
    summary: 'Tiempos y temperaturas para que tus tequeños queden dorados y con el queso derretido.',
    icon: 'local_fire_department',
    readingMinutes: 4,
    sections: [
      { heading: 'Freír (el clásico)', paragraphs: ['Aceite abundante a 175 °C, de 3 a 4 minutos hasta que estén dorados. No llenes la olla: fríe de a pocos para que el aceite no se enfríe.'] },
      { heading: 'Horno', paragraphs: ['Precalienta a 200 °C, pincela con un poquito de aceite y hornea 15 a 18 minutos, volteándolos a la mitad.'] },
      { heading: 'Freidora de aire', paragraphs: ['A 190 °C por 10 a 12 minutos, sacudiendo la canasta a mitad de tiempo. Quedan crujientes y con menos grasa.'] },
    ],
  },
  {
    slug: 'recalentar',
    title: 'Recalentarlos… ¡debe ser más rico!',
    summary: '¿Te sobraron tequeños o empanadas? Así los recuperas sin que queden blandos.',
    icon: 'microwave',
    readingMinutes: 2,
    sections: [
      { heading: 'Evita el microondas', paragraphs: ['El microondas ablanda la masa. Mejor usa horno o freidora de aire: 5 minutos a 180 °C y vuelven a estar crujientes.'] },
      { heading: 'En sartén', paragraphs: ['Sartén sin aceite a fuego medio, tapada, 2 minutos por lado. El queso se derrite de nuevo.'] },
    ],
  },
  {
    slug: 'salsas-durabilidad',
    title: 'Salsas y su durabilidad',
    summary: 'Guasacaca, salsa rosada y ají de huacatay: cuánto duran y cómo conservarlas.',
    icon: 'water_drop',
    readingMinutes: 2,
    sections: [
      { heading: 'Siempre refrigeradas', paragraphs: ['Nuestras salsas son caseras y sin conservantes. Duran 5 días en la refri, bien tapadas.'] },
      { heading: 'La guasacaca se oxida', paragraphs: ['Si la superficie se oscurece, mézclala bien: es la palta oxidándose y sigue siendo segura dentro de su tiempo.'] },
    ],
  },
  {
    slug: 'lactosa-y-alergenos',
    title: 'Intolerancia a la lactosa y alérgenos',
    summary: 'Qué productos llevan leche, gluten, huevo o frutos secos, y cómo pedir opciones.',
    icon: 'egg_alt',
    readingMinutes: 3,
    sections: [
      { heading: 'Lo que debes saber', paragraphs: ['Casi todos nuestros productos llevan harina de trigo (gluten), leche y huevo. Algunos postres pueden tener trazas de frutos secos.'] },
      { heading: '¿Tienes una alergia?', paragraphs: ['Escríbelo en las notas del pedido o pide una versión especial desde Cotizar. Te diremos con honestidad si podemos prepararlo de forma segura.'] },
    ],
  },
  {
    slug: 'acompanaditos',
    title: 'Acompañaditos saben más sabroso',
    summary: 'Las combinaciones favoritas de nuestros clientes para tu próxima reunión.',
    icon: 'handshake',
    readingMinutes: 2,
    sections: [
      { heading: 'Tequeños + guasacaca', paragraphs: ['El combo venezolano por excelencia. Si te gusta el picante, prueba el ají de huacatay: nuestro giro peruano.'] },
      { heading: 'Quesillo + café', paragraphs: ['Un cafecito pasado y una porción de quesillo de café. No necesitas más para la tarde.'] },
      { heading: 'Golfeados + queso blanco', paragraphs: ['Calientitos y con una lámina de queso blanco encima: dulce y salado en un bocado.'] },
    ],
  },
];

export function getTipArticle(slug: string): TipArticle | undefined {
  return TIP_ARTICLES.find((article) => article.slug === slug);
}
