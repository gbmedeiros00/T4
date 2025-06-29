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
    };
    onSubmit: (cliente: { nome: string; nomeSocial: string; cpf: string; rg: string; dataCadastro: string; email: string; telefone: string }) => void;
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
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                    maxLength={14}
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
                    maxLength={12}
                    placeholder="00.000.000-0"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Data do Cadastro</label>
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
                    placeholder="exemplo@email.com"
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
                    placeholder="(99) 99999-9999"
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