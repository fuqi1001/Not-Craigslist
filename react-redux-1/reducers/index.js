import { combineReducers } from 'redux'
import items from './addItems'
import Detail from './itemDetail'
import products from './products'
import user from './user'
import myProducts from './myProducts'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// Add the reducer to your store on the `routing` key

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  products,
  items,Detail,
  user,
  myProducts,
  routing: routerReducer
});

export default rootReducer
