ProjectPhasesList = React.createClass({
	mixins:[ReactMeteorData],
	getMeteorData: function() {
		var data = {
			phases: ProjectPhases.find().fetch(),
			projects: Projects.find({},{fields:{phaseId:1}}).fetch(),
			projectsLoaded: FlowRouter.subsReady(),
			projectCount:{}
		};
		if (data.projectsLoaded) {
			data.projectCount = _.groupBy(data.projects,'phaseId');
		}
		return data;
	},

	getProjectCount: function(phaseId){
		if(this.data.projectCount.hasOwnProperty(phaseId))
			return (this.data.projectCount[phaseId]).length
		else
			return 0;
	},

	render: function () {
		if (!this.data.projectsLoaded) {
			return <LoadingSpinner />;
		}
		that = this;
		// console.log(this.data.phases)
		return (
			<div>
				{
					this.data.phases.map(function(projectPhase){
						// console.log("ProjectPhasesList :: projectPhase -->>", projectPhase)
						return <div key={projectPhase._id} data-phase-id={projectPhase._id} className={"dashbox "+projectPhase.dashboxclass}>
							<h2>{projectPhase.title}</h2>
							<p>{projectPhase.description}</p>
							<p><strong><em><a href={FlowRouter.path('projectPhases',{alias:projectPhase.alias})}>{that.getProjectCount(projectPhase._id)} projects in this phase</a></em></strong></p>
						</div>
					})
				}
			</div>
		)
	}
});

LoadingSpinner = React.createClass({
	render:function(){
		return (
			<div className="loadingSpan">
				<img src="loading-anim-red.gif" alt="Loading..." />
			</div>
		);
	}
})