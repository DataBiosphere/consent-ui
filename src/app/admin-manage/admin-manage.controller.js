(function () {
    'use strict';

    angular.module('cmAdminManage')
        .controller('AdminManage', AdminManage);

    /* ngInject */
    function AdminManage($modal, cmConsentService, cmElectionService, $scope) {

        var vm = this;
        vm.electionsList = {'dul': []};

        vm.openCreate = openCreate;
        vm.openCancel = openCancel;
        vm.openDelete = openDelete;

        vm.addDul = addDul;
        vm.editDul = editDul;

        $scope.sort = function(keyname){
            $scope.sortBy = keyname;   //set the sortBy to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

        init();

        function init() {
            cmConsentService.findConsentManage(vm);
        }

        function openCreate(consentId) {
            $scope.consentId = consentId;
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/create-election-modal/create-modal.html',
                controller: 'ModalCreate',
                controllerAs: 'ModalCreate',
                scope: $scope

            });

            modalInstance.result.then(function () {
                init();
            });
        }

        function openCancel(election) {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/cancel-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                resolve: {
                    election: function () {
                        vm.selectedElection = election;
                    }
                }
            });

            modalInstance.result.then(function () {
                var electionToUpdate = {};
                electionToUpdate.status = 'Canceled';
                electionToUpdate.referenceId = vm.selectedElection.consentId;
                electionToUpdate.electionId = vm.selectedElection.electionId;
                cmElectionService.updateElection(electionToUpdate).$promise.then(function () {
                    init();
                });
            });
        }

        function openDelete(consentId) {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/delete-consent-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal'
            });

            modalInstance.result.then(function () {
                cmConsentService.deleteConsent(consentId).then(function () {
                    init();
                });
            });
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
                init();
            }, function () {
            });
        }

        function editDul(consentId) {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/dul-modal/edit-dul-modal.html',
                controller: 'DULModal',
                controllerAs: 'DULModal',
                resolve: {
                    consent: function (cmConsentService) {
                        return cmConsentService.findConsent(consentId);
                    }
                }
            });

            modalInstance.result.then(function () {
                init();
            }, function () {
            });
        }

    }
})();
