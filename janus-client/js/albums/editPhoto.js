function editPhoto($location,albumService){
    return {
        restrict: 'E',
        scope: { album: '&' },
        link: function (scope) {
            //from album we get the entry (our album variables)
            //and we copy it to our album service
            angular.copy(scope.album().values, albumService);
            scope.editAlbum= function () { 
                $location.path('/albums/' + scope.album().values._id);
            };
        },
        template: `<a class="btn btn-default btn-xs" ng-class="size ? 'btn-' + size : ''" ng-click="editAlbum()">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;<span class="hidden-xs ng-scope" translate="Edit photos">edit photos</span>
                </a>`
    };
}

export default editPhoto;