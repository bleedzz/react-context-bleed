import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./pagamento";
import { UsuarioContext } from "./Usuario";

export const CarrinhoContext = createContext()
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([])
    const [quantidadeProd, setQuantidadeProd]= useState(0)
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0)
    return (
        <CarrinhoContext.Provider 
          value={{
            carrinho,
            setCarrinho,
            quantidadeProd,
            setQuantidadeProd,
            valorTotalCarrinho,
            setValorTotalCarrinho
            }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = ()=> {
    const {
      carrinho, 
      setCarrinho,
      quantidadeProd,
      setQuantidadeProd,
      valorTotalCarrinho,
      setValorTotalCarrinho
          } = useContext(CarrinhoContext)

      const {
        formaPagamento 
      } = usePagamentoContext()

      const { setSaldo } = useContext(UsuarioContext)





//Funções de Add ou Remover produtos do carrinho--------------
    function mudarQuantidade(id, quantidade) {
      return (carrinho.map(itemDoCarrinho=> {
        if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade
        return itemDoCarrinho
      }))
    }
  

    function addProduto(novoProduto) {
        const temProd = carrinho.some(itemDoCarrinho => itemDoCarrinho.id == novoProduto.id)
        if (!temProd) {
          novoProduto.quantidade = 1;
          return setCarrinho(carrinhoAnterior => 
          [...carrinhoAnterior, novoProduto])
        }
        setCarrinho(mudarQuantidade(novoProduto.id, 1))      
      }

      function removerProduto(id) {
        const produto = carrinho.find((itemDoCarrinho)=> itemDoCarrinho.id === id)
        const unico = produto.quantidade === 1
        if (unico) {
          return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemDoCarrinho=> itemDoCarrinho.id !== id))
        }
        setCarrinho(mudarQuantidade(id, -1))
      }


// Função para comprar produtos

      function EfetuarComprar () {
        setCarrinho([]);
        setSaldo(saldoAtual=> saldoAtual - valorTotalCarrinho)

      }





// Use effect para contar quantidade de produtos no carrinho ---------
      useEffect(()=> {
        const {novaQuantidade, novoTotal} = carrinho.reduce((contador, produto)=> 
        ({
          novaQuantidade:contador.novaQuantidade + produto.quantidade,
          novoTotal: contador.novoTotal + produto.valor * produto.quantidade
        }), {
          novaQuantidade:0,
          novoTotal:0
        })
        setQuantidadeProd(novaQuantidade)
        setValorTotalCarrinho(novoTotal * formaPagamento.juros)
      }, [carrinho, setQuantidadeProd, setValorTotalCarrinho, formaPagamento])


      //Retorno De Hooks
    return {
        carrinho,
        setCarrinho,
        addProduto,
        removerProduto,
        quantidadeProd,
        setQuantidadeProd,
        valorTotalCarrinho,
        EfetuarComprar
    }
}