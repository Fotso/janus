function editVideo($location,videoService){
    return {
        restrict: 'E',
        scope: { albumVideo: '&' },
        link: function (scope) {
            //from album we get the entry (our album variables)
            //and we copy it to our album service
            angular.copy(scope.albumVideo().values, videoService);
            scope.editVideo= function () { 
                $location.path('/videos/' + scope.albumVideo().values._id);
            };
        },
        template: `<a class="btn btn-default btn-xs" ng-class="size ? 'btn-' + size : ''" ng-click="editVideo()">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;<span class="hidden-xs ng-scope" translate="Edit videos">edit videos</span>
                </a>`
    };
}

export default editVideo;