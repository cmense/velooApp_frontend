(function (angular) {
    angular
        .module('velooAngular')
        .directive('scroll', scroll);

    function scroll($window, $location, $route) {

        return function (scope, element, attrs) {
            scope.isTransparent = ($location.$$path == '/');

            scope.$on('$routeChangeStart', function () {
                scope.isTransparent = ($location.$$path == '/');
            });

            /* Scroll event listener */
            angular.element(element).bind("scroll", function () {

                if (document.querySelector('[md-page-header]')) {
                    if (angular.element(this)[0].scrollTop <= 10) { //Adjust for other scenarios

                        scope.isTransparent = true;
                    } else {
                        scope.isTransparent = false;
                    }
                } else {
                    scope.isTransparent = false;
                }

                scope.$apply();
            });

        };

    }
})(angular);