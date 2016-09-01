(function () {

    'use strict';

    angular.module('cmResearcherReview')
        .controller('ResearcherReview', ResearcherReview);

    /* ngInject */
    function ResearcherReview($stateParams, cmResearcherService, $scope, cmUserService, $state, $modal) {

        var dacUserId = $stateParams.dacUserId;
        $scope.status = 'pending';
        $scope.researcher = true;
        init();

        function initEnableVoteButton(){
            if($scope.userRoleStatus.status !== undefined && $scope.status !== null){
                $scope.enableVoteButton = false;
            }else{
                $scope.enableVoteButton = true;
            }
        }

        $scope.setEnableVoteButton = function(){
            if($scope.status ===  $scope.userRoleStatus.status && $scope.rationale === $scope.userRoleStatus.rationale){
                $scope.enableVoteButton = false;
            }else{
                $scope.enableVoteButton = true;
            }
        };

        function init(){
             if(dacUserId !== null) {
                findUserStatus();
                findPropertiesByResearcher();
             }
        }

        $scope.logStatus = function () {
          $scope.userRoleStatus.status = $scope.status;
          $scope.isNew = true;
          $scope.userRoleStatus.rationale = $scope.rationale;
           cmUserService.registerStatus($scope.userRoleStatus, dacUserId).$promise
                .then(
                    function () {
                        var modalInstance = $modal.open({
                            animation: false,
                            templateUrl: 'app/modals/confirmation-modal.html',
                            controller: 'Modal',
                            controllerAs: 'Modal',
                            scope: $scope
                        });
                        modalInstance.result.then(function () {
                           $state.go('admin_console');
                        });
                    },
                    //error
                    function () {
                        alert("Error updating vote.");
                    });
        };

        function findUserStatus(){
         cmUserService.findUserStatus(dacUserId).$promise.then(
             function (data) {
                $scope.userRoleStatus = data;
                $scope.rationale = $scope.userRoleStatus.rationale;
                $scope.status = $scope.userRoleStatus.status;
                initEnableVoteButton();
             });
        }

        function findPropertiesByResearcher(){
          $scope.formData = cmResearcherService.getPropertiesByResearcherId(dacUserId).then(
          function (data) {
            if(data.isThePI !== undefined){
               data.isThePI = JSON.parse(data.isThePI);
               if(data.isThePI === true){ data.piValue = 'Yes';}
               else if(data.isThePI === false){data.piValue = 'No';}
           }
           if(data.havePI !== undefined){
              data.havePI = JSON.parse(data.havePI);
              if(data.havePI === true){ data.havePIValue = 'Yes';}
              else if(data.havePI === false){data.havePIValue = 'No';}
           }
           $scope.formData = data;
           });
        }
    }

})();
