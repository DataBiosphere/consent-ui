(function () {
    'use strict';

    angular.module('cmAuthenticateNih')
        .service('cmAuthenticateNihService', cmAuthenticateNihService);

    /* ngInject */
    function cmAuthenticateNihService(NIHDeleteAccount, NIHVerifyAccount, FcVerifyAccount, fireCloudUrl, FcAuthenticateNIH) {

        function verifyFcuser() {
            return FcVerifyAccount.get(fireCloudUrl).$promise
            //     .then(
            // () => true, // is Firecloud user
            //     () => false // is not a Firecloud user
            // );
        }

        function registerUserToFc() {
            // register user to firecloud orchestration behind courtains
        }

        function verifyNihWithFc(token) {
            return FcAuthenticateNIH.post({},{jwt: token}).$promise;
            // return NIHVerifyAccount.post({userId: userId},{jwt: token}).$promise;
        }


        function verifyNihToken(token, userId) {
            return NIHVerifyAccount.post({userId: userId, token: token},{}).$promise;
        }

        function saveNihAccount(nihAccount, userId) {
            // save obtained data to our backend
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
            verifyFcuser: function () {
                return verifyFcuser();
            },
            verifyNihWithFc: function (token) {
              return verifyNihWithFc(token);
            },
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
