import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Product from './Product'
import Checkout from './Checkout'


const MainRouter = () => {

    return (
        <Switch>
            <Route exact path="/" component={Product} />
            <Route exact path="/checkout/:id" component={Checkout} />
        </Switch>
    )
}


export default MainRouter;