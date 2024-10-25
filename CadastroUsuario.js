import React, { useState } from "react";
import axios from "axios";

const CadastroUsuario = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    senha: "",
    foto: "",
    tipoPerfil: {
      tipo: "",
      nivelAcesso: ""
    },
    lstAddresses: [
      {
        street: "",
        number: "",
        complement: "",
        district: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
      }
    ],
    unidade: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("tipoPerfil.")) {
      const field = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        tipoPerfil: { ...prev.tipoPerfil, [field]: value }
      }));
    } else if (name.startsWith("address.")) {
      const index = parseInt(name.split(".")[1], 10);
      const field = name.split(".")[2];
      const newAddresses = [...user.lstAddresses];
      newAddresses[index] = { ...newAddresses[index], [field]: value };
      setUser({ ...user, lstAddresses: newAddresses });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://scholarspace-254954748843.southamerica-east1.run.app/api/User", user)
      .then(response => {
        console.log("Usuário cadastrado com sucesso:", response.data);
      })
      .catch(error => {
        console.error("Erro ao cadastrar usuário:", error.response ? error.response.data : error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nome" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />
      <input type="text" name="foto" placeholder="Foto" onChange={handleChange} />
      <input type="text" name="tipoPerfil.tipo" placeholder="Tipo de Perfil" onChange={handleChange} required />
      <input type="text" name="tipoPerfil.nivelAcesso" placeholder="Nível de Acesso" onChange={handleChange} required />
      
      <input type="text" name="address.0.street" placeholder="Rua" onChange={handleChange} required />
      <input type="text" name="address.0.number" placeholder="Número" onChange={handleChange} required />
      <input type="text" name="address.0.city" placeholder="Cidade" onChange={handleChange} required />
      <input type="text" name="unidade" placeholder="Unidade" onChange={handleChange} />

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastroUsuario;
