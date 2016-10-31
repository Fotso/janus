
function menu_superAdmin(nga, admin){

	var users = admin.getEntity('users');
	var companies = admin.getEntity('companies');
	var venues = admin.getEntity('venues');
	var categories = admin.getEntity('categories');
	var events = admin.getEntity('events');
	var albums = admin.getEntity('albums');
	
	return nga.menu()
		.addChild(nga.menu()
			.title('Events')
			.icon('<span class="fa fa-th-list fa-fw"></span>')
			.active(path => path.indexOf('/categories') === 0)
			.addChild(nga.menu(categories))
			.icon('<span class="fa fa-picture-o fa-fw"></span>')
			.addChild(nga.menu(events))
			.icon('<span class="fa fa-tags fa-fw"></span>')
			)        
		.addChild(nga.menu()
			.title('Medias')
			.icon('<span class="fa fa-th-list fa-fw"></span>')
			.active(path => path.indexOf('/albums') === 0)
            /*.addChild(nga.menu(photos))
            .icon('<span class="fa fa-file-picture-o fa-fw"></span>')  */         
            .addChild(nga.menu(albums).title('Photo'))
            .icon('<span class="fa fa-file-picture-o fa-fw"></span>')
            /*.addChild(nga.menu(videos))
            .icon('<span class="fa  fa-file-video-o fa-fw"></span>') à faire plus tard...*/
            )
		.addChild(nga.menu(users).icon('<span class="fa fa-users fa-fw"></span>'))
		.addChild(nga.menu(companies).icon('<span class="fa fa-user-times fa-fw"></span>'))
		.addChild(nga.menu(venues).icon('<span class="fa fa-institution fa-fw"></span>'));
}

function menu_admin(nga, admin){
	
	var users = admin.getEntity('users');
	var venues = admin.getEntity('venues');
	var events = admin.getEntity('events');
	var albums = admin.getEntity('albums');

	return nga.menu()
		.addChild(nga.menu(users).icon('<span class="fa fa-users fa-fw"></span>'))
		.addChild(nga.menu(events).icon('<span class="fa fa-picture-o fa-fw"></span>'))
		.addChild(nga.menu(albums).icon('<span class="fa fa-user-times fa-fw"></span>'))
		.addChild(nga.menu(venues).icon('<span class="fa fa-institution fa-fw"></span>'));
}

function menu_visitor(nga, admin){

	var users = admin.getEntity('users');
	var companies = admin.getEntity('companies');
	var venues = admin.getEntity('venues');
	var categories = admin.getEntity('categories');
	var events = admin.getEntity('events');
	var albums = admin.getEntity('albums');

	return nga.menu()
		.addChild(nga.menu()
			.title('Events')
			.icon('<span class="fa fa-th-list fa-fw"></span>')
			.active(path => path.indexOf('/categories') === 0)
			.addChild(nga.menu(categories))
			.icon('<span class="fa fa-picture-o fa-fw"></span>')
			.addChild(nga.menu(events))
			.icon('<span class="fa fa-tags fa-fw"></span>')
			)        
		.addChild(nga.menu()
			.title('Medias')
			.icon('<span class="fa fa-th-list fa-fw"></span>')
			.active(path => path.indexOf('/albums') === 0)
            /*.addChild(nga.menu(photos))
            .icon('<span class="fa fa-file-picture-o fa-fw"></span>')  */         
            .addChild(nga.menu(albums).title('Photo'))
            .icon('<span class="fa fa-file-picture-o fa-fw"></span>')
            /*.addChild(nga.menu(videos))
            .icon('<span class="fa  fa-file-video-o fa-fw"></span>') à faire plus tard...*/
            )
		.addChild(nga.menu(users).icon('<span class="fa fa-users fa-fw"></span>'))
		.addChild(nga.menu(companies).icon('<span class="fa fa-user-times fa-fw"></span>'))
		.addChild(nga.menu(venues).icon('<span class="fa fa-institution fa-fw"></span>'));
}

export {menu_admin, menu_superAdmin, menu_visitor};