/**
 * Created by qifu on 16/12/16.
 */
import React from 'react';
import {Link} from 'react-router'

class Product extends React.Component {

    render() {

        let { state, actions } = this.props;
        //console.log(state);
        
        return (
            <div className="product" >
                {
                    
                        state.images.length > 0 ?
                            (<img className="grid-photo" src={state.images[0]} />)
                        : null
                    }
                
                <div className="info">
                    <div className="title">
                        <Link to={`/viewItem/${state._id}`}><strong>{state.title}</strong></Link>
                    </div>
                </div>
            </div>
    );
    }

}

export default Product;