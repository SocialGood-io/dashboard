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
			let phasesData = ProjectPhases.find().fetch();
			data.phases =	_.indexBy(phasesData,'_id');
			// console.log("projects list :: currentPhase =>>", data.currentPhase)
			if(data.currentPhase){
				let pid=_.find(data.phases, function(phase) {
					// console.log("project list :: phase -->>", phase)
					return phase.alias == data.currentPhase
				})
				// console.log("project list :: pid  -->>", pid);
				data.projects = Projects.find({phaseId:pid._id}).fetch()
			}else{
				data.projects = Projects.find().fetch()
			}
		}
		// console.log("projects list :: Data =>>", data);
		return data;
	},
	getInitialState:function(){
  	return{
  		filter: 0,
  		tagValue: ""
  	}
	},
	getItems:function(items){
		// console.log("project list :: items -->>", items)
		let itemsLength = items.length - 1;
		return (
			items.map(function(item,index){	
				return <span key={index}><a href={item.link}>{item.name}</a>{(index < itemsLength)?", ":""}</span>
			})
		)
	},
	searchTags: function(tag){
		// console.log("searchTags() called ==>", tag);
		this.setState({
			"filter": 1,
			"tagValue": tag
		});
	},
	render: function () {
		if (!this.data.projectsLoaded) {
			return <div />;
		}
		that = this;
		// console.log("-------", this.state.tagValue)
		// console.log("projects list :: projects array -->>", this.data.projects)
		return (
			<div>
				{
					this.state.filter == 0 ?
						this.data.projects.map(function(project){
							// console.log("project list :: projects data =>>", project)
							return (
								<div key={project._id}>
									<div className="clear"></div>
									<div className="explainer">
										<div className="about left">
											<h2>{project.title}</h2>
											<p>{project.description}</p>
											{
												project.tags.map((tag, index)=>{
													return <a href="javascript:void(0)" key={index} className="prj-tags" onClick={()=>that.searchTags(tag)}>{tag}</a>
												})
											}
										</div>
										<div className="data left">
											<span className={"tag "+that.data.phases[project.phaseId].dashboxclass+" right"}>{that.data.phases[project.phaseId].title}</span>
											<ul>
												<li><strong>Grantee: </strong>{that.getItems(project.grantee)}</li>
												<li><strong>Partners: </strong>{that.getItems(project.partners)}</li>
												<li><strong>Technical Providers: </strong>{that.getItems(project.technical_providers)}</li>
												<li><strong>Technology Solution: </strong>{project.technology_solution}</li>
												<li><strong>Direct Beneficiaries: </strong>{project.direct_beneficiaries}</li>
											</ul>
										</div>
									</div>
								</div>
							)
						})
					:''
				}
				{
					this.state.filter == 1 ?
						<SearchResult tag={this.state.tagValue?this.state.tagValue:''} searchTag={this.searchTags} currentPhase={this.props.phaseAlias?this.props.phaseAlias:''} />
					:''
				}
			</div>
		)
	}
});