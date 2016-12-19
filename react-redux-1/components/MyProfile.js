import React from "react"
import Product from '../components/Product';
import Productlist from "./productlist"

const MyProfile = React.createClass({
	componentDidMount(){
        this.props.actions.initProducts();
		//this.props.
    },

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
                ) : null}
                
            </div>
        );
    }
})

export default MyProfile;
