(function () {
    'use strict';

    angular.module('cmElectionTimeoutModal')
        .controller('ElectionTimeoutModal', ElectionTimeoutModal);

    /* ngInject */
    function ElectionTimeoutModal($modalInstance, $scope, cmElectionTimeoutService, $rootScope) {
        var vm = this;
        $scope.disableButton = false;
        $scope.timeout.newTimeout = $scope.timeout.amountOfDays;
        $scope.setTimeout = setTimeout;
        setTimeout();
        function setTimeout() {
            if($scope.timeout.displayName.indexOf("Default") === 0) {
                $scope.disableButton = false;
            } else if($scope.timeout.newTimeout === $scope.timeout.amountOfDays){
                $scope.disableButton = true;
            } else {
                $scope.disableButton = false;
            }

        }


        vm.ok = function () {
            var approvalExpirationTime = {};
            approvalExpirationTime.userId = $rootScope.currentUser.dacUserId;
            approvalExpirationTime.id = $scope.timeout.id;
            approvalExpirationTime.amountOfDays = $scope.timeout.newTimeout;
            if ($scope.timeout.id === null) {
                cmElectionTimeoutService.createApprovalExpirationTime(approvalExpirationTime).$promise.then(
                    function () {
                        $modalInstance.close(true);
                    }, function () {
                        $modalInstance.close(false);
                    });
            } else {
                cmElectionTimeoutService.updateApprovalExpirationTime(approvalExpirationTime).$promise.then(
                    function () {
                        $modalInstance.close(true);
                    }, function () {
                        $modalInstance.close(false);
                    });
            }

        };


        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


    }
})();

