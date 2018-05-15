(function () {
    'use strict';

    angular.module('cmHeader')
        .controller('Header', Header);

    /* ngInject */
    function Header($scope, $state, $modal, cmLoginUserService) {

        var vm = this;
        vm.helpMeModal = helpMeModal;
        vm.goToRP = goToRP;

        $scope.status = {
            isopen: false
        };

        $scope.navbarCollapsed = true;
        $scope.roles = cmLoginUserService;

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

    }

})();
