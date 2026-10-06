export type RadialProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

/** Ellipse + card sizes, derived from the component width so it adapts to phones. */
export type RadialGeometry = {
  width: number;
  height: number;
  radiusX: number;
  radiusY: number;
  centerX: number;
  centerY: number;
  cardWidth: number;
  cardHeight: number;
};
