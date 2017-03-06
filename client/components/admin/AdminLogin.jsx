AdminLogin = React.createClass({
	handleSignin(event){
		event.preventDefault();
		var email = this.refs.email.value;
		var password = this.refs.password.value;
		// console.log(email, "--------", password)
		Meteor.loginWithPassword(email, password, (err)=>{
			if(err)
				alert("Error while login:- "+err.reason)
			else
				FlowRouter.go('adminProjectsList')
		})
	},
	render(){
		return(
			<div className="container">
				<form onSubmit={this.handleSignin}>
					<input className="form-control" type="email" ref="email" placeholder="Enter admin email" required /><br/>
					<input className="form-control" type="password" ref="password" placeholder="Enter admin password" required /><br/>
					<button className="btn btn-default" type="submit">Login</button>
				</form>
			</div>
		)
	}
});