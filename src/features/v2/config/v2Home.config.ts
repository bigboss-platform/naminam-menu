/**
 * "Los consentidos de la casa" cards as the mockup draws them: a big heading (the star flavor),
 * the product name pill and the price pill, each card in its own soft color.
 */
export type V2FeaturedCard = {
  slug: string;
  heading: string;
  theme: 'teal' | 'pink' | 'yellow';
  namePill: 'pink' | 'yellow';
  pricePill: 'dark' | 'yellow';
};

export const V2_FEATURED_CARDS: V2FeaturedCard[] = [
  { slug: 'quesillo', heading: 'Quesillo', theme: 'teal', namePill: 'pink', pricePill: 'dark' },
  { slug: 'tequenos', heading: 'Guayaba', theme: 'pink', namePill: 'pink', pricePill: 'yellow' },
  { slug: 'tortas', heading: 'Manjar', theme: 'yellow', namePill: 'yellow', pricePill: 'dark' },
];

/** Mockup price style: "S/25", "Desde S/15". */
export function formatV2Price(amount: number, hasVariants = false): string {
  const value = Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
  return `${hasVariants ? 'Desde ' : ''}S/${value}`;
}
