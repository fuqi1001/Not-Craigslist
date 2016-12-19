import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { addItems } from './addItems'
import { productlist } from './productlist'

class Grid extends Component {

  render() {

    const {items, addActions} = this.props;

    return (
      <div>
        Grid
        <Link to={'/app'}>items</Link>

          <div>
          item
          <Link to={'/item'}>Detail</Link>
          </div>

              <div>

              <productlist />
            <Link to={'/productlist'}>PList</Link>
            </div>

      </div>
    )
  }
}

export default Grid