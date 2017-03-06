AdminProjectsTable = React.createClass({
	mixins:[ReactMeteorData],
	getMeteorData: function(){
		var data = {
			phases: "",
			projects: "",
			projectCount: 0,
			projectsLoaded: FlowRouter.subsReady(),
		};
		if (data.projectsLoaded) {
			// let phasesData = ProjectPhases.find().fetch();
			// data.phases =	_.indexBy(phasesData,'_id');
			data.projects = Projects.find().fetch(),
			data.projectCount = Projects.find().count()
		}
		// console.log("projects list :: Data =>>", data);
		return data;
	},
	logOut(event){
		event.preventDefault();
		Meteor.logout((err)=>{
			if(err)
				console.log(err)
			else
				FlowRouter.go('/')
		});
	},
	render(){
		if (!this.data.projectsLoaded) {
			return <div>Loading...</div>;
		}
		return(
			<div className="container">
				<h1>Admin Dashboard:- Projects List</h1>
				<div className="top-box">
					<a id="new-project" href="" style={{textDecoration: "none"}} onClick={()=>FlowRouter.go('/NewProject')}>New Project</a>
					<a id="log-out" href="" style={{textDecoration: "none"}} onClick={this.logOut}>Log out</a>
				</div>
				<br/>
				{
					this.data.projectCount > 0 ?
						<div style={{overFlowX:"auto"}}>
						<table style={{width: '100%'}}>
							<thead>
								<tr>
									<th>Title</th>
									<th>Direct Beneficiaries</th>
									<th>Grantee</th>
									<th>Partners</th>
									<th>Tags</th>
									<th>Technical Providers</th>
									<th>Created Date</th>
									<th>Options</th>
								</tr>
							</thead>
							<tbody>
								{
									this.data.projects ?
										this.data.projects.map((project) =>{
											// console.log(project.grantee)
											return(
												<AdminProjectsList key={project._id} project={project} />
											);
										})
									:''
								}
							</tbody>
						</table>
						</div>
					: <div>No projects to shown.</div>
				}
			</div>
		);
	}
})