'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartLineRow } from '@/features/cart/components/CartLineRow.component';
import { CheckoutForm } from '@/features/cart/components/CheckoutForm.component';
import { useCart } from '@/features/cart/hooks/useCart.hook';
import { useCheckout } from '@/features/cart/hooks/useCheckout.hook';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import { useSiteSettings } from '@/features/core/context/SiteSettings.context';
import { RequestSuccess } from '@/features/requests/components/RequestSuccess.component';
import { V2_BASE } from '../config/v2Nav.constants';
import { formatV2Price } from '../config/v2Home.config';
import { V2Page } from '../components/V2Page.component';
import { V2Panel } from '../components/V2Panel.component';
import styles from './V2CartContainer.module.css';

/** Version 2 cart: order panel + delivery panel (same flow as version 1). */
export function V2CartContainer() {
  const cart = useCart();
  const checkout = useCheckout(cart);
  const { deliveryNote } = useSiteSettings();

  if (checkout.result) {
    return (
      <V2Page title="¡Pedido enviado!" width="narrow">
        <RequestSuccess
          title="¡Gracias por tu antojo!"
          result={checkout.result}
          description="Recibirás un correo con tu orden. Santanita te escribirá por WhatsApp para confirmar disponibilidad, delivery y métodos de pago (Yape, Plin o transferencia)."
        />
      </V2Page>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <V2Page title="Tu carrito está vacío" width="narrow">
        <div className={styles.empty}>
          <div className={styles.mascot}>
            <Image src={BRAND_ASSETS.mascot} alt="Santanita te espera" fill sizes="240px" className={styles.mascotImage} />
          </div>
          <p className={styles.emptyText}>¿Qué se te antoja hoy?</p>
          <Link href={`${V2_BASE}/menu`} className={styles.menuButton}>
            Ver Menú
          </Link>
        </div>
      </V2Page>
    );
  }

  return (
    <V2Page title="Tu pedido">
      <div className={styles.layout}>
        <V2Panel title="Lo que pediste" tone="cream" id="v2-cart-lines">
          <ul className={styles.lines}>
            {cart.lines.map((line) => (
              <CartLineRow
                key={line.key}
                line={line}
                onQuantityChange={(delta) => cart.changeQuantity(line.key, delta)}
                onRemove={() => cart.removeItem(line.key)}
              />
            ))}
          </ul>
          <div className={styles.total}>
            <span>Total referencial</span>
            <strong>{formatV2Price(cart.total)}</strong>
          </div>
          <p className={styles.note}>{deliveryNote} El costo final se confirma por WhatsApp.</p>
        </V2Panel>

        <V2Panel title="¿A dónde te lo llevamos?" id="v2-checkout">
          <p className={styles.noPayment}>Aquí no pagas nada: coordinamos el pago por WhatsApp.</p>
          <CheckoutForm form={checkout} />
        </V2Panel>
      </div>
    </V2Page>
  );
}
