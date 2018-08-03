(function () {
    'use strict';

    angular.module('cmRPApplication')
        .controller('RPApplication', RPApplication);

    /* ngInject */
    function RPApplication($state, $scope, $modal, cmRPService, $rootScope, gwasUrl, cmResearcherService, cmAuthenticateNihService, $window) {
        var vm = this;
        var persistDarInfo = $state.params.persistInfo;
        vm.token = $state.params.token !== undefined ? $state.params.token : null;
        getNihToken(vm.token);
        vm.attestAndSave = attestAndSave;
        vm.partialSave = partialSave;
        vm.redirectToNihLogin = redirectToNihLogin;
        $scope.showValidationMessages = false;
        $scope.atLeastOneCheckboxChecked = false;
        $scope.completed = true;
        init();

        function init() {
            $scope.formData = {};
            Object.defineProperty($scope.formData, "add", {
                set : function (property, value) {$scope.formData.property = value;}
            });

            if ($rootScope.formData !== undefined && $rootScope.formData.userId !== undefined) {
                $scope.formData = $rootScope.formData;
                $rootScope.formData = {};
            }

            cmResearcherService.getResearcherPropertiesForDAR($rootScope.currentUser.dacUserId).then(
                function (data) {
                    JSON.parse(data.completed);
                    $scope.formData.eraDate = data.eraDate;
                    $scope.eraExpirationCount = cmAuthenticateNihService.expirationCount(data.eraDate, data.eraExpiration);
                    $scope.formData.eraStatus = data.eraStatus;
                    $scope.formData.eraId = data.jti;
                    $scope.formData.eraLink = data.jti;
                    if (data.completed === 'true' && !persistDarInfo) {
                        $scope.formData.investigator = data.investigator;
                        $scope.formData.institution = data.institution;
                        $scope.formData.department = data.department;
                        $scope.formData.division = data.division;
                        $scope.formData.address1 = data.address1;
                        $scope.formData.address2 = data.address2;
                        $scope.formData.city = data.city;
                        $scope.formData.zipcode = data.zipcode;
                        $scope.formData.country = data.country;
                        $scope.formData.state = data.state;
                    }
                    if (data.completed !== undefined) {
                        $scope.completed = JSON.parse(data.completed);
                    }
                    if (persistDarInfo) {
                        retrieveTempDarInfo($scope.formData);
                    }
                });
        }

        $scope.$watch("form.step1.$valid", function (value1) {
            if ($state.current.url === "/step1?token") {
                $scope.step1isValidated = value1 && !!$scope.formData.eraStatus;
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
            $scope.url = gwasUrl;
        };

        function openResearchConsole() {
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
                    $state.go('researcher_console');
                }
                if (!value) {
                    $scope.problemSavingRequest = true;
                }
            });
        }


        function attestAndSave() {
            verifyCheckboxes();
            $scope.formData.userId = $rootScope.currentUser.dacUserId;
            if ($scope.formData.dar_code  !== undefined) {
                $scope.darAction = "edit";
                if ($scope.formData.eraStatus && $scope.eraExpirationCount !== 0 && $scope.step1isValidated !== false &&
                    $scope.step2isValidated !== false && $scope.step3isValidated !== false && $scope.atLeastOneCheckboxChecked !== false) {
                    openResearchConsole();
                } else {
                    $scope.showValidationMessages = true;
                }
            } else {
                $scope.darAction = "send";
                if ($scope.formData.eraStatus && $scope.eraExpirationCount !== 0 && $scope.step1isValidated &&
                    $scope.step2isValidated && $scope.step3isValidated && $scope.atLeastOneCheckboxChecked) {
                    $scope.showValidationMessages = false;
                    openResearchConsole();
                } else {
                    $scope.showValidationMessages = true;
                }
            }
        }

        function partialSave() {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/partial-dar-modals/save-confirmation-partial-dar.html',
                controller: 'PDarModalSaveConfirmation',
                controllerAs: 'PDarModalSaveConfirmation',
                scope: $scope
            });

            modalInstance.result.then(function () {
                $state.go('researcher_console');
            }, function () {
            });
        }

        function redirectToNihLogin() {
            var landingUrl = "http://mock-nih.dev.test.firecloud.org/link-nih-account/index.html?redirect-url=http://localhost:443/#/rp_application?token%3D%7Btoken%7D";
            $window.localStorage.setItem("tempDar", JSON.stringify($scope.formData));
            $window.location.href = landingUrl;
        }

        function getNihToken (token) {
            if (token && $window.localStorage.getItem("tempDar") !== null) {
                cmAuthenticateNihService.verifyNihToken(token, $rootScope.currentUser.dacUserId)
                .then(function(result) {
                    retrieveTempDarInfo(result);
                });
            }
        }

        $scope.deleteNihAccount = function () {
            cmAuthenticateNihService.eliminateAccount($rootScope.currentUser.dacUserId).then(function() {
                $window.localStorage.setItem("tempDar", JSON.stringify($scope.formData));
                $state.go('rp_application.step1', {persistInfo: true}, {reload:true});
            });
        };

        function retrieveTempDarInfo (result) {
            if ($window.localStorage.getItem("tempDar") !== null) {
                var tempDar = JSON.parse($window.localStorage.getItem("tempDar"));
                $window.localStorage.clear();
                $scope.formData = tempDar;
                $scope.formData.eraDate = result.eraDate === undefined ? null : result.eraDate;
                $scope.eraExpirationCount = cmAuthenticateNihService.expirationCount(result.eraDate, result.eraExpiration);
                $scope.formData.eraStatus = result.eraStatus;
                $scope.formData.eraId = result.jti;
                $scope.formData.eraLink = result.jti;
            }
        }

        function verifyCheckboxes() {

            if ($scope.formData.controls !== true &&
                $scope.formData.population !== true &&
                $scope.formData.diseases !== true &&
                $scope.formData.methods !== true &&
                $scope.formData.hmb !== true &&
                $scope.formData.poa !== true &&
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
