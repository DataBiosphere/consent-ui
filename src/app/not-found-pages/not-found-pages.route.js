(function () {
    'use strict';

    angular
        .module('cmNotFound')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('not_found', {
                name: 'not_found',
                url: '/common-404',
                templateUrl: 'app/not-found-pages/common-404.html',
                controller: 'NotFoundController',
                controllerAs: 'NotFoundController',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .state('access_review_not_found', {
                name: 'access_review_not_found',
                url: '/dar_election-404',
                templateUrl: 'app/not-found-pages/election-404.html',
                controller: 'NotFoundController',
                controllerAs: 'NotFoundController',
                data: {
                    authorizedRoles: [USER_ROLES.member, USER_ROLES.chairperson]
                },
                resolve: {
                    electionTypeObject: function () {
                        return {
                            electionType: 'DataAccess',
                        };
                    }
                }
            })
            .state('dul_review_not_found', {
                name: 'dul_review_not_found',
                url: '/dul_election-404',
                templateUrl: 'app/not-found-pages/election-404.html',
                controller: 'NotFoundController',
                controllerAs: 'NotFoundController',
                data: {
                    authorizedRoles: [USER_ROLES.member, USER_ROLES.chairperson]
                },
                resolve: {
                    electionTypeObject: function () {
                        return {
                            electionType: 'DataUseLimitations',
                        };
                    }
                }
            });
    }

})();
