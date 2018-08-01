(function () {
    'use strict';

    angular.module('cmRPApplication')
        .controller('RPApplication', RPApplication);

    /* ngInject */
    function RPApplication($state, $scope, $modal, cmRPService, $rootScope, gwasUrl, cmResearcherService, cmAuthenticateNihService, $window, $stateParams) {
        var vm = this;
        // vm.token = $state.params.token();
        vm.token = $state.params.token !== undefined ? $state.params.token : null;
        vm.attestAndSave = attestAndSave;
        vm.partialSave = partialSave;
        vm.redirectToNihLogin = redirectToNihLogin;
        $scope.showValidationMessages = false;
        $scope.atLeastOneCheckboxChecked = false;
        $scope.completed = true;
        vm.nihService= cmAuthenticateNihService;
        init();

        function init(){
            console.log("llamando a INIT");
            getNihToken(vm.token);
            $scope.formData = {};
            if ($rootScope.formData !== undefined && $rootScope.formData.userId !== undefined) {
                $scope.formData = $rootScope.formData;
                $rootScope.formData = {};
            }

            cmResearcherService.getResearcherPropertiesForDAR($rootScope.currentUser.dacUserId).then(
                function (data) {
                    JSON.parse(data.completed);
                    $scope.formData.eraDate = data.eraDate;
                    $scope.eraExpirationCount = cmAuthenticateNihService.expirationCount(data.eraDate, data.eraExpiration);
                    $scope.formData.eraStatus = $scope.eraExpirationCount !== 0;
                    $scope.formData.eraId = "leouuuu";
                    $scope.formData.eraLink = "link.bla";
                    if (data.completed === 'true') {
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
                    if(data.completed !== undefined){
                        $scope.completed = JSON.parse(data.completed);
                    }
                });
        }

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
            if($scope.formData.dar_code  !== undefined) {
                $scope.darAction = "edit";
                if ($scope.eraExpirationCount !== 0 && $scope.step1isValidated !== false && $scope.step2isValidated !== false && $scope.step3isValidated !== false && $scope.atLeastOneCheckboxChecked !== false) {
                    openResearchConsole();
                } else {
                    $scope.showValidationMessages = true;
                }
            }else{
                $scope.darAction = "send";
                if ($scope.eraExpirationCount !== 0 && $scope.step1isValidated && $scope.step2isValidated && $scope.step3isValidated && $scope.atLeastOneCheckboxChecked) {
                    $scope.showValidationMessages = false;
                    openResearchConsole();
                } else {
                    $scope.showValidationMessages = true;
                }
            }
        }

        function partialSave(){
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
            var landingUrl = "http://mock-nih.dev.test.firecloud.org/link-nih-account/index.html?redirect-url=http://localhost:443/#/rp_application/nih?token%3D%7Btoken%7D";
            $window.location.href = landingUrl;
        }

        function getNihToken (token) {
            if (token) {
                console.log("token recibido ", token);
                var eraProperties = {};
                var registerDate = new Date();

                eraProperties.eraToken = token;
                eraProperties.eraDate = registerDate.getTime();
                eraProperties.eraExpiration = new Date().setDate(registerDate.getDate() + 30);

                cmResearcherService.verifyNihToken(eraProperties, $rootScope.currentUser.dacUserId).then(
                        function(resolve) {
                            console.log("ok", resolve);
                        },
                        function(reject) {
                            console.log("not ok", reject);
                        }
                    );
                    $state.go('rp_application.step1');
                // return true;
            }
        }

        $scope.deleteNihAccount = function () {
            console.log("delete!!!!!");
            cmAuthenticateNihService.eliminateAccount($rootScope.currentUser.dacUserId).then(function() {
                $state.go('rp_application.step1', {}, {reload:true});
            });
        };

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
