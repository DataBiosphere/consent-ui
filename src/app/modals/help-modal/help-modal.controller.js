(function () {
    'use strict';

    angular.module('cmHelpModal')
        .controller('HelpModal', HelpModal);


    /* ngInject */
    function HelpModal($modalInstance, $scope, $state) {

        var vm = this;

        vm.ok = function () {
            $modalInstance.close();
            $state.go('help_me');

        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


        /*****ALERTS*****/

        $scope.alerts = [];

        $scope.success = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'success',
                title: 'Thanks for helping us!',
                msg: 'Your comment was successfully sent. ',
                alertType: 1
            });
        };

        $scope.failure = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'danger',
                title: 'Error!',
                msg: "There has been a problem, your comment wasn't sent.",
                alertType: 2
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };


    }
})();
