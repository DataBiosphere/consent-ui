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

        function expirationCount (expDate) {
            var currentDate = new Date().getTime();
            var millisecondsPerDay = 24 * 60 * 60 * 1000;
            var count = (treatAsUTC(parseInt(expDate)) - treatAsUTC(currentDate)) / millisecondsPerDay;

            if (count > 0) {
                return Math.round(count);
            } else {
                return -1;
            }
        }

        function treatAsUTC(date) {
            var result = new Date(date);
            result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
            return result;
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
