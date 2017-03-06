TagsList = React.createClass({
	mixins:[ReactMeteorData],
	getMeteorData: function() {
		var data = {
			// phases: ProjectPhases.find().fetch(),
			// projects: Projects.find({},{fields:{phaseId:1}}).fetch(),
			projects: Projects.find({},{fields:{tags:1}}).fetch(),
			projectsLoaded: FlowRouter.subsReady(),
			// projectCount:{}
		};
		/*if (data.projectsLoaded) {
			data.projectCount = _.groupBy(data.projects,'phaseId');
		}*/
		return data;
	},
	getInitialState:function(){
  	return{
  		// filter:0,
  		tagName: "",
  		// "showTagArea": false
  	}
	},
	filterTag(tag) {
		this.setState({
			// filter: 1,
			"tagName": tag
		});
	},
	
	/*getProjectCount: function(phaseId){
		if(this.data.projectCount.hasOwnProperty(phaseId))
			return (this.data.projectCount[phaseId]).length
		else
			return 0;
	},*/

	showFilterTags(){
		var tempArray = [];
		// console.log("---------", this.data.projects)
		for(var i=0;i<this.data.projects.length;i++){
			// console.log("---------", this.data.projects[i].tags)
			this.data.projects[i].tags?
				tempArray.push(this.data.projects[i].tags)
			:''
			// console.log("==>", _.flatten(tempArray))
		}
		var uniqValArray = _.uniq(_.flatten(tempArray))
		// console.log(uniqValArray)
		return uniqValArray.map((tag, index)=>{
			// console.log("tag --", tag)
			return (
				<a href={FlowRouter.path('tags',{alias:tag})} key={index} className="prj-tags">{tag}</a>
			)
		})
	},

	render: function () {
		if (!this.data.projectsLoaded) {
			return <LoadingSpinner />;
		}
		that = this;
		return (
			<div className="tag-section">
				{
					that.showFilterTags()
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