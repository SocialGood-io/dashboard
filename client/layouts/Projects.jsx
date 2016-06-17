ProjectsLayout = React.createClass({
	render(){
		return  <div>
					<div className="header">
	        			<div className="logo">
		        			<a href={FlowRouter.path('home')}>
		        				<img src="di-logo-white.png" />
		        			</a>
	        			</div>
	      			</div>
					<div className="dashboard">
				        <h1>Development Innovations Dashboard</h1>
				        <p className="large">The interactive dashboard provides up-to-date information on the projects we've funded to date. At Development Innovations we track our partners' progress through the 5D process. <a href="/">Explore our projects</a> or <a href="http://development-innovations.org/contact-us">get involved with us.</a></p>
								<p className="large">You can click on each section to see which projects are working in that phase of the process.</p>
								<p></p>
						<ProjectPhasesList />
						<div className="clear"></div>
						{this.props.content}
					</div>
					<div className="clear"></div>
					<footer>
      				</footer>
				</div>;
	}
});
