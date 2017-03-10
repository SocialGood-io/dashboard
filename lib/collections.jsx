Projects = new Meteor.Collection('projects');
ProjectPhases = new Mongo.Collection('project_phases');

if(Meteor.isServer){
	Meteor.methods({
		'deleteProject': function(projectId){
			Projects.remove({_id: projectId})
		},
		'addProject': function(projectInfo){
			Projects.insert(projectInfo)
		},
		'updateProject': function(projectInfo, projectId){
			Projects.update({_id: projectId}, {$set:projectInfo})
		}
	})
}