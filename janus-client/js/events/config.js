export default function (nga, admin) {
	var events = admin.getEntity('events');
	var categories = admin.getEntity('categories');
	var venues = admin.getEntity('venues');
	var albums = admin.getEntity('albums');

	events.identifier(nga.field('_id')).listView()
	.fields([
		nga.field('_id').editable(false), 
		nga.field('name'),
		nga.field('address'),
		nga.field('categorie_id', 'reference')
		.label('Categorie')
		.targetEntity(categories)
		.targetField(nga.field('event_type')),            
		nga.field('venue_id', 'reference')
		.label('Venue')
		.targetEntity(venues)
		.targetField(nga.field('name')),            
		nga.field('album_id', 'reference')
		.label('Album')
		.targetEntity(albums)
		.targetField(nga.field('name')),
		nga.field('description'), 
		nga.field('date_event','datetime')
		])
	.listActions(['show','edit','delete']);

	events.identifier(nga.field('_id')).showView().fields(
		events.listView().fields());

	events.creationView().title('Create new Event')
	.fields( 
		nga.field('name'),
		nga.field('address'),
		nga.field('description'), 
		nga.field('date_event','datetime'));
	
	events.editionView().fields(events.listView().fields());

	return events;
}