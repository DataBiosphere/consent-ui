(function () {

    'use strict';

    angular.module('cmDatasetCatalog')
        .controller('DatasetCatalog', DatasetCatalog);

    /* ngInject */
    function DatasetCatalog($scope ,$modal,$rootScope,cmDatasetService,cmTranslateService,cmAuthenticateService, USER_ROLES) {

        var vm = this;
        vm.dataSetList = {'catalog': [], 'dictionary': []};
        $scope.pagination = {
            current: 1
        };
        init();

        function init() {
            $scope.checkMod = {}
            $scope.objectIdList=[];

            $scope.isAdmin = cmAuthenticateService.isAuthorized(USER_ROLES.admin,$rootScope.currentUser.roles);

            cmDatasetService.findDictionary().then(
                function (data) {
                    vm.dataSetList['dictionary'] = data;
                });

            cmDatasetService.findDataSets($rootScope.currentUser.dacUserId).then(
                function (data) {
                    vm.dataSetList['catalog'] = data;
                    vm.dataSetList.catalog.forEach( function (arrayItem)
                                 {
                                   cmTranslateService.translate("sampleset",arrayItem.useRestriction).then(function(data) {
                                   arrayItem.useRestriction = data;
                                 });
                        arrayItem.useRestriction = "Loading...";  // Necessary ?
                     });
                });
        }

        vm.download = function (objectIdList) {
            cmDatasetService.downloadDataSets(objectIdList).then(function (value) {
                    var blob = new Blob([value.datasets], { type : 'text/plain' });
                    var downloadElement = angular.element('<a/>');
                    downloadElement.css({display: 'none'});
                    angular.element(document.body).append(downloadElement);
                    downloadElement.attr({
                        href:  (window.URL || window.webkitURL).createObjectURL( blob ),
                        target: '_blank',
                        download: 'datasets.tsv'
                    })[0].click();
                }, function (reason) {
                }
            )};


         vm.delete = function (datasetId) {
                cmDatasetService.deleteDataset(datasetId);
              };

                 vm.openDelete = openDelete;
                 function openDelete(datasetId)  {

                     var modalInstance = $modal.open({
                         animation: false,
                         templateUrl: 'app/modals/delete-dataset-modal.html',
                         controller: 'Modal',
                         controllerAs: 'Modal'
                     });

                     modalInstance.result.then(function () {
                         cmDatasetService.deleteDataset(datasetId).then(function () {
                         init();
                         });
                     });
                 }







    }
})();
