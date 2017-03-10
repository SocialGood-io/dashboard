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
	searchData: function(tag, index){
		$('#tags-'+index).addClass('active').siblings().removeClass('active');
		this.props.searchTag(tag);
	},
	/*getProjectCount: function(phaseId){
		if(this.data.projectCount.hasOwnProperty(phaseId))
			return (this.data.projectCount[phaseId]).length
		else
			return 0;
	},*/
	componentDidUpdate(){
		if(this.props.filter == 0){
			$('.prj-tags').removeClass('active');
		}
	},
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
		var uniqValArray = _.uniq(_.flatten(tempArray)).sort();
		// console.log("========", uniqValArray)
		return uniqValArray.map((tag, index)=>{
			// console.log("tag --", tag)
			return (
				<a href="javascript:void(0)" key={index} className="prj-tags" id={"tags-"+index} onClick={()=>this.searchData(tag, index)}>{tag}</a>
			)
		})
	},
	render: function () {
		if (!this.data.projectsLoaded) {
			return <LoadingSpinner />;
		}
		// console.log("------", this.props.filter)
		return (
			<div className="tag-section">
				{
					this.showFilterTags()
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