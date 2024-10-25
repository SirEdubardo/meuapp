import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://scholarspace-254954748843.southamerica-east1.run.app/api/Login/GerarTokenJWT', {
        email,
        senha
      });
      console.log('Login bem-sucedido:', response.data);
      // Armazenar token ou fazer redirecionamento
    } catch (error) {
      console.error('Erro no login:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
