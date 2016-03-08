Meteor.publish('projects', function(){
  return Projects.find();
});

Meteor.publish('projectPhases', function(){
	return ProjectPhases.find({});
});
