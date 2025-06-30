import React, { useState, ChangeEvent, FormEvent } from "react";

type Props = {
    produto?: {
        nome: string;
        preco: number;
        descricao: string;
        categoria: string;
    };
    onSubmit: (produto: { nome: string; preco: number; descricao: string; categoria: string }) => void;
    onCancel: () => void;
};

const FormCadastroProduto: React.FC<Props> = ({ produto, onSubmit, onCancel }) => {
    const [nome, setNome] = useState(produto?.nome || "");
    const [preco, setPreco] = useState(produto?.preco?.toString() || "");
    const [descricao, setDescricao] = useState(produto?.descricao || "");
    const [categoria, setCategoria] = useState(produto?.categoria || "");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "nome") setNome(value);
        else if (name === "preco") setPreco(value);
        else if (name === "descricao") setDescricao(value);
        else if (name === "categoria") setCategoria(value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            nome,
            preco: parseFloat(preco),
            descricao,
            categoria,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={nome}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Preço</label>
                <input
                    type="number"
                    className="form-control"
                    name="preco"
                    value={preco}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea
                    className="form-control"
                    name="descricao"
                    value={descricao}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Categoria</label>
                <input
                    type="text"
                    className="form-control"
                    name="categoria"
                    value={categoria}
                    onChange={handleChange}
                    required
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

export default FormCadastroProduto;