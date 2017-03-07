ProjectsLayout = React.createClass({
	// adminRedirect(event){
	// 	event.preventDefault();
	// 	FlowRouter.go("/login");
	// },
	render(){
		return(
			<div>
				<div className="header">
					<div className="logo">
						<a href={FlowRouter.path('home')}>
							<img src="di-logo-white.png" />
						</a>
					</div>
				</div>
				<div className="dashboard">
					<h1>Development Innovations Dashboard</h1>
					
					<div className="clear"></div>
					
					{this.props.content}
				</div>
				<div className="clear"></div>
				<footer></footer>
			</div>
		);
	}
});