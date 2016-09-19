(function () {
    'use strict';

    angular.module('cmModalUsersEdit')
        .controller('ModalUsersEdit', ModalUsers);

    /* ngInject */
    function ModalUsers($modalInstance, cmUserService, $scope, user, USER_ROLES) {

        $scope.emailPreference = false;

        init();

        function init() {
            $scope.USER_ROLES = USER_ROLES;
            $scope.checkModel = {};
            $scope.user = user;
            $scope.delegateDacUser =  {};
            $scope.delegateDataOwner =  {};
            $scope.delegateMemberRequired = false;
            $scope.newAlternativeUserNeeded = {};
            // this var is used in addRoleRadioDirective

            $scope.from = 'edit';

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

            var wasChairperson =  user.was(USER_ROLES.chairperson);
            $scope.wasMember = user.was(USER_ROLES.member);
            var wasDataOwner = user.was(USER_ROLES.dataOwner);
            var wasResearcher = user.was(USER_ROLES.researcher);

            $scope.$on("changeChairpersonRoleAlert", function (event, arg) {
                $scope.$apply(function () {
                    if (arg.alert) {
                        $scope.changeChairpersonRoleAlert();
                    } else {
                        $scope.closeAlert(1);
                    }
                });
            });

            $scope.memberChanged = function (checkState,role) {
                if($scope.wasMember){
                    if (!checkState) {
                        $scope.searchDACUsers(role).then(
                            function (result) {
                                if(checkNoEmptyDelegateCandidates(result.needsDelegation,result.delegateCandidates,role)){
                                    $scope.delegateMemberRequired = role === USER_ROLES.member ?  result.needsDelegation : false;
                                    $scope.delegateDacUser.delegateCandidates = result.delegateCandidates;
                                    $scope.delegateDacUser.needsDelegation = result.needsDelegation;
                                    return;
                                }
                            });
                    } else {
                        closeNoAvailableCandidatesAlert(role);
                        $scope.delegateDacUser.delegateCandidates = [];
                        $scope.delegateDacUser.needsDelegation = false;
                        $scope.delegateMemberRequired = false;
                    }
                }
            };


            $scope.chairpersonChanged = function (checkState,role) {
                if(wasChairperson){
                    if (!checkState) {
                        $scope.searchDACUsers(role).then(
                            function (result) {
                                if(checkNoEmptyDelegateCandidates(result.needsDelegation,result.delegateCandidates,role)){
                                    $scope.delegateDacUser.delegateCandidates = result.delegateCandidates;
                                    $scope.delegateDacUser.needsDelegation = result.needsDelegation;
                                    return;
                                }
                            });
                    } else {
                        closeNoAvailableCandidatesAlert(role);
                        $scope.delegateDacUser.delegateCandidates = [];
                        $scope.delegateDacUser.needsDelegation = false;
                        $scope.delegateMemberRequired = false;
                    }
                }
            };



            $scope.dataOwnerChanged = function (checkState) {
                if(wasDataOwner){
                    if (!checkState) {
                        $scope.searchDACUsers(USER_ROLES.dataOwner).then(
                            function (result) {
                                if(checkNoEmptyDelegateCandidates(result.needsDelegation,result.delegateCandidates,USER_ROLES.dataOwner)){
                                    $scope.delegateDataOwner.delegateCandidates = result.delegateCandidates;
                                    $scope.delegateDataOwner.needsDelegation = result.needsDelegation;
                                    return;
                                }
                            });
                    } else {
                        closeNoAvailableCandidatesAlert(USER_ROLES.dataOwner);
                        $scope.delegateDataOwner.delegateCandidates = [];
                        $scope.delegateDataOwner.needsDelegation = false;
                    }
                }
            };

            $scope.researcherChanged = function (checkState) {
                if(wasResearcher){
                    if (!checkState) {
                        $scope.changeResearcherRoleAlert();
                    }
                    else {
                        $scope.closeAlert(3);
                    }
                }
            };


            var l = $scope.user.roles.length;
            while (l--) {
                if ($scope.user.roles[l].name === USER_ROLES.admin ) {
                    $scope.emailPreference = !$scope.user.roles[l].emailPreference;
                }
            }
        }

        $scope.searchDACUsers = function (role) {
            return cmUserService.validateDelegation(role,$scope.user).$promise;
        };

        $scope.edit = function (user) {
            var map = {};
            var roles = user.roles;
            for (var i = 0; i < roles.length; i++) {
              if (roles[i].name === USER_ROLES.admin ) {
                roles[i].emailPreference =  !$scope.emailPreference;
                break;
              }
            }

            map.updatedUser = user;
            if($scope.delegateDacUser.needsDelegation){
                map.userToDelegate = JSON.parse($scope.alternativeDACMemberUser);
            }
            if($scope.delegateDataOwner.needsDelegation){
                map.alternativeDataOwnerUser = JSON.parse($scope.alternativeDataOwnerUser);
            }
            cmUserService.updateUser(map).$promise.then(
                function () {
                    $modalInstance.close();
                }, function (reason) {
                    if (reason.status === 400) {
                        $scope.errorOnEdition(reason.data.message);
                    }
                });
        };


        var checkNoEmptyDelegateCandidates = function(needsDelegation,delegateCandidates,role){
            var valid =  needsDelegation === true && delegateCandidates.length === 0 ? false : true;
            if(!valid){
                $scope.errorNoAvailableCandidates(role);
            }
            return valid;
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.$watch('newAlternativeUserNeeded', function(){
            $scope.newUserNeeded = validateNoNewUserIsNeeded();
        }, true);

        var validateNoNewUserIsNeeded = function(){
            for (var key in $scope.newAlternativeUserNeeded){
                if($scope.newAlternativeUserNeeded[key] === true){
                    return true;
                }
            }
            return false;
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

        $scope.changeResearcherRoleAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'danger',
                title: 'Warning!',
                msg: 'By removing the researcher role, the user Data Access Requests will be canceled, and all the elections related to them.',
                alertType: 3
            });
        };

        $scope.errorNoAvailableCandidates = function (role) {
            $scope.newAlternativeUserNeeded[role] = true;
            $scope.alerts.push({
                type: 'danger',
                title: "Edition can't be made!",
                msg: "There are no available users to delegate "+ role.toLowerCase() +" responsibilities, please add a new User.",
                alertType: role
            });
        };


        $scope.errorOnEdition = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'danger',
                title: "Edition can't be made!",
                msg: index,
                alertType: 2
            });
        };

        $scope.closeAlert = function (alertType) {
            var l = $scope.alerts.length;
            var i = 0;
            while(i < l){
                if($scope.alerts[i].alertType === alertType){
                    $scope.alerts.splice(i,1);
                    return;
                }
                i++;
            }
        };

        var closeNoAvailableCandidatesAlert = function (role) {
            var l = $scope.alerts.length;
            var i = 0;
            while(i < l){
                if($scope.alerts[i].alertType === role){
                    $scope.alerts.splice(i,1);
                    $scope.newAlternativeUserNeeded[role] = false;
                    return;
                }
                i++;
            }
        };

        /*****DROPDOWN*****/

        $scope.status = {
            isopen: false
        };

    }

})();
