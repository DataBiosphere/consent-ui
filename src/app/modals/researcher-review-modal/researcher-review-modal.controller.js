(function () {
    'use strict';

    angular.module('cmSaveUserStatusModal')
        .controller('SaveUserStatusModal', SaveUserStatusModal);

    /* ngInject */
    function SaveUserStatusModal($modalInstance, cmUserService, $scope) {
        var vm = this;

        vm.ok = function () {
          cmUserService.registerStatus($scope.userRoleStatus , $scope.userId);
          $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();
