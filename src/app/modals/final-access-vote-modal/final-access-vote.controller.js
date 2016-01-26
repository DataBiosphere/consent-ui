(function () {
    'use strict';

    angular.module('cmFinalVoteModal')
        .controller('FinalVoteModal', FinalVoteModal);

    /* ngInject */
    function FinalVoteModal($modalInstance, cmVoteService, vote, cmElectionService, $scope, $state) {

        var vm = this;
        $scope.disableButton = false;
        vm.ok = function () {
           $scope.disableButton = true;
           cmVoteService.updateFinalAccessDarVote($scope.referenceId, vote).$promise.then(
               function () {
                   $scope.electionAccess.status = 'Closed';
                   cmElectionService.updateElection($scope.electionAccess).$promise.then(
                        function(){
                            $state.go('chair_console');
                            $modalInstance.close();
                        }
                    );
               },
              function () {
                   alert("Error while updating final access vote.");
              }
           );
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        vm.singleModel = 0;
        vm.radioModel = '';
        vm.checkModel = {
            admin: false,
            researcher: false
        };

    }

})();

