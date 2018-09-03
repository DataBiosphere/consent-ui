(function () {

    'use strict';

    angular.module('cmResearcherProfile')
        .controller('ResearcherProfile', ResearcherProfile);

    /* ngInject */
    function ResearcherProfile($modal, $state, $scope, $rootScope, cmResearcherService, $window) {
        var vm = this;
        vm.saveProfile = saveProfile;
        vm.update = update;
        vm.clearNotRelatedPIFields = clearNotRelatedPIFields;
        vm.clearNoHasPIFields = clearNoHasPIFields;
        vm.clearCommonsFields = clearCommonsFields;
        vm.submit = submit;
        vm.openProfile = openProfile;
        $scope.formData = {};
        $scope.exists = false;
        $scope.formData.isThePI = true;
        $scope.showValidationMessages = false;
        $scope.linkedinAuth = linkedinAuth;
        $scope.isLinkedinAuthorized = false;

        init();

        function init() {
            if ($rootScope.currentUser !== undefined && $rootScope.currentUser.dacUserId !== null) {
                $scope.formData = cmResearcherService.getPropertiesByResearcherId($rootScope.currentUser.dacUserId).then(
                    function (data) {
                        if (data.completed !== undefined) { $scope.exists = true; }
                        if (data.isThePI !== undefined) { data.isThePI = JSON.parse(data.isThePI); }
                        if (data.havePI !== undefined) { data.havePI = JSON.parse(data.havePI); }
                        if (data.completed !== undefined) { data.completed = JSON.parse(data.completed); }
                        if (data.linkedinProfile !== undefined) { $scope.isLinkedinAuthorized = true; }
                        $scope.formData = data;
                        $scope.formData.profileName = $rootScope.currentUser.displayName;

                    });
            }
        }

        function saveProfile() {
            $scope.submit = false;
            $scope.userId = $rootScope.currentUser.dacUserId;
            $scope.completed = false;
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/save-profile-modal/save-profile-modal.html',
                controller: 'SaveProfileModal',
                controllerAs: 'SaveProfileModal',
                scope: $scope
            });

            modalInstance.result.then(function () {
                $state.go('dataset_catalog');
            }, function () {
            });
        }

        function submit() {
            $scope.submit = true;
            $scope.userId = $rootScope.currentUser.dacUserId;
            if ($scope.researcherForm.$valid) {
                $scope.completed = true;
                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'app/modals/save-profile-modal/save-profile-modal.html',
                    controller: 'SaveProfileModal',
                    controllerAs: 'SaveProfileModal',
                    scope: $scope
                });
                modalInstance.result.then(function () {
                    $state.go('dataset_catalog');
                }, function () {
                });
            } else {
                $scope.showValidationMessages = true;
            }
        }

        function clearNoHasPIFields() {
            clearPIData();
            clearCommonsFields();
        }

        function clearNotRelatedPIFields() {
            clearCommonsFields();
            $scope.formData.havePI = null;
            clearPIData();
        }

        function clearPIData() {
            $scope.formData.piName = null;
            $scope.formData.piEmail = null;
        }

        function clearCommonsFields() {
            $scope.formData.eRACommonsID = null;
            $scope.formData.pubmedID = null;
            $scope.formData.scientificURL = null;
        }

        function update() {
            $scope.formData.completed = true;
            cmResearcherService.updateResearcherProperties($scope.formData, $scope.userId, true);
        }

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

        function openProfile() {
            $window.open($scope.formData.linkedinProfile,'_blank');
        }

        $scope.removeLinkedinProfile = function() {
            $scope.isLinkedinAuthorized = false;
            $scope.formData.linkedinProfile = undefined;
        };
    }

})();
