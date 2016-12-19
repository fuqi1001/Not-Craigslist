import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Product from '../components/Product';
import actions from '../actions/listActions';


import { Link } from 'react-router';


class productlist extends React.Component {
    componentDidMount(){
        this.props.actions.initProducts();
    }
    handleNewComment(comment) {
        /* eslint no-console:0 */
        console.log(comment);
    }

    render(){
        let { state, actions} = this.props;

        //console.log(state);
        //console.log(state.products);

        return (
            <div className = "productList">
                { state.products.length > 0 ?
                    state.products.map((product) =>
                        <Product
                            key = {product._id}
                            state ={product}
                        />
                ) : null}
                
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

export default connect(mapStateToProps, mapDispatchToProps)(productlist);
