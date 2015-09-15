(function () {
    'use strict';

    var consentModule = angular
        .module('ConsentManagement')
        .config(logConfig)
        .config(routeConfig)
        .config(httpConfig)
        .config(compileProvider)
        .constant("apiUrl", "https://consent-ci.broadinstitute.org/");

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
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }




})();
