ProjectsList=React.createClass({
	mixins:[ReactMeteorData],
	getMeteorData: function(){
		var projectSub = Meteor.subscribe('projects');
		var data = {
			phases: "",
			projects: "",
			projectsLoaded: FlowRouter.subsReady(),
			tag: FlowRouter.current().params.alias ? FlowRouter.current().params.alias :''
		};

		if (data.projectsLoaded) {
			let phasesData = ProjectPhases.find().fetch();
			data.phases =	_.indexBy(phasesData,'_id');
			// console.log("projects list :: currentPhase =>>", data.currentPhase)
			/*if(data.currentPhase){
				let pid=_.find(data.phases, function(phase) {
					// console.log("project list :: phase -->>", phase)
					return phase.alias == data.currentPhase
				})
				// console.log("project list :: pid  -->>", pid);
				data.projects = Projects.find({phaseId:pid._id}).fetch()
			}else{*/
				data.projects = Projects.find().fetch()
			// }
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
		this.setState({
			"filter": 1,
			"tagValue": tag
		});
	},
	resetState(){
		this.setState({
			"filter": 0,
			"tagValue": ""
		});
	},
	render: function () {
		if (!this.data.projectsLoaded) {
			return <div />;
		}
		// console.log("---------------------------", this.props.tagValue)
		// console.log("===========================", this.state.tagValue)
		// console.log("-----------", that.searchTags)
		return (
			<div>
				<p className="large">We are helping civil society organizations in Cambodia test, design, and implement technology solutions that solve development challenges. <a href="/">Explore our projects</a> or <a href="http://development-innovations.org/contact-us">get involved with us.</a></p>

				<TagsList searchTag={this.searchTags} filter={this.state.filter ? this.state.filter:0} />
				<br/>
				<br/>
				{
					this.state.filter == 1 ?
						<button className="btn btn-default" type="button" onClick={this.resetState}>List all</button>
					:''
				}

				{
					this.state.filter == 0 ?
						this.data.projects.map((project)=>{
							// console.log("project list :: projects data =>>", project)
							return (
								<div key={project._id}>
									<div className="clear"></div>
									<div className="explainer">
										<div className="about left">
											<h2>{project.title}</h2>
											<p>{project.description}</p>
											{
												project && project.tags ?
													project.tags.map((tag, index)=>{
														return <a href="javascript:void(0)" key={index} className="prj-tags" id={project._id} onClick={()=>this.searchTags(tag)}>{tag}</a>
													})
												:''
											}
										</div>
										<div className="data left">
											<span className={"tag "+this.data.phases[project.phaseId].dashboxclass+" right"}>{this.data.phases[project.phaseId].title}</span>
											<ul>
												<li><strong>Grantee: </strong>{this.getItems(project.grantee)}</li>
												<li><strong>Partners: </strong>{this.getItems(project.partners)}</li>
												<li><strong>Technical Providers: </strong>{this.getItems(project.technical_providers)}</li>
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
						<SearchResult tag={this.state.tagValue?this.state.tagValue:''} searchTag={this.searchTags} />
					:''
				}
			</div>
		)
	}
});