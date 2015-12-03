(function () {

    'use strict';

    angular.module('cmDatasetCatalog')
        .controller('DatasetCatalog', DatasetCatalog);

    /* ngInject */
    function DatasetCatalog($scope, $modal, $rootScope, cmDatasetService, cmAuthenticateService, USER_ROLES) {

        var vm = this;
        vm.openDelete = openDelete;
        vm.openDisable = openDisable;
        vm.openEnable = openEnable;
        $scope.actionType = null;

        vm.dataSetList = {'catalog': [], 'dictionary': []};
        $scope.pagination = {
            current: 1
        };
        init();

        function init() {
            $scope.checkMod = {};
            $scope.objectIdList = [];

            $scope.isAdmin = cmAuthenticateService.isAuthorized(USER_ROLES.admin, $rootScope.currentUser.roles);
            $scope.isResearcher =  cmAuthenticateService.isAuthorized(USER_ROLES.researcher, $rootScope.currentUser.roles);
            cmDatasetService.findDictionary().then(
                function (data) {
                    vm.dataSetList.dictionary = data;
                });

            cmDatasetService.findDataSets($rootScope.currentUser.dacUserId).then(
                function (data) {
                    vm.dataSetList['catalog'] = data;
                });
        }

        vm.download = function (objectIdList) {
            cmDatasetService.downloadDataSets(objectIdList).then(function (value) {
                    var blob = new Blob([value.datasets], {type: 'text/plain'});
                    var downloadElement = angular.element('<a/>');
                    downloadElement.css({display: 'none'});
                    angular.element(document.body).append(downloadElement);
                    downloadElement.attr({
                        href: (window.URL || window.webkitURL).createObjectURL(blob),
                        target: '_blank',
                        download: 'datasets.tsv'
                    })[0].click();
                }, function () {
                }
            );
        };


        vm.delete = function (datasetId) {
            cmDatasetService.deleteDataset(datasetId);
        };


        function openDelete(datasetId) {

            $scope.actionType = 'delete';
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/delete-dataset-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });

            modalInstance.result.then(function () {
                cmDatasetService.deleteDataset(datasetId).then(function () {
                    init();
                });
            });
        }


        function openDisable(datasetId) {

            $scope.actionType = 'disable';
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/delete-dataset-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });

            modalInstance.result.then(function () {
                cmDatasetService.disableDataset(datasetId, false).then(function () {
                    init();
                });
            });
        }


        function openEnable(datasetId) {

            $scope.actionType = 'enable';
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/delete-dataset-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });

            modalInstance.result.then(function () {
                cmDatasetService.disableDataset(datasetId, true).then(function () {
                    init();
                });
            });
        }



    }
})();
