import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import addActions from '../actions/addItems';
import main from '../components/main';
import * as userActions from "../actions/users"


function selectState(state) {
    //console.log(state)
    return {
        items: state.items,
        Detail: state.Detail,
        products: state.products,
        user: state.user
    }
}

function buildActionDispatcher(dispatch) {
  return {
        addActions: bindActionCreators(addActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}



const App =  connect( selectState, buildActionDispatcher)(main);
export default App;
