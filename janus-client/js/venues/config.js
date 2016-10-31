export default function (nga, admin){

	var venues = admin.getEntity('venues');
	var events = admin.getEntity('events');
	var albums = admin.getEntity('albums');
	
	venues.identifier(nga.field('_id')).listView().fields([
		nga.field('name'),
		nga.field('email'),
		nga.field('address'),
		nga.field('codePostal'),
		nga.field('phone'),
		nga.field('website'),        
		nga.field('album_id', 'reference')
		.label('Album')
		.targetEntity(albums)
		.targetField(nga.field('name')),
		])
	.exportFields(venues.listView().fields())
	.listActions(['show','edit', 'delete']);

	venues.creationView().fields([        
		nga.field('name'),
		nga.field('email'),
		nga.field('address'),
		nga.field('codePostal'),
		nga.field('phone'),
		nga.field('website')
		]);

	venues.editionView().fields(venues.listView().fields());

	venues.showView().fields(venues.listView().fields(),
		nga.field('events', 'embedded_list').targetFields(events.showView().fields()));

	return events;
}