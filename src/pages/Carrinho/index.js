import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from 'common/context/carrinho';
import { usePagamentoContext } from 'common/context/pagamento';
import { UserProvider, UsuarioContext } from 'common/context/Usuario';
import Produto from 'components/Produto';
import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';


function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {carrinho, valorTotalCarrinho, EfetuarComprar} = useCarrinhoContext()
  const {formaPagamento, tiposPagamento, mudarPagamento} = usePagamentoContext();
  const history = useHistory()
  const {saldo = 0} = useContext(UsuarioContext)
  const saldoTotal = useMemo(()=> saldo - valorTotalCarrinho, [saldo, valorTotalCarrinho])

  return (
    <Container>
      <Voltar 
      onClick={()=>history.goBack()}
      />
      <h2>
        Carrinho
      </h2>
      {carrinho.map(produto=>
        <Produto
          {...produto}
          key={produto.id}
        />
        )}
      <PagamentoContainer>
        
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={formaPagamento.id}
          onChange={(event)=>mudarPagamento(event.target.value)}
        >
          {tiposPagamento.map(pagamento=>(
            <MenuItem value={pagamento.id} key={pagamento.id}>
            {pagamento.nome}
            </MenuItem>
          ))}

        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total a Pagar: </h2>
            <span>R$ {valorTotalCarrinho.toFixed(2)} </span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(saldo).toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {saldoTotal.toFixed(2)} </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          EfetuarComprar()
          setOpenSnackbar(true);
        }}
        disabled={saldo < valorTotalCarrinho || carrinho.length === 0}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;