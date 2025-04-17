// filepath: e:\TESTRHEO\chat-app\src\components\login\login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { supabase } from '../../supabaseClient';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                console.log('User signed in:', data);
                navigate('/chat'); // Navigate to Chat component
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '50px auto',
            padding: '30px',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="email" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: 'bold',
                        color: '#555'
                    }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            fontSize: '14px'
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="password" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: 'bold',
                        color: '#555'
                    }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            fontSize: '14px'
                        }}
                        required
                    />
                </div>
                <button type="submit" style={{
                    padding: '12px 25px',
                    cursor: 'pointer',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
                disabled={loading}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
};

export default Login;