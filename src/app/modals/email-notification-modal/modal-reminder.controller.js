(function () {
    'use strict';

    angular.module('cmNotificationModal')
        .controller('ModalReminder', ModalReminder);

    /* ngInject */
    function ModalReminder($modalInstance, $scope, msg, messageType, title) {
        var vm = this;
        $scope.msg = msg;
        $scope.messageType = messageType;
        $scope.title = title;
        $scope.disableButton = false;
        vm.ok = function () {
            $modalInstance.dismiss('cancel');
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

    }

})();
