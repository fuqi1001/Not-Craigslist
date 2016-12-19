import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import addActions from '../actions/addItems';
import main from '../components/main';
import * as userActions from "../actions/users"

/*class main extends React.Component {
  render() {
      console.log(this.props);
    return (
      <div>
        <h1>
          Main Page
        </h1>
                {React.cloneElement(this.props.children,this.props)}
      </div>
    );
  }
};*/

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


/*import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Product from '../components/Product';
import actions from '../actions/listActions';


import { Link } from 'react-router';
class App extends React.Component {
    componentDidMount(){
        this.props.actions.initProducts();
    }

    render(){
        let { state, actions} = this.props;

        console.log(state);
        console.log(state.products);

        return (

            <div className = "productList">
                { state.products.length > 0 ?
                    state.products.map((product) =>
                    <Product
                        key = {product._id}
                    state ={product}
                        />
                ) : null
            }
    <Link to={'/app'}>items</Link>

            <div>here</div>
        </div>
    );
    }
}

function mapStateToProps(state) {
    return {
        state: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);*/
