# Los Antojitos de Santanita — sitio web (rama `santanita`)

Landing + menú + carrito sin pasarela de pago para Los Antojitos de Santanita (Lima, SMP).
Basado en el sitio de Ñami Ñam (Next.js 16 + React 19 + CSS Modules). **MVP: sin base de datos.**

```bash
npm install
npm run dev        # http://localhost:3000
```

## Flujo de compra (PRD sección 2)

Menú → "Añadir" (con variante) → carrito (`/carrito`, se guarda en el navegador) → datos de entrega →
**Solicitar pedido** → `POST /api/solicitudes` (recalcula precios en el servidor, genera código `PED-…`,
envía correo si hay `RESEND_API_KEY`) → abre WhatsApp con el pedido armado.
Mientras el WhatsApp sea el falso, la pantalla final muestra cómo llegaría el mensaje.

## Páginas

| Ruta | Qué es |
|---|---|
| `/` | Hero, Los consentidos de la casa, Especiales de temporada, Delivery, Síguenos, Cotizador, Testimonios |
| `/menu` | Catálogo por categorías, variantes, estado de stock, "Leer más", Añadir |
| `/carrito` | Pedido + datos de entrega + Solicitar |
| `/como-ordenar`, `/cotizar`, `/consejos` (+ 7 artículos), `/sobre-santanita` | Contenido |
| `/libro-de-reclamaciones` | Formulario legal (Perú) |
| `/tarjeta-de-antojos` | Página oculta para el QR de fidelidad (no indexada) |

## Dónde cambiar cada cosa

| Qué | Archivo |
|---|---|
| Productos, precios, variantes, stock, temporada | `src/features/menu/data/menu.data.ts` |
| WhatsApp, Instagram, Facebook, horarios, correo, RUC | `src/features/core/config/business.config.ts` |
| Logo, mascota, Lotties, fotos | `src/features/core/config/brandAssets.config.ts` (archivos en `public/brand/`) |
| Colores y tipografías | `src/app/globals.css` (`:root`) y `src/app/layout.tsx` |
| Textos de Consejos | `src/features/content/data/tips.data.ts` |
| Cómo ordenar, Sobre Santanita, testimonios | `src/features/content/data/pages.data.ts` |

**Datos inventados (confirmar con la clienta):** casi todo el menú y sus precios (salvo Quesillo S/25,
Tequeños desde S/15, Tortas desde S/20), horarios, distritos de delivery, testimonios, artículos,
historia, RUC/razón social. WhatsApp e Instagram son falsos y sus enlaces no llevan a ningún lado.

## Variables de entorno

Todas opcionales — ver `.env.example` (correo con Resend, URL pública).

## Verificar antes de subir

```bash
npx tsc --noEmit && npx eslint src --max-warnings=0 && npx next build
```
