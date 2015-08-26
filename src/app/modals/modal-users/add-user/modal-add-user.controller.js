(function () {
    'use strict';

    angular.module('cmModalUsersAdd')
        .controller('ModalUsersAdd', ModalUsers);

    /* ngInject */
    function ModalUsers($modalInstance, cmUserService, $scope) {

        var vm = this;
        init();

        function init() {
        $scope.user = new Object();
        $scope.user.roles = [];
        $scope.checkModel = new Object();

           $scope.$on("changeChairpersonRoleAlert", function (event, arg) {
                                                     $scope.$apply(function () {
                                                     if(arg.alert){
                                                       $scope.changeChairpersonRoleAlert();
                                                     }else{
                                                       $scope.closeAlert();
                                                     }
                                                    });
                                                   });
            }
        vm.ok = function (user) {
            cmUserService.postUser(user).$promise.then(
                function (value) {
                    $modalInstance.close();
                }, function (value) {
                    $scope.duplicateNameAlert(0);
                });

        };


        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


        /*****ALERTS*****/

        $scope.alerts = [];
        $scope.duplicateNameAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'danger',
                title: 'Conflicts to resolve!',
                msg: 'There is a user already registered with this google account.',
                alertType: 1
            });
        };

        $scope.changeChairpersonRoleAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'danger',
                title: 'Warning!',
                msg: 'In order to have only one Chairperson in the system, the current Chairperson is going to become an Alumni.',
                alertType: 2
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        /*****DROPDOWN*****/

        $scope.status = {
            isopen: false
        };


    }

})();





