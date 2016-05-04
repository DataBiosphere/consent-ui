(function () {
    'use strict';

    angular.module('cmAdminConsole')
        .controller('AdminConsole', AdminConsole);

    /* ngInject */
    function AdminConsole($modal, $state, apiUrl, cmPendingCaseService, cmElectionService, $scope, cmElectionTimeoutService) {

        var vm = this;
        vm.addDul = addDul;
        vm.addUser = addUser;
        vm.addDataSets = addDataSets;
        vm.downloadUrl = apiUrl + "dataset/sample";
        vm.dULUnreviewedCases = 0;
        vm.dARUnreviewedCases = 0;
        vm.addOntology = addOntology;

        init();

                function init() {
            cmPendingCaseService.findDARUnReviewed(vm);
            cmPendingCaseService.findConsentUnReviewed(vm);
        }

        function addDul() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/dul-modal/add-dul-modal.html',
                controller: 'DULModal',
                controllerAs: 'DULModal',
                resolve: {
                    consent: {}
                }
            });

            modalInstance.result.then(function () {
                $state.go('admin_manage');
            }, function () {
            });
        }

        function addUser() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/modal-users/add-user/add-user-modal.html',
                controller: 'ModalUsersAdd',
                controllerAs: 'ModalUsersAdd'
            });

            modalInstance.result.then(function () {
                $state.go('admin_users');
            }, function () {
            });
        }

        function addDataSets() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/dataset-modal/dataset-modal.html',
                controller: 'DataSetModal',
                controllerAs: 'DataSetModal'
            });

            modalInstance.result.then(function () {
                $state.go('dataset_catalog');
            }, function () {
            });
        }

        vm.setTimeout = function setTimeout() {
            cmElectionService.isDataSetElectionOpen().$promise.then(function (data) {
                if(data.open === true){
                    $scope.alert = {};
                    $scope.alert.title = "Data Owner election Timeout value can't be updated because there are open elections.";
                }else{
                    $scope.alert = null;
                }
                cmElectionTimeoutService.findApprovalExpirationTime().$promise.then(function(data){
                    $scope.timeout = data;
                    var modalInstance = $modal.open({
                        animation: false,
                        templateUrl: 'app/modals/election-timeout-modal/election-timeout-modal.html',
                        controller: 'ElectionTimeoutModal',
                        controllerAs: 'ElectionTimeoutModal',
                        scope: $scope
                    });

                    modalInstance.result.then(function () {
                        $state.go('admin_console');
                    }, function () {
                    });
                });


            });
        };

        function addOntology() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/add-ontologies/add-ontologies.html',
                controller: 'AddOntologyModal',
                controllerAs: 'AddOntologyModal',
                resolve: {
                              ontologyTypes:  function (cmOntologyService) {
                                     return cmOntologyService.getOntologyTypes();
                                  }
                          }
            });

            modalInstance.result.then(function () {
                $state.go('manage_ontologies');
            }, function () {
            });
        }

    }

})();
