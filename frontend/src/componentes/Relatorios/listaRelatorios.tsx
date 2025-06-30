import { useState, ChangeEvent } from "react";

type Cliente = {
    id: number;
    nome: string;
    racaPet?: string;
    tipoPet?: string;
    consumo: {
        valorTotal: number;
        quantidadeTotal: number;
        produtos: { nome: string; quantidade: number; valor: number; raca?: string; tipo?: string }[];
        servicos: { nome: string; quantidade: number; valor: number; raca?: string; tipo?: string }[];
    };
};

type ProdutoServico = {
    nome: string;
    quantidade: number;
    valor: number;
    raca?: string;
    tipo?: string;
};

type Props = {
    tema: string;
};

const RELATORIOS = [
    { key: "topValor", label: "Top 5 clientes por valor" },
    { key: "topQtd", label: "Top 10 clientes por quantidade" },
    { key: "produtosMais", label: "Produtos mais consumidos" },
    { key: "servicosMais", label: "Serviços mais consumidos" },
    { key: "produtosPorRaca", label: "Produtos por raça" },
    { key: "servicosPorRaca", label: "Serviços por raça" },
    { key: "produtosPorTipo", label: "Produtos por tipo" },
    { key: "servicosPorTipo", label: "Serviços por tipo" }
];

function ListaRelatorios({ tema }: Props) {
    const [clientes] = useState<Cliente[]>([
        {
            id: 1,
            nome: "Gabriel Calebe",
            racaPet: "Labrador",
            tipoPet: "Cachorro",
            consumo: {
                valorTotal: 500,
                quantidadeTotal: 8,
                produtos: [
                    { nome: "Ração Premium", quantidade: 3, valor: 300, raca: "Labrador", tipo: "Cachorro" },
                    { nome: "Shampoo Pet", quantidade: 2, valor: 100, raca: "Labrador", tipo: "Cachorro" }
                ],
                servicos: [
                    { nome: "Banho", quantidade: 2, valor: 50, raca: "Labrador", tipo: "Cachorro" },
                    { nome: "Tosa", quantidade: 1, valor: 50, raca: "Labrador", tipo: "Cachorro" }
                ]
            }
        },
        {
            id: 2,
            nome: "Cliente 2",
            racaPet: "Siamês",
            tipoPet: "Gato",
            consumo: {
                valorTotal: 350,
                quantidadeTotal: 6,
                produtos: [
                    { nome: "Ração Premium", quantidade: 2, valor: 200, raca: "Siamês", tipo: "Gato" }
                ],
                servicos: [
                    { nome: "Banho", quantidade: 2, valor: 50, raca: "Siamês", tipo: "Gato" },
                    { nome: "Tosa", quantidade: 2, valor: 100, raca: "Siamês", tipo: "Gato" }
                ]
            }
        }
    ]);
    const [relatorioSelecionado, setRelatorioSelecionado] = useState("topValor");

    const handleRelatorioChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRelatorioSelecionado(e.target.value);
    };

    function getTopClientesValor() {
        return [...clientes]
            .sort((a, b) => b.consumo.valorTotal - a.consumo.valorTotal)
            .slice(0, 5);
    }

    function getTopClientesQuantidade() {
        return [...clientes]
            .sort((a, b) => b.consumo.quantidadeTotal - a.consumo.quantidadeTotal)
            .slice(0, 10);
    }

    function getMaisConsumidos(tipo: "produtos" | "servicos") {
        const todos: ProdutoServico[] = [];
        clientes.forEach(c => {
            c.consumo[tipo].forEach(item => {
                const existente = todos.find(t => t.nome === item.nome);
                if (existente) {
                    existente.quantidade += item.quantidade;
                    existente.valor += item.valor;
                } else {
                    todos.push({ ...item });
                }
            });
        });
        return todos.sort((a, b) => b.quantidade - a.quantidade);
    }

    function getMaisConsumidosPor(tipo: "produtos" | "servicos", chave: "raca" | "tipo") {
        const todos: ProdutoServico[] = [];
        clientes.forEach(c => {
            c.consumo[tipo].forEach(item => {
                const key = item[chave] || "Não informado";
                const existente = todos.find(t => t.nome === item.nome && t[chave] === key);
                if (existente) {
                    existente.quantidade += item.quantidade;
                    existente.valor += item.valor;
                } else {
                    todos.push({ ...item, [chave]: key });
                }
            });
        });
        return todos.sort((a, b) => b.quantidade - a.quantidade);
    }

    function renderRelatorio() {
        if (relatorioSelecionado === "topValor") {
            const topValor = getTopClientesValor();
            return (
                <>
                    <h4 className="mb-3">Top 5 clientes que mais consumiram em valor</h4>
                    <ol>
                        {topValor.map(c => (
                            <li key={c.id}>
                                {c.nome} - R$ {c.consumo.valorTotal.toFixed(2)}
                            </li>
                        ))}
                    </ol>
                </>
            );
        }

        if (relatorioSelecionado === "topQtd") {
            const topQtd = getTopClientesQuantidade();
            return (
                <>
                    <h4 className="mb-3">Top 10 clientes que mais consumiram em quantidade</h4>
                    <ol>
                        {topQtd.map(c => (
                            <li key={c.id}>
                                {c.nome} - {c.consumo.quantidadeTotal} itens
                            </li>
                        ))}
                    </ol>
                </>
            );
        }

        if (relatorioSelecionado === "produtosMais") {
            const produtosMais = getMaisConsumidos("produtos");
            return (
                <>
                    <h4 className="mb-3">Produtos mais consumidos</h4>
                    <ul>
                        {produtosMais.map((p, i) => (
                            <li key={i}>
                                {p.nome} - {p.quantidade} unidades (R$ {p.valor.toFixed(2)})
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "servicosMais") {
            const servicosMais = getMaisConsumidos("servicos");
            return (
                <>
                    <h4 className="mb-3">Serviços mais consumidos</h4>
                    <ul>
                        {servicosMais.map((s, i) => (
                            <li key={i}>
                                {s.nome} - {s.quantidade} vezes (R$ {s.valor.toFixed(2)})
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "produtosPorRaca") {
            const produtosPorRaca = getMaisConsumidosPor("produtos", "raca");
            return (
                <>
                    <h4 className="mb-3">Produtos mais consumidos por raça</h4>
                    <ul>
                        {produtosPorRaca.map((p, i) => (
                            <li key={i}>
                                {p.nome} - Raça: {p.raca} - {p.quantidade} unidades
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "servicosPorRaca") {
            const servicosPorRaca = getMaisConsumidosPor("servicos", "raca");
            return (
                <>
                    <h4 className="mb-3">Serviços mais consumidos por raça</h4>
                    <ul>
                        {servicosPorRaca.map((s, i) => (
                            <li key={i}>
                                {s.nome} - Raça: {s.raca} - {s.quantidade} vezes
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "produtosPorTipo") {
            const produtosPorTipo = getMaisConsumidosPor("produtos", "tipo");
            return (
                <>
                    <h4 className="mb-3">Produtos mais consumidos por tipo</h4>
                    <ul>
                        {produtosPorTipo.map((p, i) => (
                            <li key={i}>
                                {p.nome} - Tipo: {p.tipo} - {p.quantidade} unidades
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "servicosPorTipo") {
            const servicosPorTipo = getMaisConsumidosPor("servicos", "tipo");
            return (
                <>
                    <h4 className="mb-3">Serviços mais consumidos por tipo</h4>
                    <ul>
                        {servicosPorTipo.map((s, i) => (
                            <li key={i}>
                                {s.nome} - Tipo: {s.tipo} - {s.quantidade} vezes
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        return null;
    }

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <h2 className="mb-4 text-center">Relatórios de Consumo</h2>
            <div className="mb-4" style={{ minWidth: 320 }}>
                <label className="form-label fw-bold">Escolha o relatório:</label>
                <select
                    className="form-select"
                    value={relatorioSelecionado}
                    onChange={handleRelatorioChange}
                >
                    {RELATORIOS.map(r => (
                        <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                </select>
            </div>
            <div className="w-100 d-flex flex-column align-items-center">
                <div style={{ minWidth: 320, maxWidth: 600 }}>
                    {renderRelatorio()}
                </div>
            </div>
        </div>
    );
}

export default ListaRelatorios;