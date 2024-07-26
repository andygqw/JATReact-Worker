import React, { useState } from 'react';
import axios from '../utils/api';
import { useHistory } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        
        e.preventDefault();
        try {

            const response = await axios.post('/login', { username, password });
            localStorage.setItem('token', response.data.token);
            history.push('/dashboard');
        } 
        catch (error) {

            console.error('Login failed:', error);
            alert('Login failed!');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;