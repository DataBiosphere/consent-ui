(function () {
    'use strict';

    angular.module('cmModalUsersEdit')
        .controller('ModalUsersEdit', ModalUsers);

    /* ngInject */
    function ModalUsers($modalInstance, cmUserService, $scope, user, enableRolEdit, USER_ROLES) {

        var vm = this;
        init();

        function init() {
            $scope.USER_ROLES = USER_ROLES;
            $scope.checkModel = {};
            $scope.user = user;
            $scope.enableRolEdit = enableRolEdit.open;
            var i = user.roles.length;
            while (i--) {
                user.roles[i].name = user.roles[i].name.toUpperCase();
            }
            i = user.roles.length;
            while (i--) {
                var rolName = user.roles[i].name.toUpperCase();
                $scope.checkModel[rolName] = true;
            }

            $scope.originalRoles = user.roles.slice();

            $scope.user.was = function (rol) {
                var i = $scope.originalRoles.length;
                while (i--) {
                    if ($scope.originalRoles[i].name === rol) {
                        return true;
                    }
                }
                return false;
            };


            $scope.$on("changeChairpersonRoleAlert", function (event, arg) {
                $scope.$apply(function () {
                    if (arg.alert) {
                        $scope.changeChairpersonRoleAlert();
                    } else {
                        $scope.closeAlert();
                    }
                });
            });

        }

        vm.edit = function (user) {
            cmUserService.updateUser(user).$promise.then(
                function () {
                    $modalInstance.close();
                }, function (reason) {
                    if (reason.status === 400) {
                        if (reason.data.message === "There must be at least one Admin in the system.") {
                            $scope.noAdminAlert();
                        } else {
                            $scope.duplicateEmailAlert();
                        }
                    }
                });
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        /*****ALERTS*****/

        $scope.alerts = [];


        $scope.changeChairpersonRoleAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'danger',
                title: 'Warning!',
                msg: 'In order to have only one Chairperson in the system, the current Chairperson is going to become an Alumni.',
                alertType: 1
            });
        };

        $scope.duplicateEmailAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'danger',
                title: 'Conflicts to resolve!',
                msg: 'There is a user already registered with this google account.',
                alertType: 2
            });
        };

        $scope.noAdminAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'danger',
                title: "Edition can't be made!",
                msg: 'There must be at least one Admin in the system.',
                alertType: 1
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





