import { useState } from "react";
import FormCadastroProduto from "./formCadastroProduto";

type Produto = {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    categoria: string;
};

type Props = {
    tema: string;
};

function ListaProdutos({ tema }: Props) {
    const [produtos, setProdutos] = useState<Produto[]>([
        {
            id: 1,
            nome: "Ração Premium",
            preco: 120.0,
            descricao: "Ração para cães adultos de alta qualidade.",
            categoria: "Alimentação"
        },
        {
            id: 2,
            nome: "Shampoo Pet",
            preco: 35.5,
            descricao: "Shampoo suave para todos os tipos de pelagem.",
            categoria: "Higiene"
        }
    ]);
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

    const abrirModalNovo = () => {
        setModalAberto(true);
        setProdutoEditando(null);
    };

    const abrirModalEditar = (produto: Produto) => {
        setModalAberto(true);
        setProdutoEditando(produto);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setProdutoEditando(null);
    };

    const excluirProduto = (id: number) => {
        setProdutos(prev => prev.filter(p => p.id !== id));
    };

    const handleSubmitProduto = (dados: { nome: string; preco: number; descricao: string; categoria: string }) => {
        if (produtoEditando) {
            setProdutos(prev =>
                prev.map(p =>
                    p.id === produtoEditando.id
                        ? { ...p, ...dados }
                        : p
                )
            );
        } else {
            const novoProduto: Produto = {
                id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
                nome: dados.nome,
                preco: dados.preco,
                descricao: dados.descricao,
                categoria: dados.categoria,
            };
            setProdutos(prev => [...prev, novoProduto]);
        }
        setModalAberto(false);
        setProdutoEditando(null);
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Produtos</h2>
                <button className="btn btn-primary" onClick={abrirModalNovo}>
                    Novo Produto
                </button>
            </div>
            <ul className="list-group">
                {produtos.map(produto => (
                    <li
                        key={produto.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={produto.id === 4 ? { backgroundColor: tema } : {}}
                    >
                        <span>
                            <strong>{produto.nome}</strong> - R$ {produto.preco.toFixed(2)} - {produto.categoria}
                            <br />
                            <small>{produto.descricao}</small>
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => abrirModalEditar(produto)}
                            >
                                Atualizar
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => excluirProduto(produto.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {modalAberto && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {produtoEditando ? "Atualizar Produto" : "Novo Produto"}
                                </h5>
                                <button type="button" className="btn-close" onClick={fecharModal}></button>
                            </div>
                            <div className="modal-body">
                                <FormCadastroProduto
                                    produto={produtoEditando ? {
                                        nome: produtoEditando.nome,
                                        preco: produtoEditando.preco,
                                        descricao: produtoEditando.descricao,
                                        categoria: produtoEditando.categoria,
                                    } : undefined}
                                    onSubmit={handleSubmitProduto}
                                    onCancel={fecharModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListaProdutos;