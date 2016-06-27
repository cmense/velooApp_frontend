(function () {
    'use strict';

    angular
        .module('velooAngular')
        .controller('authCtrl', authCtrl);

    function authCtrl($scope, $route, $location, $mdDialog, authService, $rootScope, $sce) {
        var vm = this;

        vm.cancel = $mdDialog.cancel;
        vm.login = login;
        vm.signup = signup;
        vm.sendPasswordToMail = sendPasswordToMail;
        vm.showFacebookLogin = showFacebookLogin;
        vm.showForgotPassword = showForgotPassword;
        $scope.url=$sce.trustAsResourceUrl("http://localhost:3000/login/facebook");

        function sendPasswordToMail() {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title('Thank you!')
                .textContent('A password reset Email was sent to you!')
                .ok('OK'));
            vm.cancel();
        }

        function login() {
            if (vm.username && vm.password) {
                authService.login(vm.username, vm.password).then(function (success) {
                    if ($rootScope.routeVisited) {
                        $location.path($rootScope.routeVisited).search($rootScope.routeVisitedSearchParams);
                        $rootScope.routeVisited = null;
                        $rootScope.routeVisitedSearchParams = null;
                    } else {
                        $route.reload();
                    }
                    vm.cancel();
                    console.log(success);
                }, function (error) {
                    console.log(error);
                    vm.submitError = true;
                });
            } else {
                vm.formInvalid = true;
            }
        }

        function signup() {
            if (vm.username && vm.password) {
                authService.signup(vm.username, vm.password).then(function (success) {
                    vm.cancel();
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .clickOutsideToClose(true)
                            .title('Welcome!')
                            .textContent('Welcome at Veloo!')
                            .ok('OK'));
                }, function (error) {
                    console.log(error);
                    vm.submitError = true;
                });
            } else {
                vm.formInvalid = true;
            }
        }
        
        function showFacebookLogin() {
            $mdDialog.show({
                controller: 'authCtrl as ctrl',
                templateUrl: 'components/auth/templates/fblogin.tpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        }

        function showForgotPassword() {
            $mdDialog.show({
                controller: 'authCtrl as ctrl',
                templateUrl: 'components/auth/templates/passwordforgot.tpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        }

    }
})();
