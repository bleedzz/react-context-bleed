import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProvider } from "common/context/Usuario";
import Login from "pages/Login";
import Feira from "pages/Feira";
import Carrinho from "pages/Carrinho";
import { CarrinhoProvider } from "common/context/carrinho";
import { PagamentoProvider } from "common/context/pagamento";

export default function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <UserProvider>
                    <Route exact path={"/"}>
                        <Login />
                    </Route>
                    <CarrinhoProvider>
                        <PagamentoProvider>
                        <Route path={"/feira"}>
                            <Feira />
                        </Route>
                            <Route path={"/carrinho"}>
                                <Carrinho />
                            </Route>
                        </PagamentoProvider>
                    </CarrinhoProvider>
                </UserProvider>
            </Switch>
        </BrowserRouter>
    )
}
