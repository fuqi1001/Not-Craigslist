import React from "react"
import ReactDOM from "react-dom"

// ----------------------------------------------------
const registerMessageStyle = {
	color: "red"
}

// ----------------------------------------------------
const Register = React.createClass({

	getInitialState: function() {
		return {
			registerMessage: ""
		}
	},

	_onRegisterSubmit: function(event) {
		event.preventDefault()
		const email = ReactDOM.findDOMNode(this.refs.email).value
		const password = ReactDOM.findDOMNode(this.refs.password).value
		
		// Passed in via react-redux. Returns a promise.
		this.props.manualRegister({
			email,
			password
		})
		.then((registerMessage) => {
			if (registerMessage) {
				// report to the user is there was a problem during registration
				this.setState({
					registerMessage
				})			
			}	
		})		

	},

	render: function() {
		return(
			<div>
				<h2 className="login-form">Register</h2>	
				<form onSubmit={this._onRegisterSubmit}>	
				<div className="input-unit"><input type="email" ref="email" placeholder="Email"/><br/></div>
				<div className="input-unit"><input type="password" ref="password" placeholder="Password"/><br/>	</div>
				<div className="input-unit"><input type="submit" value="Register" /> <span style={registerMessageStyle}>{ this.state.registerMessage }</span></div>

					
									
					
				</form>	
			</div>
		)	
	}
})

export default Register