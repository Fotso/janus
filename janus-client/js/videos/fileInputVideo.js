function fileInputVideo($parse){
    return{
        restrict:'A',
        link: function(scope,element,attrs){
            element.bind('change', function(){
                $parse(attrs.fileInput).assign(scope, element[0].files);
                scope.$apply();
            });
        }
    }
}

export default fileInputVideo;