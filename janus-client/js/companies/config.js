export default function (nga, admin) {

	var companies = admin.getEntity('companies');
	var users = admin.getEntity('users');
	
	companies.identifier(nga.field('_id')).listView().fields([
	    nga.field('name'),
	    nga.field('email'),
	    nga.field('address'),
	    nga.field('codePostal'),
	    nga.field('phone'),
	    nga.field('website'),
	    nga.field('created_at','datetime'),
	    nga.field('updated_at','datetime')
    ])
   .exportFields([
	    nga.field('name'),
	    nga.field('email'),
	    nga.field('address'),
	    nga.field('codePostal'),
	    nga.field('phone'),
	    nga.field('website'),
	    nga.field('created_at','datetime'),
	    nga.field('updated_at','datetime')
    ])
   .listActions(['show','edit', 'delete']);

   companies.identifier(nga.field('_id')).showView().fields([
	    nga.field('name'),
	    nga.field('email'),
	    nga.field('address'),
	    nga.field('codePostal'),
	    nga.field('phone'),
	    nga.field('website'),
	    nga.field('created_at','datetime'),
	    nga.field('updated_at','datetime'),
	    nga.field('employees', 'embedded_list')
	      .targetFields(users.showView().fields())
   ]);

   companies.identifier(nga.field('_id')).showView().actions(['edit', 'delete']);

   companies.editionView().actions(['list', 'show', 'delete']).fields([
		nga.field('_id').editable(false),
		nga.field('name'),
		nga.field('email'),
		nga.field('address'),
		nga.field('codePostal'),
		nga.field('phone'),
		nga.field('website'),
		nga.field('created_at','datetime').editable(false),
		nga.field('updated_at','datetime').editable(true),
       /*nga.field('employees', 'embedded_list')
      .targetFields(users.showView().fields())*/
   ]);

   companies.identifier(nga.field('_id')).creationView().fields([
		nga.field('name'),
		nga.field('email'),
		nga.field('address'),
		nga.field('codePostal'),
		nga.field('phone'),
		nga.field('website'),
		nga.field('created_at','datetime').editable(true),
		nga.field('updated_at','datetime').editable(true)
    ]);
   
   return companies;
}