/**
 * Created by qifu on 16/12/15.
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

import actions from '../actions/detailAction';

class itemDetail extends React.Component {

    render(){
        let { Detail, actions} = this.props;
        console.log("run in detail");
        console.log(this.props);
        return (
            <div>
            itemDetail
        {JSON.stringify(this.props.Detail,null, ' ')}


            <li><Link to={"/"}>app</Link></li>
            </div>
    );
    }
}

export default itemDetail