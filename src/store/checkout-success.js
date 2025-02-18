import { useEffect, useState } from 'react';

const CheckoutSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // Get the session_id from URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    const verifyPayment = async () => {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const result = await res.json();
      if (result.success) {
        setPaymentStatus('Payment successful!');
      } else {
        setPaymentStatus('Payment failed.');
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, []);

  return (
    <div>
      <h2>{paymentStatus}</h2>
      {paymentStatus === 'Payment successful!' && (
        <p>Thank you for your purchase! You will receive an email confirmation shortly.</p>
      )}
    </div>
  );
};

export default CheckoutSuccess;
