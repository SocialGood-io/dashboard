ProjectsList=React.createClass({
	mixins:[ReactMeteorData],
	getMeteorData: function(){
		var projectSub = Meteor.subscribe('projects');
			var data = {
			    phases: "",
			    projects: "",
			    projectsLoaded: FlowRouter.subsReady(),
			    currentPhase:this.props.phaseAlias?this.props.phaseAlias:""
			  };

		if (data.projectsLoaded) {
			let phasesData 	= 	ProjectPhases.find().fetch()
			data.phases  	=	_.indexBy(phasesData,'_id');
			if(data.currentPhase){
				let pid=_.find(data.phases, function(phase) { return phase.alias == data.currentPhase })
				data.projects= Projects.find({phaseId:pid._id}).fetch()
			}
			else{
				data.projects= Projects.find().fetch()
			}
		}
	return data;
	},
	getItems:function(items){
		let itemsLength = items.length-1;
		return (items.map(function(item,index){
			return <span key={index}><a href={item.link}>{item.name}</a>{(index < itemsLength)?", ":""}</span>
		})
		)
	},
	render: function () {
		if (!this.data.projectsLoaded) {
	      return <div />;
	    }
		that=this;
		return (<div>
					{this.data.projects.map(function(project){
						return (<div key={project._id}>
									<div className="clear"></div>
									<div className="explainer" key={project._id}>
							          <div className="about left">
							            <h2>{project.title}</h2>
							            <p>{project.description}</p>
							          </div>
							          <div className="data left">
							            <span className={"tag "+that.data.phases[project.phaseId].dashboxclass+" right"}>{that.data.phases[project.phaseId].title}</span>
							            <ul>
							              <li><strong>Grantee: </strong>{that.getItems(project.grantee)}</li>
							              <li><strong>Partners: </strong>{that.getItems(project.partners)}</li>
							              <li><strong>Technical Providers: </strong>{that.getItems(project.technical_providers)}</li>
							              <li><strong>Technology Solution: </strong> {project.technology_solution}</li>
							            </ul>
							          </div>
							        </div>
								  </div>
							)
						})
					}
				</div>
			)
	}
});
