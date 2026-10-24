import type { Category, Product, ProductVariant } from '../types/Product.type';

/**
 * MVP menu (static — the site does not read the database yet).
 * Real data from the PRD: Quesillo 13 cm S/25 (4 variantes), Tequeños desde S/15 (8 sabores),
 * Tortas desde S/20, Dulce de higo, salsas (3 sabores), temporada: tequeños de pan de jamón y
 * ponche crema. EVERYTHING ELSE (names, prices, descriptions) IS PLACEHOLDER COPY to be
 * confirmed by the client. Photos: empty = branded placeholder (see core/config/brandAssets.config.ts).
 */

export const CATEGORIES: Category[] = [
  { id: 'pasapalos-salados', label: 'Pasapalos salados', tagline: 'Para picar, compartir y repetir.' },
  { id: 'pasapalos-dulces', label: 'Pasapalos dulces', tagline: 'Bocaditos dulces para cualquier antojo.' },
  { id: 'postres', label: 'Postres', tagline: 'Recetas venezolanas de casa, con giros peruanos.' },
  { id: 'bebidas', label: 'Bebidas', tagline: 'Para acompañar (o brindar).' },
  { id: 'inventos-del-mes', label: 'Inventos del mes', tagline: 'Lo nuevo que salió de la cocina de Santanita.' },
];

type ProductInput = Partial<Product> & Pick<Product, 'slug' | 'name' | 'categoryId' | 'description'>;

function variants(list: [string, number][]): ProductVariant[] {
  return list.map(([label, price]) => ({
    id: label.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-'),
    label,
    price,
  }));
}

function product(input: ProductInput): Product {
  const variantList = input.variants ?? [];
  const lowestVariantPrice = variantList.length > 0 ? Math.min(...variantList.map((variant) => variant.price)) : 0;
  return {
    price: lowestVariantPrice,
    story: '',
    note: '',
    badge: '',
    isFeatured: false,
    isSeasonal: false,
    isAddOn: false,
    stockStatus: 'in_stock',
    variantLabel: '¿Qué sabor quieres?',
    variants: [],
    mediaType: 'image',
    mediaUrl: '',
    posterUrl: '',
    ...input,
  };
}

export const PRODUCTS: Product[] = [
  // ── Pasapalos salados ──
  product({
    slug: 'tequenos', name: 'Tequeños', categoryId: 'pasapalos-salados', isFeatured: true, badge: '¡El más pedido!',
    note: 'Docena · crudos o fritos',
    description: 'Deditos de masa crujiente rellenos de queso blanco llanero. Ocho sabores para elegir.',
    story: 'En Venezuela no hay fiesta sin tequeños. Santanita los enrolla uno por uno con su masa de la casa y queso que se estira de verdad. Puedes pedirlos crujientes y listos para comer, o congelados para freírlos (u hornearlos) en casa cuando te dé el antojo.',
    variants: variants([
      ['Queso blanco', 15], ['Queso y jamón', 17], ['Queso y guayaba', 17], ['Queso y chocolate', 18],
      ['Queso y ají amarillo', 17], ['Queso y tocino', 18], ['Queso y choclo', 17], ['Pizza', 18],
    ]),
  }),
  product({
    slug: 'salsas', name: 'Salsas de la casa', categoryId: 'pasapalos-salados', isAddOn: true,
    note: 'Pote de 120 ml',
    description: 'El compañero perfecto para tus tequeños. Tres sabores hechos en casa.',
    variants: variants([['Guasacaca', 5], ['Salsa rosada', 5], ['Ají de huacatay', 6]]),
  }),
  product({
    slug: 'mini-empanadas', name: 'Mini empanadas', categoryId: 'pasapalos-salados', price: 20, stockStatus: 'on_order',
    note: 'Bandeja de 10',
    description: 'Empanaditas de harina de maíz, doraditas por fuera y jugosas por dentro.',
    variantLabel: '¿De qué las quieres?', variants: variants([['Carne mechada', 20], ['Pollo', 20], ['Queso', 18]]),
  }),

  // ── Pasapalos dulces ──
  product({
    slug: 'dulce-de-higo', name: 'Dulce de higo', categoryId: 'pasapalos-dulces', price: 18, stockStatus: 'on_order',
    note: 'Frasco de 250 g',
    description: 'Higos cocidos lento en papelón y canela, como en casa de la abuela.',
    story: 'Una receta de familia que Santanita prepara en pocas cantidades: los higos se cocinan a fuego bajo durante horas hasta quedar brillantes y tiernos. Delicioso solo, con queso blanco o sobre un helado.',
  }),
  product({
    slug: 'golfeados', name: 'Golfeados', categoryId: 'pasapalos-dulces', price: 16,
    note: 'Caja de 6',
    description: 'Espirales de pan dulce con papelón, anís y queso rallado por encima.',
  }),
  product({
    slug: 'besitos-de-coco', name: 'Besitos de coco', categoryId: 'pasapalos-dulces', price: 12, stockStatus: 'sold_out',
    note: 'Bolsita de 12',
    description: 'Bocaditos de coco rallado, suaves por dentro y tostaditos por fuera.',
  }),

  // ── Postres ──
  product({
    slug: 'quesillo', name: 'Quesillo', categoryId: 'postres', isFeatured: true, badge: '¡Top 1!', variantLabel: '¿Cuál quesillo quieres?',
    note: '13 cm de diámetro · tupper hexagonal',
    description: 'El flan venezolano más cremoso, bañado en caramelo. Te llevas caramelo extra aparte.',
    story: 'El quesillo es la crema volteada venezolana: más denso y cremoso que un flan, con sus característicos huequitos. Llega en un tupper hexagonal reusable y con una bolsita de caramelo extra, porque nunca sobra.',
    variants: variants([['Clásico', 25], ['Café', 27], ['Coco', 27], ['Lúcuma', 28]]),
  }),
  product({
    slug: 'tortas', name: 'Tortas', categoryId: 'postres', isFeatured: true, variantLabel: '¿Qué torta quieres?',
    note: 'Porción familiar (8 porciones)',
    description: 'Bizcochos húmedos de receta casera para cumpleaños, reuniones o porque sí.',
    story: 'Cada torta se hornea el mismo día de la entrega. Si quieres una decoración especial, un mensaje o un tamaño distinto, pídela desde la sección Cotizar.',
    variants: variants([['Torta tres leches', 20], ['Torta de zanahoria', 22], ['Torta de chocolate', 24], ['Marquesa de chocolate', 26]]),
  }),
  product({
    slug: 'bienmesabe', name: 'Bienmesabe', categoryId: 'postres', price: 22, stockStatus: 'on_order',
    note: 'Molde individual grande',
    description: 'Bizcocho bañado en crema de coco, con su toque de canela.',
  }),

  // ── Bebidas ──
  product({
    slug: 'papelon-con-limon', name: 'Papelón con limón', categoryId: 'bebidas', price: 6,
    note: 'Botella de 500 ml',
    description: 'Refrescante bebida de papelón y limón recién exprimido.',
  }),
  product({
    slug: 'chicha-venezolana', name: 'Chicha venezolana', categoryId: 'bebidas', price: 9,
    note: 'Botella de 500 ml',
    description: 'Cremosa bebida de arroz con leche y canela, bien fría.',
  }),
  product({
    slug: 'ponche-crema', name: 'Ponche Crema', categoryId: 'bebidas', price: 35, isSeasonal: true, stockStatus: 'on_order',
    badge: 'Navidad', note: 'Botella de 750 ml',
    description: 'El licor navideño venezolano: cremoso, con nuez moscada. Solo en diciembre.',
  }),

  // ── Inventos del mes ──
  product({
    slug: 'tequenos-pan-de-jamon', name: 'Tequeños de pan de jamón', categoryId: 'inventos-del-mes', price: 20,
    isSeasonal: true, badge: 'Temporada', note: 'Docena',
    description: 'Lo mejor de la Navidad venezolana en un tequeño: jamón, pasas y aceitunas.',
  }),
  product({
    slug: 'quesillo-chicha-morada', name: 'Quesillo de chicha morada', categoryId: 'inventos-del-mes', price: 28,
    badge: 'Nuevo', note: '13 cm de diámetro',
    description: 'Nuestro quesillo con un giro bien peruano: caramelo de chicha morada.',
  }),
];
