Meteor.startup(function () {
	if ( Meteor.users.find().count() === 0 ) {
		id = Accounts.createUser({
			email: 'test@gmail.com',
			password: '123456',
			profile: {
				fname: 'test',
				lname: 'user'
			}
		});
		Roles.addUsersToRoles(id,['admin'], 'staff');
	}
});