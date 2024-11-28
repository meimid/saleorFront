import { useMutation } from 'urql';
import { CHECKOUT_COMPLETE_MUTATION } from '@/checkout/graphql/checkoutCompleteMutation';
import { replaceUrl } from '@/checkout/lib/utils/url';

export const useManualPayment = () => {
  const [completeCheckoutResult, completeCheckout] = useMutation(CHECKOUT_COMPLETE_MUTATION);

  const handleManualPaymentSuccess = (orderId: string) => {
    console.log('Manual payment successful. Redirecting to success page...');
    const newUrl = replaceUrl({
      query: { order: orderId },
    });
    window.location.href = newUrl; // Redirect to the order success page
  };

  const completeManualPayment = async (checkoutId: string, phone: string, note: string) => {
    try {
      // Call checkoutComplete directly without authentication
      const completeCheckoutResponse = await completeCheckout({ checkoutId, phone, note });

      if (
        completeCheckoutResponse.error ||
        !completeCheckoutResponse.data ||
        completeCheckoutResponse.data.checkoutComplete.errors?.length
      ) {
        throw new Error(
          "Checkout completion failed: " +
            JSON.stringify(completeCheckoutResponse.data?.checkoutComplete?.errors || "Unknown error")
        );
      }

      const order = completeCheckoutResponse.data.checkoutComplete.order;
      if (order) {
        handleManualPaymentSuccess(order.id); // Redirect to success page
      }
    } catch (error) {
      console.error("Error completing manual payment:", error);
      throw error;
    }
  };

  return { completeManualPayment, completeCheckoutResult };
};