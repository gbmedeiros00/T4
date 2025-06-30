import { useState, useEffect } from "react";
import FormCadastroCliente from "./formCadastroCliente";
import FormListarInformacoes from "./formListarInformacoes";

type Cliente = {
    id: number;
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
    tema: string;
};

const API_URL = "http://localhost:32831/cliente";

function ListaCliente({ tema }: Props) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
    const [modalInfoAberto, setModalInfoAberto] = useState(false);
    const [clienteInfo, setClienteInfo] = useState<Cliente | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/clientes`)
            .then(res => res.json())
            .then(data => {
                // Mapeia os dados recebidos para o formato esperado pelo frontend
                const clientesMapeados = data.map((c: any) => ({
                    id: c.id,
                    nome: c.nome || "",
                    nomeSocial: c.nomeSocial || "",
                    cpf: c.cpf || "",
                    rg: c.rg || "",
                    dataCadastro: c.dataCadastro || "",
                    email: c.email || "",
                    telefone: c.telefones && c.telefones.length > 0
                        ? `(${c.telefones[0].ddd}) ${c.telefones[0].numero}`
                        : "",
                    genero: c.genero || "",
                    rua: c.endereco?.rua || "",
                    numero: c.endereco?.numero || "",
                    bairro: c.endereco?.bairro || "",
                    cidade: c.endereco?.cidade || "",
                    estado: c.endereco?.estado || "",
                    cep: c.endereco?.codigoPostal || "",
                }));
                setClientes(clientesMapeados);
            })
            .catch(() => setClientes([]));
    }, []);

    const abrirModalNovo = () => {
        setModalAberto(true);
        setClienteEditando(null);
    };

    const abrirModalEditar = (cliente: Cliente) => {
        setModalAberto(true);
        setClienteEditando(cliente);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setClienteEditando(null);
    };

    const abrirModalInfo = (cliente: Cliente) => {
        setClienteInfo(cliente);
        setModalInfoAberto(true);
    };

    const fecharModalInfo = () => {
        setModalInfoAberto(false);
        setClienteInfo(null);
    };

    const excluirCliente = (id: number) => {
        fetch(`${API_URL}/excluir`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        }).then(() => {
            setClientes(prev => prev.filter(c => c.id !== id));
        });
    };

    const handleSubmitCliente = (dados: Omit<Cliente, "id">) => {
        if (clienteEditando) {
            fetch(`${API_URL}/atualizar`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...clienteEditando, ...dados })
            }).then(() => {
                setClientes(prev =>
                    prev.map(c =>
                        c.id === clienteEditando.id
                            ? { ...c, ...dados }
                            : c
                    )
                );
                fecharModal();
            });
        } else {
            fetch(`${API_URL}/cadastrar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })
                .then(() => fetch(`${API_URL}/clientes`))
                .then(res => res.json())
                .then(data => {
                    // Repete o mapeamento após cadastrar
                    const clientesMapeados = data.map((c: any) => ({
                        id: c.id,
                        nome: c.nome || "",
                        nomeSocial: c.nomeSocial || "",
                        cpf: c.cpf || "",
                        rg: c.rg || "",
                        dataCadastro: c.dataCadastro || "",
                        email: c.email || "",
                        telefone: c.telefones && c.telefones.length > 0
                            ? `(${c.telefones[0].ddd}) ${c.telefones[0].numero}`
                            : "",
                        genero: c.genero || "",
                        rua: c.endereco?.rua || "",
                        numero: c.endereco?.numero || "",
                        bairro: c.endereco?.bairro || "",
                        cidade: c.endereco?.cidade || "",
                        estado: c.endereco?.estado || "",
                        cep: c.endereco?.codigoPostal || "",
                    }));
                    setClientes(clientesMapeados);
                    fecharModal();
                });
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Clientes</h2>
                <button className="btn btn-primary" onClick={abrirModalNovo}>
                    Novo Cliente
                </button>
            </div>
            <ul className="list-group">
                {clientes.map(cliente => (
                    <li
                        key={cliente.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={cliente.id === 4 ? { backgroundColor: tema } : {}}
                    >
                        <span>
                            <strong>{cliente.nome}</strong>
                            {cliente.nomeSocial && <> ({cliente.nomeSocial})</>}
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-info me-2"
                                onClick={() => abrirModalInfo(cliente)}
                            >
                                Ver Informações
                            </button>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => abrirModalEditar(cliente)}
                            >
                                Atualizar
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => excluirCliente(cliente.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {modalAberto && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            zIndex: 1040
                        }}
                    />
                    <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {clienteEditando ? "Atualizar Cliente" : "Novo Cliente"}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={fecharModal}></button>
                                </div>
                                <div className="modal-body">
                                    <FormCadastroCliente
                                        cliente={
                                            clienteEditando
                                                ? {
                                                    nome: clienteEditando.nome || "",
                                                    nomeSocial: clienteEditando.nomeSocial || "",
                                                    cpf: clienteEditando.cpf || "",
                                                    rg: clienteEditando.rg || "",
                                                    dataCadastro: clienteEditando.dataCadastro || "",
                                                    email: clienteEditando.email || "",
                                                    telefone: clienteEditando.telefone || "",
                                                    genero: clienteEditando.genero || "",
                                                    rua: clienteEditando.rua || "",
                                                    numero: clienteEditando.numero || "",
                                                    bairro: clienteEditando.bairro || "",
                                                    cidade: clienteEditando.cidade || "",
                                                    estado: clienteEditando.estado || "",
                                                    cep: clienteEditando.cep || "",
                                                }
                                                : undefined
                                        }
                                        onSubmit={handleSubmitCliente}
                                        onCancel={fecharModal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {modalInfoAberto && clienteInfo && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            zIndex: 1040
                        }}
                    />
                    <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Informações do Cliente
                                    </h5>
                                    <button type="button" className="btn-close" onClick={fecharModalInfo}></button>
                                </div>
                                <div className="modal-body">
                                    <FormListarInformacoes
                                        cliente={clienteInfo}
                                        onClose={fecharModalInfo}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ListaCliente;