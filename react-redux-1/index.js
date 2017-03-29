import React from 'react'
import { Router, Route, browserHistory,IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// get components 
import AddItems from './components/addItems'
import ItemGrid from './components/itemGrid'
import ItemDetail from './components/itemDetail'
import ProductList from './components/productlist';
import Single from './components/single';
import MySingle from './components/mySingle';

//get container
import App from './containers/App'
import LoginContainer from "./containers/user/LoginContainer"
import RegisterContainer from "./containers/user/RegisterContainer"
import MyProfileContainer from "./containers/user/MyProfileContainer"
import configureStore from './store/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)


//get data from db
import itemsData from './testData'
//console.log(JSON.stringify(itemsData))

//

import * as userActions from "./actions/users"

let createhandlers = function(dispatch) {
    return  dispatch(userActions.checkLogin());
}



const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated } } = store.getState()
    
    console.log(store);
    console.log("&^%@%@%@" + authenticated)
    if (!authenticated) {
        
        createhandlers(store.dispatch).then(status => {
            console.log(nextState.location.pathname)
            if (!status) {
                replace({
                    pathname: "/login",
                    state: { nextPathname: nextState.location.pathname }
                })
                console.log(nextState.location.pathname)
                callback()
            }else {
                callback()
            }
        })	
        
    } 
    callback()
    
    
    
}	
render((
   <Provider store={store}> 
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute  component={ProductList} />
                <Route path="/app" component={AddItems} onEnter={requireAuth}/>
                <Route path="/item" component={ItemDetail}/>
                <Route path="/viewItem/:itemId" component={Single}></Route>
				<Route path="login" component={LoginContainer} />
				<Route path="register" component={RegisterContainer} />
				<Route path="myprofile" component={MyProfileContainer} onEnter={requireAuth}/>
            </Route>
        </Router>
   </Provider>
), document.getElementById('root2'))