import React from 'react';
import HomePage from './components/pages/HomePage'
import { Route, Switch , BrowserRouter as Router} from "react-router-dom";
import Regiser from './components/pages/RegisterPage'
import ScrollToTop from 'react-router-scroll-top'
import SearchPage from './components/pages/SearchPage'
import BookDetailPage from './components/pages/BookDetailPage'
import ShoppingCartPage from './components/pages/ShoppingCartPage'
import './resources/styles.css';
import './resources/adminStyle.css';
import AdminPage  from './components/pages/Admin/index'
import AddressPage from './components/pages/AddressPage'
import UserPage from './components/pages/UserPage'
import PaymentPage from './components/pages/PaymentPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackDrop from './components/common/BackDrop';
import OrderSuccessPage from './components/pages/OrderSuccessPage'
import ConfirmCodePage from './components/pages/ConfirmCodePage'
import OrderManageMentPage from './components/pages/OrderManageMentPage';
import AddBooksAdmin from './components/pages/Admin/addBook'
import LstBookAdmin from './components/pages/Admin/lstBook'
import OrderDetailPage from './components/pages/OrderDetailPage'
import UpdateAddressPage from './components/pages/UpdateAddressPage';
import OrderManagementPageAdmin from './components/pages/Admin/OrderManagementPageAdmin'


function App() {
  return (
    <div className="App"  >
    <Router>
     <ToastContainer />
     <BackDrop/>
      <Switch>
            <ScrollToTop>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/admin" component={LstBookAdmin} />
            <Route path="/order_history" component={OrderManageMentPage} />
            <Route path="/update_address_page" component={UpdateAddressPage} />
            <Route path="/admin/add_book_page" component={AddBooksAdmin} />
            <Route path="/admin/ordermanagement_page" component={OrderManagementPageAdmin} />
            <Route path="/user_page" component={UserPage} />
            <Route path="/order_details" component={OrderDetailPage} />
            <Route path="/confirm_code_page" component={ConfirmCodePage} />
            <Route path="/order_success_page" component={OrderSuccessPage} />
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
