(function () {
    'use strict';

    angular.module('cmHelpModal')
        .controller('HelpModal', HelpModal);


    /* ngInject */
    function HelpModal($modalInstance, $state, cmHelpMeReportService, $rootScope, $scope) {

        var vm = this;
        $scope.disableButton = false;

        vm.ok = function (record) {
            $scope.disableButton = true;
            record.userId = $rootScope.currentUser.dacUserId;
            cmHelpMeReportService.createHelpMeReport(record).$promise.then(
                function success() {
                    $modalInstance.close();
                    $state.go('help_me');
                });
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
})();
