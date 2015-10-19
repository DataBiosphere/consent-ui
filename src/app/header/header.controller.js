(function () {
    'use strict';

    angular.module('cmHeader')
        .controller('Header', Header);

    /* ngInject */
    function Header($scope) {

        $scope.status = {
            isopen: false
        };

        $scope.showStatistics = function(roles, rootRoles){
            if(containsOtherThanResearcher(roles, rootRoles)){
                        return true;
            }
            return false;
        }

        function containsOtherThanResearcher(roles, rootRoles){
            var i;
                        if(roles == null){
                          return false;
                        }

            for (i = 0; i < roles.length; i++) {
                if(roles[i].name !== rootRoles.researcher){
                    return true;
                }
            }
            return false;
        }
    }

})();
