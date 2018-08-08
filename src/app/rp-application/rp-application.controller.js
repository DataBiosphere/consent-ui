(function () {
    'use strict';

    angular.module('cmRPApplication')
        .controller('RPApplication', RPApplication);

    /* ngInject */
    function RPApplication($state, $scope, $modal, cmRPService, $rootScope, gwasUrl, cmResearcherService,  $window) {

        var vm = this;
        vm.$state = $state;
        vm.attestAndSave = attestAndSave;
        vm.partialSave = partialSave;
        $scope.showValidationMessages = false;
        $scope.atLeastOneCheckboxChecked = false;
        $scope.completed = true;
        $scope.openProfile = openProfile;
        $scope.linkedinAuth = linkedinAuth;
        init();

        function init(){
            $scope.formData = {};
            if ($rootScope.formData !== undefined && $rootScope.formData.userId !== undefined) {
                $scope.formData = $rootScope.formData;
                $rootScope.formData = {};
            }
            cmResearcherService.getResearcherPropertiesForDAR($rootScope.currentUser.dacUserId).then(
                function (data) {
                    JSON.parse(data.completed);
                    if(data.completed === 'true') {
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
                        if($scope.formData.dar_code  === undefined) {
                            $scope.showLinkedinProfile = true;
                            $scope.formData.linkedinProfile = data.linkedinProfile;
                            $scope.isLinkedinAuthorized = data.linkedinProfile ? true : false;  
                        } else {
                            $scope.isLinkedinAuthorized = true;
                            $scope.showLinkedinProfile =  $scope.formData.linkedinProfile ? true : false;  
                        }
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

        function openProfile() {
            $window.open($scope.formData.linkedinProfile,'_blank');
        }

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
                if ($scope.step1isValidated !== false && $scope.step2isValidated !== false && $scope.step3isValidated !== false && $scope.atLeastOneCheckboxChecked !== false) {
                    openResearchConsole();
                } else {
                    $scope.showValidationMessages = true;
                }
            }else{
                $scope.darAction = "send";
                if ($scope.step1isValidated && $scope.step2isValidated && $scope.step3isValidated && $scope.atLeastOneCheckboxChecked) {
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

        $scope.removeLinkedinProfile = function() {
            $scope.isLinkedinAuthorized = false;
            $scope.formData.linkedinProfile = undefined;
        };

        // Handle the successful return from the API call
        function onSuccess(data) {
            $scope.formData.linkedinProfile = data.publicProfileUrl;
            $scope.$apply(
                $scope.isLinkedinAuthorized = true
            );
        }  

        // Use the API call wrapper to request the member's basic profile data
        function getProfileData() {
            IN.API.Raw("/people/~:(public-profile-url)").result(onSuccess).error(onError);
        }

        // Handle an error response from the API call
        function onError() {
            $scope.formData.linkedinProfile = undefined;
        }

        function linkedinAuth() {
            IN.UI.Authorize().params({ "scope": ["r_basicprofile", "r_emailaddress"] }).place();
            IN.Event.on(IN, "auth", getProfileData);
        }
    }

})();
