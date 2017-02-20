ProjectsLayout = React.createClass({
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
					<p className="large">We are helping civil society organizations in Cambodia test, design, and implement technology solutions that solve development challenges. <a href="/">Explore our projects</a> or <a href="http://development-innovations.org/contact-us">get involved with us.</a></p>

					<ProjectPhasesList />
					
					<div className="clear"></div>
					
					{this.props.content}
				</div>
				<div className="clear"></div>
				<footer></footer>
			</div>
		);
	}
});