import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//Pages
import { HomePage } from "./components/HomePage.jsx";
import { MarketPage } from "./components/MarketPage.jsx";
import { UsersPage } from "./components/UsersPage.jsx";
import { NoMatchPage } from "./components/NoMatchPage.jsx";
import { LoginPage } from "./components/LoginPage.jsx";
import { RegisterPage } from "./components/RegisterPage.jsx";
import { ProfilePage } from "./components/ProfilePage.jsx";
import { PendingItemsPage } from "./components/PendingItemsPage.jsx";
import { ConfirmationPage } from "./components/ConfirmationPage.jsx";
import { PostItemPage } from "./components/PostItemPage.jsx";
import { LogoutPage } from "./components/LogoutPage.jsx";

//Other components
import { Footer } from "./components/Footer.jsx";
import { NavigationBar } from "./components/NavigationBar.jsx";
import { Layout } from "./components/Layout.jsx";

export const App = () => {
  return (
    <>
      <Router>
        <NavigationBar />
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/market" component={MarketPage} />
            <Route path="/market/:id" component={ConfirmationPage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/pending-items" component={PendingItemsPage} />
            <Route path="/post-item" component={PostItemPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route component={NoMatchPage} />
          </Switch>
        </Layout>
      </Router>
      <Footer />
    </>
  );
};
