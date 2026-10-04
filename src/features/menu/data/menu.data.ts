import type { Category, Product } from '../types/Product.type';

/**
 * Menu — names and prices exactly as provided by the client (naminam/naminam.md).
 * Do NOT add products that are not on that list. Descriptions/notes are draft
 * copy to be confirmed by the client.
 */

export const CATEGORIES: Category[] = [
  { id: 'racion', label: 'Postre', tagline: 'Porciones individuales para darte un gusto.' },
  { id: 'sbriciolata', label: 'Sbriciolata', tagline: 'Masa quebrada desmigada, horneada y crocante.' },
  { id: 'cheesecake', label: 'Cheesecake', tagline: 'Cremosos, horneados lento sobre base de galleta.' },
];

export const PRODUCTS: Product[] = [
  // ── Postre ──
  { slug: 'matilda', name: 'Matilda', categoryId: 'racion', price: 7, note: 'Chocolate intenso', badge: 'Favorito de la casa', isFeatured: true, isAddOn: false,
    description: 'Bizcocho húmedo de chocolate oscuro, en capas con ganache aterciopelado.' },
  { slug: 'torta-de-zanahoria', name: 'Torta de Zanahoria', categoryId: 'racion', price: 7, note: 'Especias y nueces', badge: '', isFeatured: false, isAddOn: false,
    description: 'Esponjosa, especiada y con su frosting cremoso de queso.' },
  { slug: 'torta-red-velvet', name: 'Torta Red Velvet', categoryId: 'racion', price: 6.5, note: 'Aterciopelada', badge: '', isFeatured: false, isAddOn: false,
    description: 'Clásica textura aterciopelada con suave crema de queso.' },
  { slug: 'brownie', name: 'Brownie', categoryId: 'racion', price: 5, note: 'Centro húmedo', badge: '', isFeatured: false, isAddOn: false,
    description: 'Chocolate intenso con centro húmedo y costra crujiente.' },
  { slug: 'brookie', name: 'Brookie', categoryId: 'racion', price: 6.5, note: 'Galleta + brownie', badge: '', isFeatured: false, isAddOn: false,
    description: 'Lo mejor de dos mundos: base de brownie y capa de galleta con chispas.' },
  { slug: 'torta-bombon', name: 'Torta Bombón', categoryId: 'racion', price: 8, note: 'Para chocolateros', badge: '', isFeatured: false, isAddOn: false,
    description: 'Capas de chocolate y crema, con el corazón de un bombón.' },
  { slug: 'cinnamon-rolls', name: 'Cinnamon Rolls', categoryId: 'racion', price: 4, note: 'Recién horneados', badge: '', isFeatured: false, isAddOn: false,
    description: 'Rollos de canela tiernos con glaseado de vainilla.' },
  { slug: 'tiramisu', name: 'Tiramisú', categoryId: 'racion', price: 6.5, note: 'Espresso y mascarpone', badge: '', isFeatured: true, isAddOn: false,
    description: 'Bizcochos bañados en café espresso, crema de mascarpone y cacao.' },
  { slug: 'tres-leches', name: 'Tres leches', categoryId: 'racion', price: 5, note: 'Receta tradicional', badge: '', isFeatured: false, isAddOn: false,
    description: 'Bizcocho esponjoso empapado en nuestra mezcla de tres leches.' },
  { slug: 'extra-de-helado', name: 'Extra de helado', categoryId: 'racion', price: 3.5, note: 'Ideal con Matilda o Brookie', badge: '', isFeatured: false, isAddOn: true,
    description: 'Una bola de helado para acompañar tu postre favorito.' },

  // ── Sbriciolata ──
  { slug: 'sbriciolata-nutella', name: 'Sbriciolata de Nutella', categoryId: 'sbriciolata', price: 6, note: 'Nutella tibia', badge: '', isFeatured: false, isAddOn: false,
    description: 'Masa crocante desmigada con un relleno generoso de Nutella.' },
  { slug: 'sbriciolata-manzana', name: 'Sbriciolata de Manzana', categoryId: 'sbriciolata', price: 6, note: 'Canela y manzana', badge: '', isFeatured: false, isAddOn: false,
    description: 'Relleno de manzanas especiadas con canela bajo una capa crocante.' },
  { slug: 'sbriciolata-ricota-y-mora', name: 'Sbriciolata de Ricota y Mora', categoryId: 'sbriciolata', price: 6, note: 'Moras silvestres', badge: '', isFeatured: false, isAddOn: false,
    description: 'Ricota suave con mora, entre dos capas de masa desmigada.' },

  // ── Cheesecake ──
  { slug: 'cheesecake-fresa', name: 'Cheesecake de Fresa', categoryId: 'cheesecake', price: 6, note: 'Fresas naturales', badge: '', isFeatured: true, isAddOn: false,
    description: 'Cremoso y horneado lentamente, con compota de fresas.' },
  { slug: 'cheesecake-frutos-rojos', name: 'Cheesecake de Frutos Rojos', categoryId: 'cheesecake', price: 6, note: 'Moras y arándanos', badge: '', isFeatured: false, isAddOn: false,
    description: 'Coronado con una mezcla brillante de frutos rojos.' },
  { slug: 'cheesecake-pistacho', name: 'Cheesecake de Pistacho', categoryId: 'cheesecake', price: 8, note: 'Pistacho de verdad', badge: 'Edición especial', isFeatured: true, isAddOn: false,
    description: 'Crema de queso con pasta de pistacho y lluvia de pistachos tostados.' },
  { slug: 'cheesecake-nutella', name: 'Cheesecake de Nutella', categoryId: 'cheesecake', price: 6.5, note: 'Avellana y cacao', badge: '', isFeatured: false, isAddOn: false,
    description: 'Cremoso, con Nutella por dentro y por encima.' },
  { slug: 'cheesecake-pirulin', name: 'Cheesecake de Pirulin', categoryId: 'cheesecake', price: 7.2, note: 'Sabor criollo', badge: 'Criollo', isFeatured: false, isAddOn: false,
    description: 'Un homenaje al clásico venezolano: crema de queso con Pirulin crocante.' },
  { slug: 'cheesecake-brownie', name: 'Cheesecake de Brownie', categoryId: 'cheesecake', price: 7, note: 'Doble placer', badge: '', isFeatured: false, isAddOn: false,
    description: 'Base de brownie y trozos de brownie horneados dentro del cheesecake.' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((product) => product.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((product) => product.isFeatured);
}

export function getCategoryLabel(categoryId: string): string {
  return CATEGORIES.find((category) => category.id === categoryId)?.label ?? '';
}
