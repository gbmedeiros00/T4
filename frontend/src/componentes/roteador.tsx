import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./Clientes/listaClientes";

function Roteador() {
    const [tela, setTela] = useState('Clientes');

    function selecionarView(novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        evento.preventDefault();
        setTela(novaTela);
    }

    const barraNavegacao = (
        <BarraNavegacao
            seletorView={selecionarView}
            tema="#e3f2fd"
            botoes={['Clientes']}
        />
    );

    if (tela === 'Clientes') {
        return (
            <>
                {barraNavegacao}
                <ListaCliente tema="#e3f2fd" />
            </>
        );
    }
     else {
        return barraNavegacao;
    }
}

export default Roteador;