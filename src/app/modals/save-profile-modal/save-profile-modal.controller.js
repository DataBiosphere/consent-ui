(function () {
    'use strict';

    angular.module('cmSaveProfileModal')
        .controller('SaveProfileModal', SaveProfileModal);

    /* ngInject */
    function SaveProfileModal($modalInstance, cmResearcherService, $scope) {
        var vm = this;

        vm.ok = function () {
            $scope.formData.completed =  $scope.completed;
            if($scope.exists){
                cmResearcherService.updateResearcherProperties($scope.formData, $scope.userId, false);
            }else{
                cmResearcherService.createResearcherProperties($scope.formData, $scope.userId, false);
            }
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();
