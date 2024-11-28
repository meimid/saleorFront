import React, { useState } from 'react';
import { useManualPayment } from './useManualPayment';
import { useCheckout } from '@/checkout/hooks/useCheckout';

export const ManualPayment = () => {
  const { checkout } = useCheckout();
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { completeManualPayment } = useManualPayment();

  const handleSubmit = async () => {
    if (!checkout?.id || !checkout?.totalPrice?.gross?.amount) {
      alert('Checkout ID or total amount is missing.');
      return;
    }

    try {
      setIsProcessing(true);

      console.log('Phone:', phone);
      console.log('Note:', note);
      console.log('Checkout data:', checkout);

      // Trigger the checkout completion
      await completeManualPayment(checkout.id, checkout.totalPrice.gross.amount, phone, note);
      
    } catch (error) {
      console.error('Failed to complete checkout:', error);
     
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="manual-payment">
      <h3 className="text-lg font-bold mb-4">Manual Payment</h3>
      <div className="mb-4">
        <label className="block mb-1">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        {isProcessing ? 'Processing...' : 'Submit Payment'}
      </button>
    </div>
  );
};
