function uploadImage(){
    return {
        restrict: 'E',
        scope: { 
     		message: '@'
     	},
        link: function (scope) {
        },
        template: '<div class="alert">{{message}}</div>'
    };
}

export default uploadImage;