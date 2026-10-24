'use client';

import Link from 'next/link';
import { BrandAnimation } from '@/features/core/components/BrandAnimation.component';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import { useSiteSettings } from '@/features/core/context/SiteSettings.context';
import { formatPrice } from '@/features/core/utils/format.util';
import { RequestSuccess } from '@/features/requests/components/RequestSuccess.component';
import { CartLineRow } from '../components/CartLineRow.component';
import { CheckoutForm } from '../components/CheckoutForm.component';
import { useCart } from '../hooks/useCart.hook';
import { useCheckout } from '../hooks/useCheckout.hook';
import styles from './CartContainer.module.css';

/** /carrito — review the order, delivery data, "Solicitar". */
export function CartContainer() {
  const cart = useCart();
  const checkout = useCheckout(cart);
  const { deliveryNote } = useSiteSettings();

  if (checkout.result) {
    return (
      <div className={`${styles.page} page-fade-in`}>
        <RequestSuccess
          title="¡Pedido enviado!"
          result={checkout.result}
          description="Recibirás un correo con tu orden. Santanita te escribirá por WhatsApp para confirmar disponibilidad, delivery y métodos de pago (Yape, Plin o transferencia)."
        />
      </div>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <div className={`${styles.page} ${styles.empty} page-fade-in`}>
        <BrandAnimation lottieSrc={BRAND_ASSETS.emptyCartLottie} label="Carrito vacío" emoji="🛍️" className={styles.emptyAnimation} />
        <h1 className={`${styles.title} font-display`}>Tu carrito está vacío</h1>
        <p className={styles.subtitle}>¿Qué se te antoja hoy?</p>
        <Link href="/menu" className={styles.menuLink}>
          Ver el menú
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.page} page-fade-in`}>
      <h1 className={`${styles.title} font-display`}>Tu pedido</h1>
      <div className={styles.layout}>
        <section aria-label="Productos" className={styles.linesColumn}>
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
          <div className={styles.summary}>
            <span>Total referencial</span>
            <strong className="font-display">{formatPrice(cart.total)}</strong>
          </div>
          <p className={styles.note}>
            <span className="material-symbols-outlined">delivery_dining</span>
            {deliveryNote} El costo final se confirma por WhatsApp.
          </p>
        </section>
        <section aria-labelledby="checkout-title" className={styles.checkoutColumn}>
          <h2 id="checkout-title" className={`${styles.checkoutTitle} font-display`}>
            ¿A dónde te lo llevamos?
          </h2>
          <p className={styles.noPayment}>Aquí no pagas nada: coordinamos el pago por WhatsApp.</p>
          <CheckoutForm form={checkout} />
        </section>
      </div>
    </div>
  );
}
