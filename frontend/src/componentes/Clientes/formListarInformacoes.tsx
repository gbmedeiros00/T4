import React from "react";

type Cliente = {
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

type Props = {
    cliente: Cliente;
    onClose: () => void;
};

const FormListarInformacoes: React.FC<Props> = ({ cliente, onClose }) => {
    return (
        <div>
            <div className="mb-3">
                <label className="form-label fw-bold">Nome:</label>
                <div>{cliente.nome}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Nome Social:</label>
                <div>{cliente.nomeSocial}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">CPF:</label>
                <div>{cliente.cpf}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">RG:</label>
                <div>{cliente.rg}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Data de Cadastro:</label>
                <div>{cliente.dataCadastro}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Email:</label>
                <div>{cliente.email}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Telefone:</label>
                <div>{cliente.telefone}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Gênero:</label>
                <div>{cliente.genero}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Rua:</label>
                <div>{cliente.rua}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Número:</label>
                <div>{cliente.numero}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Bairro:</label>
                <div>{cliente.bairro}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Cidade:</label>
                <div>{cliente.cidade}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Estado:</label>
                <div>{cliente.estado}</div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">CEP:</label>
                <div>{cliente.cep}</div>
            </div>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default FormListarInformacoes;