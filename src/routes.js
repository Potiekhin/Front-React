import {Switch, Route} from 'react-router-dom'
import React from 'react'

import GlobalPage from "./pages/globalPage";
import UserPage from "./pages/userPage";
import AdminPage from "./pages/adminPage";
import ProductPage from "./component/productPage/productPage";

export default ()=>{
    return (
        <Switch>
            <Route path="/" component={GlobalPage} exact />
            <Route path="/user" component={UserPage}/>
            <Route path="/admin" component={AdminPage} />
            <Route path="/product" component={ProductPage} />
        </Switch>
    )
}
