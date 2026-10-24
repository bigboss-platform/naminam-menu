'use client';

import { useSiteSettings } from '@/features/core/context/SiteSettings.context';
import { buildWhatsAppUrl, isPlaceholderWhatsApp } from '@/features/core/utils/whatsapp.util';
import { useRequestForm } from '@/features/requests/hooks/useRequestForm.hook';
import { validateOrderCustomer } from '@/features/requests/utils/requests.validation';
import type { CartCtx } from './useCart.hook';

export const CHECKOUT_INITIAL_VALUES = {
  name: '',
  whatsapp: '',
  email: '',
  district: 'San Martín de Porres',
  address: '',
  deliveryDate: '',
  notes: '',
};

/**
 * PRD flow: "Solicitar" (no payment) → email to customer + owner → WhatsApp with the order
 * ready → the owner confirms stock, delivery and payment (Yape, Plin, transferencia).
 */
export function useCheckout(cart: CartCtx) {
  const { whatsappNumber } = useSiteSettings();
  return useRequestForm({
    initialValues: CHECKOUT_INITIAL_VALUES,
    validate: validateOrderCustomer,
    toPayload: (customer) => ({
      type: 'pedido',
      customer,
      lines: cart.lines.map(({ slug, variantId, quantity }) => ({ slug, variantId, quantity })),
    }),
    onSuccess: (result) => {
      cart.clearCart();
      if (!isPlaceholderWhatsApp(whatsappNumber)) {
        window.location.assign(buildWhatsAppUrl(whatsappNumber, result.whatsappMessage));
      }
    },
  });
}

export type CheckoutCtx = ReturnType<typeof useCheckout>;
