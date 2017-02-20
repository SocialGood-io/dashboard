var Api = new Restivus({
	version: 'v1',
	useDefaultAuth: true
});

Api.addRoute('getProjects/', { authRequired: false }, {
	get: function(){
		console.log("=====> GET PROJECTS API <======")
		return Projects.find().fetch();
		/*console.log("------------", projects)
		if(projects)
			return projects;
		else
			return [];*/		
	}
});