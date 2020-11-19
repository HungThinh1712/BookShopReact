import React from 'react';
import HomePage from './components/pages/HomePage'
import Login from './components/pages/LoginPage'
import { Route, Switch , BrowserRouter as Router} from "react-router-dom";
import Regiser from './components/pages/RegisterPage'
import ScrollToTop from 'react-router-scroll-top'
import SearchPage from './components/pages/SearchPage'
import BookDetailPage from './components/pages/BookDetailPage'
import ShoppingCartPage from './components/pages/ShoppingCartPage'
import './resources/styles.css';
import BooksPageAdmin  from './components/pages/Admin/Book'
import AdminPage  from './components/pages/Admin/index'
import AddressPage from './components/pages/AddressPage'
import UserPage from './components/pages/UserPage'
import PaymentPage from './components/pages/PaymentPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
    <Router>
     <ToastContainer />
      <Switch>
            <ScrollToTop>
            <Route exact path="/" component={HomePage} />
            <Route path="/user_page" component={UserPage} />
            <Route path="/admin_page" component={AdminPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route  path="/register" component={Regiser} />
            <Route path="/search/:searchString" component={SearchPage}/>
            <Route path="/details/:book_id" component={BookDetailPage}></Route>
            <Route path="/cart" component={ShoppingCartPage}></Route>
            <Route path="/address_shipping" component={AddressPage}></Route>
            </ScrollToTop>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
