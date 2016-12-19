import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

// ----------------------------------------------------
const loginMessageStyle = {
	color: "red"
}

// ----------------------------------------------------
const Login = React.createClass({

	getInitialState: function() {
		return {
			loginMessage: ""
		}
	},

	_onLoginSubmit: function(event) {		
		event.preventDefault()
		const email = ReactDOM.findDOMNode(this.refs.email).value
		const password = ReactDOM.findDOMNode(this.refs.password).value

		// Passed in via react-redux. Returns a promise.
		let nextPathname = "/"

		try {nextPathname = ownProps.location.state.nextPathname}
		catch(err) {}
		this.props.manualLogin({ // this function is passed in via react-redux
			email,
			password			
		}, nextPathname) // holds the path to redirect to after login (if any)
		.then((loginMessage) => {
			if (loginMessage) {
				// report to the user is there was a problem during login
				this.setState({
					loginMessage
				})			
			}	
		})

	},

	render: function() {
		return(
			<div>
				<h2 className="login-form">Log in</h2>		
				<form onSubmit={this._onLoginSubmit}>
					<div className="input-unit">
						<input type="email" ref="email" placeholder="Email"/><br/>
					</div>
					<div className="input-unit">
						<input ref="password" type="password" placeholder="Password" /><br/>
					</div>
					<div className="input-unit"> 
						<input type="submit" value="Login" /> <span style={loginMessageStyle}>{ this.state.loginMessage }</span>
					</div>
					
				</form>	
			</div>	
		)
	}
})

export default Login