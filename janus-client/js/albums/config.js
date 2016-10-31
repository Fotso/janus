export default function (nga, admin){

	var albums = admin.getEntity('albums');

	albums.identifier(nga.field('_id')).listView()
		.title('Album Photos List').fields([   
			nga.field('name'),
			nga.field('title'),
			nga.field('description'),
			nga.field('date','datetime').label('date event')
			])
	.listActions(['show','edit', 'delete']);
	//.listActions(['show','edit', 'delete','<edit-photo album="entry"></edit-photo>']);

	albums.creationView().title('Create new album photos').fields(albums.listView().fields());

	albums.showView().fields([
		nga.field('_id'),
		nga.field('name'),
		nga.field('title'),
		nga.field('description'),
		nga.field('date','datetime'),
        nga.field('Photos').template(require('./albumThumbnailView.html'))//<= we override this template
    ]);
    //with our custom template albumsThumbnail.html, display inside the 'main' template
   // albums.showView().template("<album></album>"); 
    //we do the same thing
    albums.editionView().fields(
    	albums.listView().fields(),
	    nga.field('files').label('Photos').template(require('./albumThumbnail.html'))
	);
   // albums.editionView().template(require('./images/sendImageTemplate.html'));
   // albums.showView().template(require('./albums/albumThumbnail.html'));
   return albums;
}