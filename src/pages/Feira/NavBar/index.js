import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCarrinhoContext } from 'common/context/carrinho';
import { useHistory } from 'react-router-dom';


export default function NavBar() {
  const {quantidadeProd, setQuantidadeProd} = useCarrinhoContext()
  const history = useHistory()
  return (
    <Nav>
      <Logo />
      
      <IconButton
      onClick={() => history.push('/carrinho')}
      disabled={quantidadeProd === 0}
      >
        <Badge
          
          badgeContent={quantidadeProd}
          color="primary"
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}