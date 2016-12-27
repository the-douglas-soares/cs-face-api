faceApp.directive('avImageFit', ['$interpolate', $interpolate => {
    return {
        link: (scope, elem, attrs) => {
            if (attrs.avSize) {
                let size = attrs.avSize.split(',').map(dim => dim.trim());
                var width = size[0];
                var height = size[1];
            }

            elem.css({
                'background-color': 'lightgrey',
                'background-size': '100%',
                'background-repeat': 'no-repeat',
                'background-position': 'center'
            });

            elem.css({
                'height': height,
                'width': width
            });

            scope.$watch(() => $interpolate(attrs.avImageFit)(scope), nv => {
                if (nv) {
                    elem.css({
                        'background-image': 'url(' + nv + ')'
                    })
                }
            });
        }
    }
}]);