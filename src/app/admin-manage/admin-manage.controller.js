(function () {
    'use strict';

    angular.module('cmAdminManage')
        .controller('AdminManage', AdminManage);

    /* ngInject */
    function AdminManage($modal, cmConsentService, cmElectionService, $scope) {

        var vm = this;
        vm.electionsList = {'dul': []};

        vm.openCreate = openCreate;     vm.openCancel = openCancel;

        vm.addDul = addDul;
        vm.editDul = editDul;

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
                var electionToUpdate = new Object();
                electionToUpdate.status = 'Canceled';
                electionToUpdate.referenceId = vm.selectedElection.consentId;
                electionToUpdate.electionId = vm.selectedElection.electionId;
                cmElectionService.updateElection(electionToUpdate).$promise.then(function () {
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
                    consent: new Object()
                }
            });

            modalInstance.result.then(function () {//selectedItem - params to apply when the fc was successful
                //what to do if it was accepted
                init();
            }, function () {
                //what to do if the modal was canceled
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

            modalInstance.result.then(function (selectedItem) {//selectedItem - params to apply when the fc was successful
                //what to do if it was accepted
                init();
            }, function () {
                //what to do if the modal was canceled
            });
        }

    }
})();
