import React from 'react';
import actions from "../actions/myProfileAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DisqusThread from './Disqus/main';

class mySingle extends React.Component {

    componentDidMount(){
        this.props.actions.initProducts();
    }
    handleNewComment(comment) {
        /* eslint no-console:0 */
        console.log(comment);
    }

    render() {
             const productId = this.props.params.itemId;
             console.log("---single---")
             console.log(productId);
             console.log(this.props);
             //console.log(this.props.products);
             let curent;

             for(let i = 0 ; i < this.props.products.products.length; i++){

                 if(this.props.products.products[i]._id == productId) {

                     curent = this.props.products.products[i];
                 }
             }

            let { products, actions} = this.props;
            //console.log(products);

        return (
            <div className="single-product" >
                {
                    curent ?
                    (
                        <div key = {curent._id} className="grid-single">
                            <div>{curent.title}</div>
                            <div>{curent.price}</div>
                            <div>{curent.content}</div>
                            {
                                curent.images.length > 0 ?
                                curent.images.map(function (image, i) {
                                return (

                                    <li key = {i}><img className="single-photo" src={image} /></li>
                                );}) 
                                : null
                            }
                            <div className = "comment">
                                <DisqusThread
                                    shortname="CS554"
                                    identifier={curent._id}
                                    title={curent.title}
                                    onNewComment={this.handleNewComment}
                                />
                            </div>
                        </div>
                    ) : null
                }

            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        state: state.myProducts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(mySingle);