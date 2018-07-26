(function () {
    'use strict';

    angular.module('cmAuthenticateNih')
        .service('cmAuthenticateNihService', cmAuthenticateNihService);

    /* ngInject */
    function cmAuthenticateNihService() {
        function expirationCount (regDate, expDate) {
            var count = new Date(parseInt(expDate) - parseInt(regDate));
            if (count > 0) {
                return count.getDate();
            } else {
                return 0;
            }
        }

        return {
            expirationCount: function(regDate, expDate) {
                return expirationCount(regDate, expDate);
            }
        };
    }
})();
