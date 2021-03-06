NewAdminProject = React.createClass({
	mixins:[ReactMeteorData],
	getMeteorData: function(){
		var data = {
			project_phases: "",
			projectsLoaded: FlowRouter.subsReady(),
		};
		if (data.projectsLoaded) {
			data.project_phases = ProjectPhases.find().fetch();
		}
		// console.log("projects list :: Data =>>", data);
		return data;
	},
	componentDidMount(){
		//initialize tags input

		$('#tags-input').tagsinput({
			maxChars: 50
		});

		$('.bootstrap-tagsinput').css('display','block');
		
		// console.log("componentDidMount called");
		$('.grantee-info, .partner-info, .tech-provider-info').on('click', '.add-item', function(e) {
			// console.log("add item button clicked");
			e.preventDefault();
			var controlForm = $(this).parents('.grantee-info, .partner-info, .tech-provider-info'),
				currentEntry = controlForm.children(':first'),
				addGrantee = $(this).parent().clone(),
				newEntry = $(currentEntry.clone()).appendTo(controlForm);
			$(this).parent().remove();
			$(addGrantee).appendTo(controlForm);
			newEntry.find('input').val('');
		}).on('click', '.remove-item', function(e) {
			e.preventDefault();
			var childs = $(this).parents('.grantee, .partner, .tech-provider').parent().children('.grantee, .partner, .tech-provider').length;
			if (childs > 1){
				$(this).parents('.grantee, .partner, .tech-provider').remove();
			}
			else $(this).parents('.grantee, .partner, .tech-provider').find('input').val('');
			return false;
		});
	},
	createNewProject(e){
		e.preventDefault();
		var tags = $("#tags-input").tagsinput('items')
		// console.log("----------", tags);
		var project_data = {
			title: this.refs.title.value,
			description: this.refs.description.value,
			technology_solution: this.refs.technology_solution.value,
			direct_beneficiaries: this.refs.direct_beneficiaries.value,
			tags: tags,
			phaseId: this.refs.phases.value,
			grantee:[],
			partners:[],
			technical_providers:[],
			createdAt : new Date()
		}
		if (!e.currentTarget.granteename.length) {
      project_data.grantee.push({
        name: e.currentTarget.granteename.value,
        link: e.currentTarget.granteelink.value,
      });
  	} else {
      let name = [],
        link = [];
      e.currentTarget.granteename.forEach(i => { name.push(i.value) });
      e.currentTarget.granteelink.forEach(i => { link.push(i.value) });
      for (let i = 0; i < name.length; i++) {
        project_data.grantee.push({
          name: name[i],
          link: link[i],
        });
      }
  	}
  	if (!e.currentTarget.partnername.length) {
      project_data.partners.push({
        name: e.currentTarget.partnername.value,
        link: e.currentTarget.partnerlink.value,
      });
  	} else {
      let name = [],
        link = [];
      e.currentTarget.partnername.forEach(i => { name.push(i.value) });
      e.currentTarget.partnerlink.forEach(i => { link.push(i.value) });
      for (let i = 0; i < name.length; i++) {
        project_data.partners.push({
          name: name[i],
          link: link[i],
        });
      }
  	}
  	if (!e.currentTarget.techprovidername.length) {
      project_data.technical_providers.push({
        name: e.currentTarget.techprovidername.value,
        link: e.currentTarget.techproviderlink.value,
      });
  	} else {
      let name = [],
        link = [];
      e.currentTarget.techprovidername.forEach(i => { name.push(i.value) });
      e.currentTarget.techproviderlink.forEach(i => { link.push(i.value) });
      for (let i = 0; i < name.length; i++) {
        project_data.technical_providers.push({
          name: name[i],
          link: link[i],
        });
      }
  	}
		// console.log("==========", project_data)
		if(project_data.phaseId != ""){
			Meteor.call('addProject', project_data, function(err) {
	      if (err){
	        Bert.alert('Error while adding project:- ' + err.reason , 'danger', 'growl-top-right');
	      }else{
	      	// console.log("Project added successfully");
	      	Bert.alert('Project added successfully.', 'success', 'growl-top-right' );
	        FlowRouter.go('/ProjectsList');
	      }
	  	});
	  }else{
	  	Bert.alert('Please select any one phase', 'danger', 'growl-top-right');
	  }
	},
	render(){
		if (!this.data.projectsLoaded) {
			return <div />;
		}
		that = this;
		// console.log(this.data,"------------------")
		return(
			<div className="container">
				<h1>Admin Dashboard:- Add New Projects</h1>
				<form onSubmit={this.createNewProject}>
					<div className="form-group">
						<label>Enter Title :</label>
						<input className="form-control" type="text" ref="title" placeholder="Enter title" required /><br/>
					</div>
					<div className="form-group">
						<label>Enter Description :</label>
						<textarea className="form-control" ref="description" placeholder="Enter project description" required /><br/>
					</div>
					<div className="form-group">
						<label>Enter Technology Solution :</label>
						<input className="form-control" type="text" ref="technology_solution" placeholder="Enter technology solution" required /><br/>
					</div>
					<div className="form-group">
						<label>Enter Direct Beneficiaries :</label>
						<input className="form-control" type="number" min="0" ref="direct_beneficiaries" placeholder="Enter direct beneficiaries" required /><br/>
					</div>
					<div className="form-group tag-input">
						<label>Enter Tags :</label>
						<input type="text" id="tags-input" data-role="tagsinput" placeholder="Enter tags" /><br/>
					</div>
					<div className="form-group">
						<label>Select Phases :</label>
						<select className="form-control" ref="phases" id="select-phases">
							<option value="">select</option>
							{
								this.data.project_phases ?
									this.data.project_phases.map((phase, index) =>{
										// console.log("=====", phase)
										return(
											<option key={phase._id} value={phase._id}>{phase.title}</option>
										);
									})
								:''
							}
						</select>
					</div>

					<label>Enter Grantee Information :</label>
					<div className="panel panel-default">
						<div className="panel-heading">Grantee</div>
						<ul className="list-group grantee-info">
							<li className="list-group-item grantee">
								<div>
									<div className="remove-item-wrap">
                  	<button type="button" className="btn btn-primary remove-item">
                  		<span className="glyphicon glyphicon-minus"></span>
                  	</button>
              		</div><br/>
              		<div className="array-item-body">
              			<div className="panel panel-default">
                      <div className="panel-body">
                        <div className="form-group" data-required="true">
                          <label>Name</label>
                          <input name="granteename" required className="form-control granteename" type="text" />
                        </div>
                        <div className="form-group" data-required="true">
                          <label>Link</label>
                          <input name="granteelink" required className="form-control granteelink" type="text" />
                        </div>
                      </div>
                  	</div>
              		</div>
								</div>
							</li>
							<li className="list-group-item">
          			<button type="button" className="btn btn-primary add-item"><span className="glyphicon glyphicon-plus"></span></button>
     				 	</li>
						</ul>
					</div>

					<label>Enter Partners Information :</label>
					<div className="panel panel-default">
						<div className="panel-heading">Partners</div>
						<ul className="list-group partner-info">
							<li className="list-group-item partner">
								<div>
									<div className="remove-item-wrap">
                  	<button type="button" className="btn btn-primary remove-item">
                  		<span className="glyphicon glyphicon-minus"></span>
                  	</button>
              		</div><br/>
              		<div className="array-item-body">
              			<div className="panel panel-default">
                      <div className="panel-body">
                        <div className="form-group" data-required="true">
                          <label>Name</label>
                          <input name="partnername" required className="form-control partnername" type="text" />
                        </div>
                        <div className="form-group" data-required="true">
                          <label>Link</label>
                          <input name="partnerlink" required className="form-control partnerlink" type="text" />
                        </div>
                      </div>
                  	</div>
              		</div>
								</div>
							</li>
							<li className="list-group-item">
          			<button type="button" className="btn btn-primary add-item"><span className="glyphicon glyphicon-plus"></span></button>
     				 	</li>
						</ul>
					</div>

					<label>Enter Technical Providers Information :</label>
					<div className="panel panel-default">
						<div className="panel-heading">Technical Providers</div>
						<ul className="list-group tech-provider-info">
							<li className="list-group-item tech-provider">
								<div>
									<div className="remove-item-wrap">
                  	<button type="button" className="btn btn-primary remove-item">
                  		<span className="glyphicon glyphicon-minus"></span>
                  	</button>
              		</div><br/>
              		<div className="array-item-body">
              			<div className="panel panel-default">
                      <div className="panel-body">
                        <div className="form-group" data-required="true">
                          <label>Name</label>
                          <input name="techprovidername" required className="form-control techprovidername" type="text" />
                        </div>
                        <div className="form-group" data-required="true">
                          <label>Link</label>
                          <input name="techproviderlink" required className="form-control techproviderlink" type="text" />
                        </div>
                      </div>
                  	</div>
              		</div>
								</div>
							</li>
							<li className="list-group-item">
          			<button type="button" className="btn btn-primary add-item"><span className="glyphicon glyphicon-plus"></span></button>
     				 	</li>
						</ul>
					</div>

					<div className="form-group">
						<button className="btn btn-default" type="submit">Create</button>&nbsp;
						<button className="btn btn-default" type="button" onClick={()=>FlowRouter.go("/ProjectsList")}>Back</button>
					</div>
				</form>
			</div>
		);
	}
})