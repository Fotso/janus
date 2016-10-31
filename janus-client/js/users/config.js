export default function (nga, admin) {

    var truncate = function (value) {
        if (!value) return '';
        return value.length > 50 ? value.substr(0, 50) + '...' : value;
    };
    
	var users = admin.getEntity('users');
	var companies = admin.getEntity('companies');
	
   	// set the fields of the user entity list view
   	users.identifier(nga.field('_id')).listView()
	   	.fields([
	   		nga.field('username'),
		   	nga.field('email'),
		   	// nga.field('password'),
		   	nga.field('lastname'),
		   	nga.field('firstname'),
		   	nga.field('company_id', 'reference')
		   		.label('Company')
		   		.isDetailLink(true)
		   		.targetEntity(companies)
		   		.targetField(nga.field('name').map(truncate))
		   		.singleApiCall(ids => ({'id': ids })),
		   	nga.field('created_at'),
		   	nga.field('updated_at')
	   	])
	   .exportFields([
		   	nga.field('_id'),
		   	nga.field('username'),
		   	nga.field('email'),
		   	nga.field('password'),
		   	nga.field('lastname'),
		   	nga.field('firstname'),
		   	nga.field('admin', 'boolean'),
		   	nga.field('superAdmin', 'boolean'),
		   	nga.field('created_at'),
		   	nga.field('updated_at')
	   	])
   		.listActions(['show','edit', 'delete']);

	   	users.identifier(nga.field('_id')).showView().fields([
		   	nga.field('_id').isDetailLink(true),
		   	nga.field('username'),
		   	nga.field('email'),
		   	nga.field('lastname'),
		   	nga.field('firstname'),
		   	nga.field('company_id', 'reference')
			   	.label('Company')
			   	.isDetailLink(true)
			   	.targetEntity(companies)
			   	.targetField(nga.field('name').map(truncate))
			   	.singleApiCall(ids => ({'id': ids })),
		   	nga.field('admin', 'boolean'),
		   	nga.field('superAdmin', 'boolean'),
		   	nga.field('created_at'),
		   	nga.field('updated_at')
   		]);

	   	users.identifier(nga.field('_id')).editionView()
	   		.actions(['list', 'show', 'delete'])
	   		.fields([
			   	nga.field('_id').editable(false),
			   	nga.field('username'),
			   	nga.field('email'),
			   	nga.field('password'),
			   	nga.field('lastname'),
			   	nga.field('firstname'),
			   	nga.field('admin', 'boolean'),
			   	nga.field('company_id', 'reference')
				   	.label('Company')
				   	.targetEntity(companies)
				   	.targetField(nga.field('name').map(truncate)),
			   	nga.field('superAdmin', 'boolean'),
			   	nga.field('created_at','datetime').editable(false),
			   	nga.field('updated_at','datetime').editable(true)
	   	]);

	   	users.identifier(nga.field('_id')).creationView().fields([
		    nga.field('username'),
		    nga.field('email'),
		    nga.field('password'),
		    nga.field('lastname'),
		    nga.field('firstname'),
    	  	nga.field('admin', 'boolean'),
	      	nga.field('superAdmin', 'boolean'),
		    nga.field('updated_at','datetime').editable(true)
	    ]);

   return users;
}