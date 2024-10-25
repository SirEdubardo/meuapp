import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        senha: '',
        foto: '',
        tipoPerfil: {
            tipo: '',
            nivelAcesso: '',
        },
        lstAddresses: [
            {
                street: '',
                number: '',
                complement: '',
                district: '',
                neighborhood: '',
                city: '',
                state: '',
                country: '',
                zipCode: '',
            },
        ],
        unidade: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddressChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAddresses = [...formData.lstAddresses];
        updatedAddresses[index][name] = value;
        setFormData({ ...formData, lstAddresses: updatedAddresses });
    };

    const addAddress = () => {
        setFormData((prev) => ({
            ...prev,
            lstAddresses: [
                ...prev.lstAddresses,
                {
                    street: '',
                    number: '',
                    complement: '',
                    district: '',
                    neighborhood: '',
                    city: '',
                    state: '',
                    country: '',
                    zipCode: '',
                },
            ],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://scholarspace-254954748843.southamerica-east1.run.app/api/User', formData);
            alert('Usuário cadastrado com sucesso!');
            console.log(response.data);
            setFormData({
                name: '',
                email: '',
                senha: '',
                foto: '',
                tipoPerfil: {
                    tipo: '',
                    nivelAcesso: '',
                },
                lstAddresses: [
                    {
                        street: '',
                        number: '',
                        complement: '',
                        district: '',
                        neighborhood: '',
                        city: '',
                        state: '',
                        country: '',
                        zipCode: '',
                    },
                ],
                unidade: '',
            });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Foto:</label>
                    <input
                        type="text"
                        name="foto"
                        value={formData.foto}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Tipo de Perfil:</label>
                    <input
                        type="text"
                        name="tipoPerfil.tipo"
                        value={formData.tipoPerfil.tipo}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="tipoPerfil.nivelAcesso"
                        value={formData.tipoPerfil.nivelAcesso}
                        onChange={handleChange}
                        required
                    />
                </div>
                <h4>Endereços</h4>
                {formData.lstAddresses.map((address, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={(e) => handleAddressChange(index, e)}
                            placeholder="Rua"
                            required
                        />
                        <input
                            type="text"
                            name="number"
                            value={address.number}
                            onChange={(e) => handleAddressChange(index, e)}
                            placeholder="Número"
                            required
                        />
                        <input
                            type="text"
                            name="complement"
                            value={address.complement}
                            onChange={(e) => handleAddressChange(index, e)}
                            placeholder="Complemento"
                        />
                        <input
                            type="text"
                            name="district"
                            value={address.district}
                            onChange={(e) => handleAddressChange(index, e)}
                            placeholder="Bairro"
                            required
                        />
                        <input
                            type="text"
                            name="neighborhood"
                            value={address.neighborhood}
                            onChange={(e) => handleAddressChange(index, e)}
                            placeholder="Cidade"
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={(e) => handleAddressChange(index, e)}
                            placeholder="Estado"
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            value={address.state}
                            onChange={(e) => handleAddressChange(index, e)}
                            placeholder="País"
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            value={address.country}
                            onChange={(e) => handleAddressChange(index, e)}
                            placeholder="País"
                            required
                        />
                        <input
                            type="text"
                            name="zipCode"
                            value={address.zipCode}
                            onChange={(e) => handleAddressChange(index, e)}
                            placeholder="CEP"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addAddress}>
                    Adicionar Endereço
                </button>
                <div>
                    <label>Unidade:</label>
                    <input
                        type="text"
                        name="unidade"
                        value={formData.unidade}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default Register;
