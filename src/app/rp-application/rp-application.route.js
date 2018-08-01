(function () {
    'use strict';

    angular
        .module('cmRPApplication')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('rp_application', {
                url: '/rp_application',
                templateUrl: 'app/rp-application/rp-application.html',
                controller: 'RPApplication',
                controllerAs: 'RPApplication',
                data: {
                    authorizedRoles: [USER_ROLES.researcher]
                }
            })
            .state('rp_application.step1', {
                url: '/step1',
                templateUrl: 'app/rp-application/rp-application-f1.html'
            })

            .state('rp_application.step2', {
                url: '/step2',
                templateUrl: 'app/rp-application/rp-application-f2.html'
            })

            .state('rp_application.step3', {
                url: '/step3',
                templateUrl: 'app/rp-application/rp-application-f3.html'
            })

            .state('rp_application.step4', {
                url: '/step4',
                templateUrl: 'app/rp-application/rp-application-f4.html'
            })
            .state('rp_application.nih', {
                url: '/nih?token',
                templateUrl: 'app/rp-application/rp-application-f1.html',
                params: {
                    token: null
                },
                data: {
                    authorizedRoles: [USER_ROLES.researcher]
                },
                resolve: {

                    token: function ($stateParams, cmResearcherService, $window, $rootScope) {
                        if ($stateParams.token !== null) {
                            console.log("llamado a route de nih");

                            // window.location= "http://" + $window.location.host + "#/rp_application/step1";
                            // $window.location.href("http://" + $window.location.host + "#/rp_application/step1")
                            // $state.go('rp_application.step1');
                            return $stateParams;
                            // return cmResearcherService.verifyNihToken(eraProperties, $rootScope.currentUser.dacUserId);
                        // return cmResearcherService.updateResearcherProperties(eraProperties, $rootScope.currentUser.dacUserId, false);

                        }
                    }
                }
            });
    }

})();
