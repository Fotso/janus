function requestInterceptor(RestangularProvider) {
    // use the custom query parameters function to format the API request correctly
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
        if (operation == 'getList' && what) {
            params._sortField = params._sortField || 'id';
            params._sortDir = params._sortDir || 'DESC';
        }
        return { params: params, headers: headers  };
    });
}

function responseInterceptor(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
        if (operation == "getList") {
            if (response.headers['Content-Range']) {
                console.log('qsdqsd')
                var contentRange = response.headers('Content-Range');
                response.totalCount = contentRange.split('/')[1];
            }
        }
        console.log(data);
        return data;
    });
}

var truncate = function (value) {
        if (!value) return '';
        return value.length > 50 ? value.substr(0, 50) + '...' : value;
};

export default { requestInterceptor, responseInterceptor, truncate }
