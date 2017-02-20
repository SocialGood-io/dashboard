FlowRouter.route("/", {
	name: "home",
	subscriptions: function(params){
		this.register('projectPhases',Meteor.subscribe('projectPhases'))
		this.register('projects',Meteor.subscribe('projects'))
	},
	action() {
		ReactLayout.render(ProjectsLayout, {
			content: <ProjectsList />
		});
	}
});

FlowRouter.route('/:alias', {
	name: 'projectPhases',
	subscriptions: function(params){
		this.register('projectPhases',Meteor.subscribe('projectPhases'))
		this.register('projects',Meteor.subscribe('projects'))
	},
	action(params) {
		ReactLayout.render(ProjectsLayout, {
			content: <ProjectsList phaseAlias={params.alias} />
		});
	}
});