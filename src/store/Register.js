import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();  

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [city, setCity] = useState('');
    const [collegeName, setCollegeName] = useState('Chameli Devi Group of Institution');
    const [customCollegeName, setCustomCollegeName] = useState('');
    const [enrollmentNumber, setEnrollmentNumber] = useState('');

    const [isRegistered, setIsRegistered] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCollegeName = collegeName === 'Other' ? customCollegeName : collegeName;

        const userData = {
            name: username,
            email,
            password,
            city,
            collegeName: finalCollegeName,
            enrollmentNumber
        };

        axios.post('http://localhost:5000/api/auth/signup', userData)
            .then(response => {
                alert('Signup successful');
                localStorage.setItem('authToken', response.data.token);
                setIsRegistered(true);

                if (eventId) {
                    navigate(`/checkout/${eventId}`);
                } else {
                    navigate('/checkout');
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('Error during registration');
            });
    };

    const initiatePayment = async () => {
        if (!eventId) {
            return alert("Event ID is required to initiate payment.");
        }

        try {
            const response = await axios.post('http://localhost:5000/api/create-checkout-session', {
                eventId,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            const { sessionId } = response.data;
            const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error initiating payment:', error);
            alert('Error initiating payment.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    required
                />

                {/* College Name Dropdown */}
                <label htmlFor="collegeName">College Name:</label>
                <select
                    id="collegeName"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    required
                >
                    <option value="Chameli Devi Group of Institution">Chameli Devi Group of Institution</option>
                    <option value="Other">Other</option>
                </select>

                {/* Show text input if "Other" is selected */}
                {collegeName === 'Other' && (
                    <input
                        type="text"
                        value={customCollegeName}
                        onChange={(e) => setCustomCollegeName(e.target.value)}
                        placeholder="Enter your college name"
                        required
                    />
                )}

                <input
                    type="text"
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    placeholder="Enrollment Number"
                    required
                />

                <button type="submit" className="register-button">Register</button>
            </form>

            {eventId && isRegistered && (
                <div className="payment-container">
                    <button onClick={initiatePayment} className="payment-button">
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default Register;
