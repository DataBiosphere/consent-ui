(function () {
    'use strict';

    angular.module('cmSaveProfileModal')
        .controller('SaveProfileModal', SaveProfileModal);

    /* ngInject */
    function SaveProfileModal($modalInstance, cmResearcherService, $scope, $rootScope, cmUserService) {
        var vm = this;

        vm.ok = function () {
            $scope.formData.completed =  $scope.completed;
            if($scope.exists){
                cmResearcherService.updateResearcherProperties($scope.formData, $scope.userId, false).$promise
                .then(function () {
                    updateUser();

                });
            }else{
                cmResearcherService.createResearcherProperties($scope.formData, $scope.userId, false).$promise
                .then(function () {
                     updateUser();
                });
            }
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        function updateUser(){
          if($scope.formData.profileName !== $rootScope.currentUser.displayName){
             var user = {};
             user.displayName = $scope.formData.profileName;
             user.dacUserId =  $rootScope.currentUser.dacUserId;
             cmUserService.updateUserName(user).$promise.then(
                function (data) {
                     $rootScope.setCurrentUser(data);
                });
          }
        }

    }

})();
