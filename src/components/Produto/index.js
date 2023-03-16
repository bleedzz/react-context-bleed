import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext } from 'common/context/carrinho';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {

  const {addProduto, carrinho, removerProduto} = useCarrinhoContext()
  const prodCarrinho = carrinho.find(itemDoCarrinho=> itemDoCarrinho.id === id)
 
  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            disabled={!prodCarrinho}
            color="secondary"
            onClick={()=> removerProduto(id)}
          >
            <RemoveIcon />
          </IconButton>
          {prodCarrinho?.quantidade || "0"}
          <IconButton color="primary" onClick={()=> addProduto({nome, foto, id, valor})}>
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)