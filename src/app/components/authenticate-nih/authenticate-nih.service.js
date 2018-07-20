(function () {
    'use strict';

    angular.module('cmAuthenticateNih')
        .service('cmAuthenticateNihService', cmAuthenticateNihService);

    /* ngInject */
    function cmAuthenticateNihService(NIHAccountLinkResource ,ERARegisterResearcher) {

        function setERAbyUserId (eraToken) {
            // return NIHAccountLinkResource.get({userId: '3333', eraToken:eraToken});
            return ERARegisterResearcher.post({userId: '3333', eraToken:eraToken});
        }

        function getERAStatusByUserId (userId){
            return "return is registered, date, remainingDays";
        }

        return {
            setERAbyUserId: function(token) {
                return setERAbyUserId(token);
            },
            setERAdata: function(userId) {
                return getERAStatusByUserId(userId);
            }
        };
    }
})();
