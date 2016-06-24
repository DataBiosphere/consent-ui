(function () {
    'use strict';

    angular
        .module('ConsentManagement')
        .config(logConfig)
        .config(routeConfig)
        .config(httpConfig)
        .config(compileProvider);

    /* ngInject */
    function logConfig($logProvider) {
        $logProvider.debugEnabled(true);
    }

    /* ngInject */
    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.otherwise("components/HtmlResource/404.html");
    }

    /* ngInject */
    function compileProvider($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    }

    /* ngInject */
    function httpConfig($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = false;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get.Pragma = 'no-cache';
    $httpProvider.defaults.headers.get.Expires = -1;

    }

})();
