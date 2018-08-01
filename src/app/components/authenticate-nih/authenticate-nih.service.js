(function () {
    'use strict';

    angular.module('cmAuthenticateNih')
        .service('cmAuthenticateNihService', cmAuthenticateNihService);

    /* ngInject */
    function cmAuthenticateNihService(NIHDeleteAccount) {
        function expirationCount (regDate, expDate) {
            var count = new Date(parseInt(expDate) - parseInt(regDate));
            if (count > 0) {
                return count.getDate();
            } else {
                return 0;
            }
        }

        function eliminateAccount (userId) {
            //            return ResearcherNihResource.update({userId: userId, token: researcherProperties.eraToken}, researcherProperties).$promise;
            return NIHDeleteAccount.delete({userId: userId}).$promise;
        }

        return {
            expirationCount: function (regDate, expDate) {
                return expirationCount(regDate, expDate);
            },
            eliminateAccount: function (userId) {
                return eliminateAccount(userId);
            }
        };
    }
})();
