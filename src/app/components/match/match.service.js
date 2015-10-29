(function () {
    'use strict';

    angular.module('cmMatch')
        .service('cmMatchService', cmMatchService);

    /* ngInject */
    function cmMatchService(MatchResource) {

        function findMatch(consentId, purposeId){
            return MatchResource.get({consentId: consentId, purposeId: purposeId}).$promise;;
        }

        return{
            findMatch: function(consentId, purposeId) {
                return findMatch(consentId, purposeId);
            }
        }
    }

})();
