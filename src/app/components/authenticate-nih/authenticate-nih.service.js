(function () {
    'use strict';

    angular.module('cmAuthenticateNih')
        .service('cmAuthenticateNihService', cmAuthenticateNihService);

    /* ngInject */
    function cmAuthenticateNihService(NIHDeleteAccount, NIHVerifyAccount, $window) {

        function verifyNihToken(token, userId) {
            return NIHVerifyAccount.update({userId: userId, token: token},{}).$promise;
        }

        function eliminateAccount (userId) {
            return NIHDeleteAccount.delete({userId: userId}).$promise;
        }

        function redirectToNihLogin(origin) {
            var landingUrl = "http://mock-nih.dev.test.firecloud.org/link-nih-account/index.html?redirect-url=http://localhost:443/#/"+ origin +"?token%3D%7Btoken%7D";
            $window.location.href = landingUrl;
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
            },
            redirectToNihLogin: function (origin) {
                return  redirectToNihLogin(origin);
            }
        };
    }
})();
