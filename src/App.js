import React from "react";
import HomePage from "./components/pages/HomePage";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Regiser from "./components/pages/RegisterPage";
import ScrollToTop from "react-router-scroll-top";
import SearchPage from "./components/pages/SearchPage";
import BookDetailPage from "./components/pages/BookDetailPage";
import ShoppingCartPage from "./components/pages/ShoppingCartPage";
import "./resources/styles.css";
import "./resources/adminStyle.css";
import AdminPage from "./components/pages/Admin/index";
import AddressPage from "./components/pages/AddressPage";
import UserPage from "./components/pages/UserPage";
import PaymentPage from "./components/pages/PaymentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'antd/dist/antd.css';
import BackDrop from "./components/common/BackDrop";
import OrderSuccessPage from "./components/pages/OrderSuccessPage";
import ConfirmCodePage from "./components/pages/ConfirmCodePage";
import AddBooksAdmin from "./components/pages/Admin/addBook";
import AddPromotion from "./components/pages/Admin/addPromote";
import LstBookAdmin from "./components/pages/Admin/lstBook";
import OrderDetailPage from "./components/pages/OrderDetailPage";
import UpdateAddressPage from "./components/pages/UpdateAddressPage";
import ConfirmMomoPage from "./components/pages/ConfirmMomoPage";
import ForgetPasswordPage from "./components/pages/ForgetPasswordPage";
import PageNotFound from "./components/pages/PageNotFound";
import DetailBookAdmin from "./components/pages/Admin/detailBook";
import UpdateBookAdmin from "./components/pages/Admin/updateBook";
import CustomerAdmin from "./components/pages/Admin/CustomerManageAdmin";
import OrderManageMentPage from "./components/pages/OrderManageMentPage";
import CommentManageMentPage from "./components/pages/CommentManageMentPage";
import OrderManagementPageAdmin from "./components/pages/Admin/OrderManagementPageAdmin";
import UserManagementPageAdmin from "./components/pages/Admin/UserManageAdmin";
import AuthorManagementPageAdmin from "./components/pages/Admin/AuthorManageAdmin";
import TypeManagementPageAdmin from "./components/pages/Admin/TypeManageAdmin";
import ResetPassword from "./components/pages/ResetPassword"
import ReportPage from "./components/pages/Admin/ReportPage";
import PublishingHouseManagementPageAdmin from "./components/pages/Admin/PublishingHouseManageAdmin";
import AdminRoute from "./privaterouter/adminRoute";
import UserRoute from "./privaterouter/userRoute";
import { useTranslation } from "react-i18next";


function App() {
  const { i18n } = useTranslation();
  i18n.changeLanguage('vi');
  return (
    <div style={{backgroundColor:"#EDECE7"}} className="App">
      <Router>
        <ToastContainer />
        <BackDrop />
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <AdminRoute exact path="/admin/books" component={LstBookAdmin} />
            <UserRoute path="/order_history" component={OrderManageMentPage} />
            <UserRoute
              path="/comment_history"
              component={CommentManageMentPage}
            />
            <UserRoute
              path="/update_address_page"
              component={UpdateAddressPage}
            />
            <AdminRoute path="/admin/add_book_page" component={AddBooksAdmin} />
            <AdminRoute path="/admin/add_promotion" component={AddPromotion} />
            <AdminRoute path="/admin/details/:id" component={DetailBookAdmin} />
            <AdminRoute path="/admin/update_book" component={UpdateBookAdmin} />
            <AdminRoute
              path="/admin/ordermanagement_page"
              component={OrderManagementPageAdmin}
            />
            <AdminRoute
              path="/admin/usermanagement_page"
              component={UserManagementPageAdmin}
            />
            <AdminRoute
              path="/admin/authormanagement_page"
              component={AuthorManagementPageAdmin}
            />
            <AdminRoute
              path="/admin/typemanagement_page"
              component={TypeManagementPageAdmin}
            />
            <AdminRoute
              path="/admin/pulishinghousemanagement_page"
              component={PublishingHouseManagementPageAdmin}
            />
            <AdminRoute path="/admin/customer_page" component={CustomerAdmin} />
            <AdminRoute path="/admin/report_page" component={ReportPage} />
            <Route path="/user_page" component={UserPage} />
            <UserRoute path="/order_details/:id" component={OrderDetailPage} />
            <Route path="/confirm_code_page" component={ConfirmCodePage} />
            <UserRoute
              path="/order_success_page"
              component={OrderSuccessPage}
            />
            <Route path="/admin" component={AdminPage} />
            <UserRoute path="/payment" component={PaymentPage} />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/register" component={Regiser} />
            <Route path="/search/:searchString" component={SearchPage} />
            <Route path="/details/:book_id" component={BookDetailPage} />
            <Route path="/cart" component={ShoppingCartPage}></Route>
            <UserRoute path="/address_shipping" component={AddressPage} />
            <UserRoute path="/confirm_momopay" component={ConfirmMomoPage} />
            <Route
              path="/forget_password"
              component={ForgetPasswordPage}
            ></Route>
            <Route component={PageNotFound}></Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
