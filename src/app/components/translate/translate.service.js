(function () {
    'use strict';

    angular.module('cmTranslate')
        .service('cmTranslateService', cmTranslateService);

    /* ngInject */
    function cmTranslateService($http, ontologyApiUrl) {

        function translate(purpose, UseRestriction) {
                      var promise =  $http({
                           url: ontologyApiUrl+
                           +purpose,
                           method: "POST",
                           data: UseRestriction
                       })
                       .then(function(response) {
                               return response.data;
                       });
                       return promise;
               }

              return{
                translate: function(purpose,UseRestriction) {
                return translate(purpose,UseRestriction);
            }
        };
    }
})();
