(function () {
    'use strict';

    angular.module('cmAdminManage')
        .controller('AdminManage', AdminManage);

    /* ngInject */
    function AdminManage($modal, cmConsentService, cmElectionService, $scope) {

        var vm = this;
        vm.electionsList = { 'dul': [] };

        vm.openCreate = openCreate;
        vm.openCancel = openCancel;
        vm.openDelete = openDelete;
        vm.openArchive = openArchive;

        vm.addDul = addDul;
        vm.editDul = editDul;

        init();

        function init() {
            cmConsentService.findConsentManage(vm);
        }

        function openCreate(election) {
            $scope.consentId = election.consentId;
            $scope.election = election;
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/create-election-modal/create-modal.html',
                controller: 'ModalCreate',
                controllerAs: 'ModalCreate',
                scope: $scope

            });

            modalInstance.result.then(function () {
                if (election.electionStatus == 'Closed' && !election.archived) {
                    updateElection(election.electionStatus, election.consentId, election.electionId, true);
                } else {
                    init();
                }


            });
        }

        function openCancel(election) {
            $scope.electionArchived = true;
            $scope.electionType = 'dul';
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/cancel-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope,
                resolve: {
                    election: function () {
                        vm.selectedElection = election;
                    }
                }
            });
            modalInstance.result.then(function ($scope) {
                updateElection('Canceled', vm.selectedElection.consentId, vm.selectedElection.electionId, $scope.electionArchived);

            });
        }

        function updateElection(status, consentId, electionId, archived) {
            var electionToUpdate = {};
            electionToUpdate.status = status;
            electionToUpdate.referenceId = consentId;
            electionToUpdate.electionId = electionId;
            electionToUpdate.archived = archived;
            cmElectionService.updateElection(electionToUpdate).$promise.then(function () {
                init();
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


        function openArchive(election) {
            $scope.status = election.electionStatus;
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/archive-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });

            modalInstance.result.then(function () {
                updateElection(election.electionStatus === 'Open' ? 'Canceled' : election.electionStatus,
                    election.consentId, election.electionId, true);

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
