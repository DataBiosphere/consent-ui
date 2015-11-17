(function () {
    'use strict';

    angular.module('cmHeader')
        .controller('Header', Header);

    /* ngInject */
    function Header($scope, $modal) {

        var vm = this;
        vm.helpMeModal = helpMeModal;


        $scope.status = {
            isopen: false
        };


        function helpMeModal() {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/help-modal/help-modal.html',
                controller: 'HelpModal',
                controllerAs: 'HelpModal'
            });

            modalInstance.result.then(function () {
            }, function () {
            });
        }

        $scope.showStatistics = function(roles, rootRoles){
            if(containsOtherThanResearcher(roles, rootRoles)){
                        return true;
            }
            return false;
        };

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
