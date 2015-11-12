(function () {
    'use strict';

    angular.module('cmRPApplication')
        .controller('RPApplication', RPApplication);

    /* ngInject */
    function RPApplication($state, $scope, $modal, cmRPService, $rootScope) {

        var vm = this;
        vm.$state = $state;
        vm.attestAndSave = attestAndSave;
        $scope.showValidationMessages = false;
        $scope.atLeastOneCheckboxChecked = false;

        $scope.formData = {};

        $scope.$watch("form.step1.$valid", function (value1) {
            if ($state.current.url === "/step1") {
                $scope.step1isValidated = value1;
            }
        });

        $scope.$watch("form.step2.$valid", function (value2) {
            if ($state.current.url === "/step2") {
                $scope.step2isValidated = value2;
            }
        });

        $scope.$watch("form.step3.$valid", function (value3) {
            if ($state.current.url === "/step3") {
                $scope.step3isValidated = value3;
            }
        });

        $rootScope.$on('$stateChangeSuccess', function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        $scope.openCatalog = function() {
            $scope.url = '/#/dataset_catalog';
        };

        $scope.openGWAS = function() {
            $scope.url = '#';
        };

        function attestAndSave() {

            verifyCheckboxes();

            if ($scope.step1isValidated && $scope.step2isValidated && $scope.step3isValidated && $scope.atLeastOneCheckboxChecked) {
                $scope.showValidationMessages = false;
                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'app/modals/data-access-request-modal/data-access-request-modal.html',
                    controller: 'DARModal',
                    controllerAs: 'DARModal',
                    scope: $scope
                });

                modalInstance.result.then(function (value) {
                    if (value) {
                        $state.go('rp_application_confirm');
                    }
                    if (!value) {
                        $scope.problemSavingRequest = true;
                    }
                });
            } else {
                $scope.showValidationMessages = true;
            }
        }


        function verifyCheckboxes() {

            if ($scope.formData.control !== true &&
                $scope.formData.population !== true &&
                $scope.formData.diseases !== true &&
                $scope.formData.methods !== true &&
                $scope.formData.other !== true
            ) {
                $scope.atLeastOneCheckboxChecked = false;
            } else {
                $scope.atLeastOneCheckboxChecked = true;
            }
        }


        //function to process get datasets
        $scope.search_datasets = function (partial) {
            return cmRPService.getAutoCompleteDS(partial);
        };

        //function to process get datasets
        $scope.search_ontologies = function (partial) {
            return cmRPService.getAutoCompleteOT(partial);
        };
    }

})();
