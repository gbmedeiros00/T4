import React, { useState, ChangeEvent, FormEvent } from "react";

type Props = {
    cliente?: {
        nome: string;
        nomeSocial: string;
        cpf: string;
        rg: string;
        dataCadastro: string;
        email: string;
        telefone: string;
        genero: string;
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    };
    onSubmit: (cliente: {
        nome: string;
        nomeSocial: string;
        cpf: string;
        rg: string;
        dataCadastro: string;
        email: string;
        telefone: string;
        genero: string;
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    }) => void;
    onCancel: () => void;
};

const FormCadastroCliente: React.FC<Props> = ({ cliente, onSubmit, onCancel }) => {
    const [form, setForm] = useState({
        nome: cliente?.nome || "",
        nomeSocial: cliente?.nomeSocial || "",
        cpf: cliente?.cpf || "",
        rg: cliente?.rg || "",
        dataCadastro: cliente?.dataCadastro || "",
        email: cliente?.email || "",
        telefone: cliente?.telefone || "",
        genero: cliente?.genero || "",
        rua: cliente?.rua || "",
        numero: cliente?.numero || "",
        bairro: cliente?.bairro || "",
        cidade: cliente?.cidade || "",
        estado: cliente?.estado || "",
        cep: cliente?.cep || "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Nome Social</label>
                <input
                    type="text"
                    className="form-control"
                    name="nomeSocial"
                    value={form.nomeSocial}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">CPF</label>
                <input
                    type="text"
                    className="form-control"
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                    required
                    placeholder="000.000.000-00"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">RG</label>
                <input
                    type="text"
                    className="form-control"
                    name="rg"
                    value={form.rg}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Data de Cadastro</label>
                <input
                    type="date"
                    className="form-control"
                    name="dataCadastro"
                    value={form.dataCadastro}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Telefone</label>
                <input
                    type="text"
                    className="form-control"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    required
                    placeholder="(00) 00000-0000"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Gênero</label>
                <select
                    className="form-control"
                    name="genero"
                    value={form.genero}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Rua</label>
                <input
                    type="text"
                    className="form-control"
                    name="rua"
                    value={form.rua}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Número</label>
                <input
                    type="text"
                    className="form-control"
                    name="numero"
                    value={form.numero}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Bairro</label>
                <input
                    type="text"
                    className="form-control"
                    name="bairro"
                    value={form.bairro}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Cidade</label>
                <input
                    type="text"
                    className="form-control"
                    name="cidade"
                    value={form.cidade}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Estado</label>
                <input
                    type="text"
                    className="form-control"
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">CEP</label>
                <input
                    type="text"
                    className="form-control"
                    name="cep"
                    value={form.cep}
                    onChange={handleChange}
                    required
                    placeholder="00000-000"
                />
            </div>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                    Salvar
                </button>
            </div>
        </form>
    );
};

export default FormCadastroCliente;