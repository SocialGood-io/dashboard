AdminLayout = React.createClass({
	render(){
		return(
			<div>
				<header>
					<h1></h1>
				</header>
					
				{this.props.adminPages}
				
			</div>
		);
	}
});