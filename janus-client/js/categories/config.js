export default function (nga, admin) {

	var categories = admin.getEntity('categories');

    categories.identifier(nga.field('_id')).listView()
	    .fields([
	        nga.field('_id'),
	        nga.field('event_type').label('type'),
	        nga.field('created_at'),
	        nga.field('updated_at')
	    ])
    	.listActions(['<ma-filtered-list-button entity-name="events" filter="{ category_id: entry.values.id }" size="xs" label="Related events"></ma-filtered-list-button>', 'edit', 'delete']);
    
	categories.creationView()
        .fields([
            nga.field('event_type')
                .validation({ required: true }).label('type'),
            nga.field('', 'template')
                .label('')
                .editable(false)
                .template('<span class="pull-right"><ma-filtered-list-button entity-name="events" filter="{ category_id: entry.values.id }" size="sm"></ma-filtered-list-button></span>')
        ]);

    categories.editionView().fields(categories.creationView().fields());

	return categories;
}
