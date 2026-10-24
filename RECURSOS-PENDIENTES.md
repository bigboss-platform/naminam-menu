# Recursos pendientes — Los Antojitos de Santanita

Lista de logos, Lotties e imágenes para el sitio (v1 y v2).

**Ya puestos (2026-10-24):** logo circular de la mascota (`public/brand/logo.webp`, también ícono de la
pestaña y de iPhone, sitio y panel), mascota detallada (`public/brand/mascota.webp`, reemplaza a las
Lotties y se usa en pantallas de carga) y fotos **provisionales** de los 14 productos (Wikimedia Commons,
CC0 salvo dos CC BY con crédito en el menú).

**Cómo agregarlos:** pon los archivos en `public/brand/` (Lotties en `public/brand/lottie/`, fotos de
productos en `public/brand/products/`) y escribe la ruta en
`src/features/core/config/brandAssets.config.ts`. Ejemplo: `mascotHeroLottie: '/brand/lottie/mascota-hero.lottie'`.

**Paleta:** Manjar `#F7B52C` · Guayaba `#D92F52` · Turquesa `#5BBFB5` · Arena `#F6D295` · Cacao `#3B1F14` · Blanco.

**Mascota:** chica de cabello castaño con cola de caballo, lentes de montura gruesa roja, bandana rosada
con lunares blancos y chaqueta colorida (inspirada en la bata de mariposa de *Demon Slayer*).

---

## 1. Logos

| ✔ | Recurso | Dónde se ve | Formato | Clave en `brandAssets.config.ts` |
|---|---|---|---|---|
| ✔ | **Logo principal** (`Img_Logo_Main`, circular, solo el muñeco) | Barra superior, footer, login del panel, espacio vacío de las fotos | SVG o PNG transparente, cuadrado, 512×512 | `logo` |
| ✔ | **Favicon** (ícono de la pestaña) | Pestaña del navegador (sitio y panel) | SVG cuadrado, o PNG 512×512. Versión simple que se lea a 16 px (la "S" o la cara de la mascota) | Reemplaza `src/app/icon.svg` |
| ✔ | **Apple icon** | Al guardar el sitio en la pantalla de inicio del iPhone | PNG 180×180, sin transparencia | Va en `src/app/apple-icon.png` |

## 2. Lotties

Formato `.lottie` (más liviano) o `.json`, cuadradas, idealmente de menos de 150 KB cada una.
Mientras no existan, se muestra la mascota detallada (`mascota.webp`).

| ✔ | Animación | Dónde se ve | Idea | ¿Se repite? | Clave |
|---|---|---|---|---|---|
| ☐ | **Mascota del hero** | Inicio, al lado de "La felicidad empieza por un buen bocado" | Santanita saludando o guiñando el ojo | Sí, suave | `mascotHeroLottie` (respaldo: `mascotHeroImage`) |
| ☐ | **Mascota en bici** (`Img_Mascot_Bike`) | Banner "¡Delivery gratis!" | Santanita pedaleando con una caja | Sí | `mascotBikeLottie` (respaldo: `mascotBikeImage`) |
| ☐ | **Carrito vacío** | `/carrito` cuando no hay productos | Santanita buscando o con una bolsa vacía | Sí | `emptyCartLottie` |
| ☐ | **Pedido enviado** | Pantalla final de pedido, cotización, reclamo y tarjeta de antojos | Celebración: confeti, pulgar arriba o Santanita saltando | No, una sola vez | `orderSentLottie` |

## 3. Imágenes

| ✔ | Imagen | Dónde se ve | Formato | Clave |
|---|---|---|---|---|
| ☐ | **Foto de Santanita** | Página "Sobre Santanita" (se muestra recortada en círculo) | JPG o WebP cuadrado, 800×800 | `aboutPhoto` |
| ☐ | **Tarjeta de fidelidad** (`Img_QR_Loyalty`) — opcional | Página oculta `/tarjeta-de-antojos` | PNG o JPG | `loyaltyCard` |
| ☐ | **Capturas de testimonios** (4) | Sección "Nuestros antojaditos nos cuentan…" | PNG vertical, capturas de WhatsApp con el nombre del cliente tapado | *Aún no conectado — avisar para agregarlo* |
| ☐ | **Imagen para compartir** | Vista previa al pegar el link en WhatsApp o Facebook | JPG 1200×630, con logo, mascota y frase | *Aún no conectado — avisar para agregarlo* |

### Fotos de productos (14)

Formato JPG o WebP 4:3, unos 1200×900. Hoy hay fotos provisionales en `public/brand/products/<código>.webp`:
para usar la foto real basta con reemplazar ese archivo con el mismo nombre. Si reemplazas la de
Ponche Crema o Tequeños de pan de jamón, borra su línea en `PHOTO_CREDITS`.

| ✔ | Producto | Código (`PRODUCT_PHOTOS`) | Sección |
|---|---|---|---|
| ☐ | Tequeños | `tequenos` | Consentidos de la casa |
| ☐ | Salsas de la casa | `salsas` | Pasapalos salados |
| ☐ | Mini empanadas | `mini-empanadas` | Pasapalos salados |
| ☐ | Dulce de higo | `dulce-de-higo` | Pasapalos dulces |
| ☐ | Golfeados | `golfeados` | Pasapalos dulces |
| ☐ | Besitos de coco | `besitos-de-coco` | Pasapalos dulces |
| ☐ | Quesillo | `quesillo` | Consentidos de la casa |
| ☐ | Tortas | `tortas` | Consentidos de la casa |
| ☐ | Bienmesabe | `bienmesabe` | Postres |
| ☐ | Papelón con limón | `papelon-con-limon` | Bebidas |
| ☐ | Chicha venezolana | `chicha-venezolana` | Bebidas |
| ☐ | Ponche Crema | `ponche-crema` | Especiales de temporada |
| ☐ | Tequeños de pan de jamón | `tequenos-pan-de-jamon` | Especiales de temporada |
| ☐ | Quesillo de chicha morada | `quesillo-chicha-morada` | Inventos del mes |

Ejemplo:

```ts
export const PRODUCT_PHOTOS: Record<string, string> = {
  tequenos: '/brand/products/tequenos.webp',
  quesillo: '/brand/products/quesillo.webp',
};
```

---

## Prioridad sugerida

1. ~~Logo principal y favicon~~ (listo).
2. Lottie de la mascota del hero — es lo primero que se ve.
3. Lottie de pedido enviado.
4. Lottie de la mascota en bici.
5. Lottie de carrito vacío.
6. Fotos de productos, a medida que la clienta las tome.
