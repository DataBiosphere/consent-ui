(function () {
    'use strict';

    angular.module('cmHeader')
        .controller('Header', Header);

    /* ngInject */
    function Header($scope, $state, $modal) {

        var vm = this;
        vm.helpMeModal = helpMeModal;
        vm.goToRP = goToRP;

        $scope.status = {
            isopen: false
        };

        function goToRP() {
            $state.go('rp_application.step1', {}, { reload: true });
        }

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
            if(containsOtherThanResearcherAndDataOwner(roles, rootRoles)){
                return true;
            }
            return false;
        };

        function containsOtherThanResearcherAndDataOwner(roles, rootRoles){
            var i;
            if(roles == null){
                return false;
            }
            for (i = 0; i < roles.length; i++) {
                if(roles[i].name !== rootRoles.researcher && roles[i].name !== rootRoles.dataOwner){
                    return true;
                }
            }
            return false;
        }
    }

})();
