(function () {
    'use strict';

    angular.module('cmAuthenticateNih')
        .service('cmAuthenticateNihService', cmAuthenticateNihService);

    /* ngInject */
    function cmAuthenticateNihService(NIHDeleteAccount, NIHVerifyAccount) {

        function verifyNihToken(token, userId) {
            return NIHVerifyAccount.post({userId: userId, token: token},{}).$promise;
        }

        function eliminateAccount (userId) {
            return NIHDeleteAccount.delete({userId: userId}).$promise;
        }

        function expirationCount (regDate, expDate) {
            var count = new Date(parseInt(expDate) - parseInt(regDate));
            if (count > 0) {
                return count.getDate();
            } else {
                return 0;
            }
        }

        return {
            verifyNihToken: function (token, userId) {
                return verifyNihToken(token, userId);
            },
            expirationCount: function (regDate, expDate) {
                return expirationCount(regDate, expDate);
            },
            eliminateAccount: function (userId) {
                return eliminateAccount(userId);
            }
        };
    }
})();
