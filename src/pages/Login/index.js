import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core';

import { useHistory } from 'react-router-dom'
import { UsuarioContext } from 'common/context/Usuario';
import { useContext } from 'react'


function Login() {

  const history = useHistory()
  const { nome, setNome, saldo, setSaldo } = useContext(UsuarioContext)
  const permissão = (nome.length < 3 || saldo < 3 ? true : false)

  return (
    <Container>
      <Titulo>
        Insira o seu nome
      </Titulo>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
          value={saldo}
          onChange={(event) => setSaldo(event.target.value)}
          type="number"
          startAdornment={
            <InputAdornment position="start">
              R$
            </InputAdornment>
          }
        />
      </InputContainer>
      <Button
        disabled={permissão == true}
        onClick={() => history.push('/feira')}
        variant="contained"
        color="primary"
      >
        Avançar
      </Button>
    </Container>
  )
};

export default Login;