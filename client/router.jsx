/*FlowRouter.route("/", {
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
	name: 'tags',
	subscriptions: function(params){
    this.register('projectPhases',Meteor.subscribe('projectPhases'))
		this.register('projects',Meteor.subscribe('projects'))
	},
	action(params) {
		ReactLayout.render(ProjectsLayout, {
			content: <ProjectsList tagValue={params.alias} />
		});
	}
});*/

/*var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [function(context, redirect) {
    if(!Meteor.userId()) {
      redirect('home');
    } 
    if(!Meteor.user().roles && !Meteor.user().roles.staff == 'admin') {
      redirect('home');
    }
    console.log('running group triggers');
  }]
});*/

/*FlowRouter.route('/', {
	name: 'adminLogin',
	action() {
		ReactLayout.render(AdminLayout, {adminPages: <AdminLogin />});
	},
  triggersEnter: [function(context, redirect) {
    console.log('running / admin trigger');
  }]
});*/

FlowRouter.route('/ProjectsList', {
	name: 'adminProjectsList',
	subscriptions: function(params){
    this.register('projectPhases',Meteor.subscribe('projectPhases'))
		this.register('projects',Meteor.subscribe('projects'))
	},
	action() {
		ReactLayout.render(AdminLayout, {adminPages: <AdminProjectsTable />});
	},
  triggersEnter: [function(context, redirect) {
    console.log('running /ProjectsList admin trigger');
  }]
});

FlowRouter.route('/NewProject', {
	name: 'adminNewProject',
	subscriptions: function(params){
    this.register('projectPhases',Meteor.subscribe('projectPhases'))
	},
	action() {
		ReactLayout.render(AdminLayout, {adminPages: <NewAdminProject />});
	},
  triggersEnter: [function(context, redirect) {
    console.log('running /NewProject admin trigger');
  }]
});

FlowRouter.route('/UpdateProject/:id', {
	name: 'adminUpdateProject',
	subscriptions: function(params){
    this.register('projectPhases',Meteor.subscribe('projectPhases'))
		this.register('projects',Meteor.subscribe('projects'))
	},
	action(params) {
		ReactLayout.render(AdminLayout, {adminPages: <UpdateAdminProject projectId={params.id}/>});
	},
  triggersEnter: [function(context, redirect) {
    console.log('running /UpdateProject admin trigger');
  }]
});