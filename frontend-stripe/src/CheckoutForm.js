// CheckoutForm.js
/*import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
  
    const cardElement = elements.getElement(CardElement);
    
    // Llamada a tu backend para crear el PaymentIntent
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Monto en centavos
    });
  
    const { clientSecret } = await response.json();
  
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
  
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Pago exitoso');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </form>
  );
};

export default CheckoutForm;
*/


import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [amount, setAmount] = useState(''); // Estado para almacenar el monto dinámico

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
  
    const cardElement = elements.getElement(CardElement);
    
    // Validamos que el monto ingresado sea un número positivo
    const amountInCents = parseFloat(amount) * 100; // Convertimos a centavos

    if (isNaN(amountInCents) || amountInCents <= 0) {
      setError('Por favor, ingresa un monto válido.');
      return;
    }

    // Llamada a tu backend para crear el PaymentIntent con el monto ingresado
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amountInCents }), // Monto dinámico en centavos
    });
  
    const { clientSecret } = await response.json();
  
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
  
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Pago exitoso');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Monto a pagar (USD):
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Ingresa el monto"
        />
      </label>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </form>
  );
};

export default CheckoutForm;
