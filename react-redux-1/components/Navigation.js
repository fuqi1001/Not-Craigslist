import React from "react"
import { Link } from "react-router"

var navStyle = {
	backgroundColor: "#EEE",
	padding: "10px"
}

var buttonStyle = {
	backgroundColor: "yellow"
}

const Navigation = React.createClass({

	_logout: function(event) {
		event.preventDefault()
		this.props.manualLogout()
	},

	render: function() {
		return(
			<div style={navStyle}>			
				{
					this.props.user.authenticated 
					? <button onClick={this._logout} style={buttonStyle}>Logout [{this.props.user.email}]</button>
					: <Link to="/login">Log In</Link>
				}				
				{
					!this.props.user.authenticated 
					? <span>&nbsp;|&nbsp;<Link to="/register">Register</Link></span>
					: ""
				}				
				&nbsp;|&nbsp;
				{
					this.props.user.authenticated 
					? <span>&nbsp;|&nbsp;<Link to="/myprofile">My Products</Link></span>
					: ""
				}
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<Link to="/">Home</Link>
				&nbsp;|&nbsp;
        		{
            		this.props.user.authenticated
                	? <span>&nbsp;&nbsp;<Link to={'/app'}>Add item</Link></span>
        		: ""
        		}

			</div>
		)	
	}
})

export default Navigation