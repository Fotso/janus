export default function (nga, admin){
	var videos = admin.getEntity('videos');
	videos.identifier(nga.field('_id')).listView()
		.title('Album Videos List').fields([   
			nga.field('name'),
			nga.field('title'),
			nga.field('description'),
			nga.field('date','datetime').label('date event')
			])
	.listActions(['show','edit', 'delete']);

	videos.creationView().title('Create new album videos').fields(videos.listView().fields());

	videos.showView().fields([
		nga.field('_id'),
		nga.field('name'),
		nga.field('title'),
		nga.field('description'),
		nga.field('date','datetime'),
        nga.field('Videos').template(require('./videoThumbnailView.html'))//<= we override this template
    ]);
    //with our custom template videoThumbnail.html, display inside the 'main' template
    //we do the same thing
    videos.editionView().fields(
    	videos.listView().fields(),
	    nga.field('files').label('Videos').template(require('./videoThumbnail.html'))
	);

	return videos;
}