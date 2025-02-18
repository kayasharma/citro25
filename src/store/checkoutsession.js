import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./checkoutsession.css";

const CheckoutPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [price, setPrice] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch available events
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => console.error('Error fetching events:', error));

    // Fetch user details
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('http://localhost:5000/api/user', { 
        headers: { 'Authorization': `Bearer ${token}` } 
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => console.error('Error fetching user:', error));
    }
  }, []);

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId);
    const event = events.find(e => e.id === eventId);
    if (event) setPrice(event.price);
  };

  const handleCheckout = async () => {
    if (!selectedEvent) {
      return alert('Please select an event.');
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/api/create-checkout-session', {
        eventId: selectedEvent,
        userId: user.id,
        quantity
      });

      window.location.href = res.data.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Failed to initiate checkout.');
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Event Checkout</h2>

      {/* Event Selection */}
      <label>Select Event:</label>
      <select onChange={(e) => handleEventChange(e.target.value)} value={selectedEvent}>
        <option value="">-- Select Event --</option>
        {events.map(event => (
          <option key={event.id} value={event.id}>
            {event.name} - ₹{event.price}
          </option>
        ))}
      </select>

      {/* User Info */}
      <div className="user-info">
        <p><strong>Name:</strong> {user.name || 'Loading...'}</p>
        <p><strong>Email:</strong> {user.email || 'Loading...'}</p>
      </div>

      {/* Quantity Selection */}
      <label>Quantity:</label>
      <input 
        type="number" 
        min="1" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)}
      />

      {/* Price Display */}
      <p><strong>Total Price:</strong> ₹{price * quantity}</p>

      {/* Checkout Button */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default CheckoutPage;
