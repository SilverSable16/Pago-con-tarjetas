// App.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Q9fphRwxlCBKBbMqGZIpOKYldZ6cuUOhRTpdx5PWfvNhxHDVQbQmygcOqoIa9PvVuWYac3I9v8rixUe2aGTjCe700opaMRjKy');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
