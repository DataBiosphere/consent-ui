(function () {
    'use strict';

    angular.module('cmDataSetApprovalModal')
        .controller('DataSetApprovalModal', DataSetApprovalModal);

    /* ngInject */
    function DataSetApprovalModal($modalInstance, $scope, usersAssociation, datasetName, needsApproval, cmDatasetAssociationService, cmDatasetService) {

        var vm = this;
        $scope.updatedNeedsApproval;
        $scope.alert = {};
        $scope.alert.show = false ;


        needsApproval ? $scope.updatedNeedsApproval = true : $scope.updatedNeedsApproval = false
        (usersAssociation.associated_users === undefined || usersAssociation.associated_users.length == 0) ? $scope.isUpdate = false : $scope.isUpdate = true;
        $scope.selectedclients = usersAssociation.associated_users.map(function (user){
                 return { id: user.dacUserId , name: user.displayName+" : "+user.email};});

        $scope.availableclients = usersAssociation.not_associated_users.map(function (user){
                 return { id: user.dacUserId , name: user.displayName+" : "+user.email};});


        $scope.availableToCompare = $scope.selectedclients.slice();
        $scope.isModified = false;
        if($scope.updatedNeedsApproval){
            $scope.needsApprovalToCompare = true;
        }else {
            $scope.needsApprovalToCompare = false;

         }

        vm.submit = function () {
            if(needsApproval !== $scope.updatedNeedsApproval){
            cmDatasetService.reviewDataSet(datasetName, $scope.updatedNeedsApproval).then(function () {
              createOrUpdateAssociations();
              }, function(reason){
                   showAlert();
              });
          }else{
             createOrUpdateAssociations();
            }
         };

         function showAlert(){
                    $scope.alert.show = true;
                    $scope.alert.title = "Server Error:";
                    $scope.alert.warning = "Please try again later.";
                    $scope.alert.type = "danger";
                    $scope.alert.msg = "There was an error creating the associations.";
                 }


        function createOrUpdateAssociations(){
        var userIdList = $scope.selectedclients.map(function(user){
              return user.id;});
                      if($scope.isUpdate){
                               cmDatasetAssociationService.updateDatasetAssociations(datasetName, userIdList).then(
                                   function () {
                                          $modalInstance.close();
                                   }, function (reason) {
                                           showAlert();
                                   });
                     } else{
                               cmDatasetAssociationService.createDatasetAssociations(datasetName, userIdList).then(
                                   function () {
                                           $modalInstance.close();
                                             }, function (reason) {
                                                    showAlert();
                                   });
                       }
              }

        $scope.checkInput = function(){
                    if($scope.needsApprovalToCompare ===  $scope.updatedNeedsApproval){
                       $scope.needsApprovalModified = false;
                    }else{
                          $scope.needsApprovalModified = true;
                    }

                    if($scope.needsApprovalModified && ( $scope.updatedNeedsApproval && $scope.selectedclients.length > 0||
                    (!$scope.updatedNeedsApproval))){
                         return false;
                    }
                    if(  (($scope.isModified && $scope.updatedNeedsApproval && $scope.selectedclients.length > 0 ) ||
                    (!$scope.updatedNeedsApproval && $scope.isModified))  ){
                         return false;
                    }
                          return true;
                 };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.moveItem = function(item, from, to) {
            var idx=from.indexOf(item);
            if (idx !== -1) {
                from.splice(idx, 1);
                to.push(item);
            }
            if(JSON.stringify($scope.availableToCompare)===JSON.stringify($scope.selectedclients)){
                            $scope.isModified = false;
                        }else{
                           $scope.isModified = true;
                        }
          };
    }

    })();

