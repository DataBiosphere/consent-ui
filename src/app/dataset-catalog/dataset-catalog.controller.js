(function () {

    'use strict';

    angular.module('cmDatasetCatalog')
        .controller('DatasetCatalog', DatasetCatalog);

    /* ngInject */
    function DatasetCatalog($scope, $state, $modal, $rootScope, cmDatasetService, cmAuthenticateService, cmRPService,  USER_ROLES) {

        var vm = this;
        vm.openDelete = openDelete;
        vm.openDisable = openDisable;
        vm.openEnable = openEnable;
        vm.associate = associate;
        vm.showSdul = showSdul;

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
                    vm.dataSetList.catalog = data;
                });
        }

        function showSdul(datasetsDul) {
            $scope.dataset = datasetsDul;
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/translatedDul-modal/translatedDul-modal.html',
                controller: 'TranslatedDulModal',
                controllerAs: 'TranslatedDulModal',
                scope: $scope
            });

            modalInstance.result.then(function () {
            }, function () {
            });
        }

       vm.download = function (objectIdList) {
            cmDatasetService.downloadDataSets(objectIdList).then(function (value) {
                    var isIE = /*@cc_on!@*/false || !!document.documentMode;
                    var blob = new Blob([value.datasets], {type: 'text/plain'});
                    var downloadElement = angular.element('<a/>');
                    downloadElement.css({display: 'none'});
                    angular.element(document.body).append(downloadElement);
                    if (isIE) {
                        downloadElement.attr({
                            href: window.navigator.msSaveOrOpenBlob(blob, 'datasets.tsv'),
                        });
                    } else { 
                     downloadElement.attr({
                        href: (window.URL || window.webkitURL).createObjectURL(blob),
                        target: '_blank',
                        download: 'datasets.tsv'
                    })[0].click();
                  }
                }
            );
        };
        
        

        vm.exportToRequest = function (objectIdList) {
            cmRPService.partialDarFromCatalogPost($rootScope.currentUser.dacUserId, objectIdList).$promise.then(
                function (data) {
                        $rootScope.formData = data;
                        $state.go('rp_application.step1');
                }, function (value) {
                    $modal.open({
                        animation: false,
                        templateUrl: 'app/modals/dataset-catalog-export-modal/dataset-catalog-export-error-modal.html',
                        controller: 'DatasetCatalogExportModal',
                        controllerAs: 'DatasetCatalogExportModal',
                        resolve: {
                            msg: function () {
                                return value.data.message;
                            }
                        }
                    });
                });
        };

        vm.delete = function (datasetId) {
            cmDatasetService.deleteDataset(datasetId, $rootScope.currentUser.dacUserId);
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
                var currentUserId = $rootScope.currentUser.dacUserId;
                cmDatasetService.deleteDataset(datasetId, currentUserId).then(function () {
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

        function associate(datasetId, needsApproval){

            $scope.actionType = 'needsApproval';
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/dataset-approval-modal/dataset-approval-modal.html',
                controller: 'DataSetApprovalModal',
                controllerAs: 'DataSetApprovalModal',
                scope: $scope,
                resolve: {
                    usersAssociation: function (cmDatasetAssociationService) {
                        return cmDatasetAssociationService.getAssociatedAndToAssociateUsers(datasetId);
                    },
                    datasetName: function(){ return datasetId; },
                    needsApproval: function(){ return needsApproval; }
                }
            });

            modalInstance.result.then(function () {
                init();
            });
        }
    }
})();
