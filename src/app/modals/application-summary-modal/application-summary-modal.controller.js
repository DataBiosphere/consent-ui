(function () {
    'use strict';

    angular.module('cmApplicationModal')
        .controller('ApplicationModal', ApplicationModal);

    /* ngInject */
    function ApplicationModal($modalInstance, $scope, darDetails, calledFromAdmin, cmElectionService, dar_id) {

        $scope.calledFromAdmin = calledFromAdmin;
        $scope.summary = darDetails;
        var vm = this;

        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        vm.downloadDetail = function downloadDataSetVotesDetail(){
            cmElectionService.downloadDatasetVotesForDARElection(dar_id);
        };

        vm.singleModel = 0;
        vm.radioModel = '';
        vm.checkModel = {
            admin: false,
            researcher: false
        };

    }

})();
