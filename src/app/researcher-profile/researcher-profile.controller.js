(function () {

    'use strict';

    angular.module('cmResearcherProfile')
        .controller('ResearcherProfile', ResearcherProfile);

    /* ngInject */
    function ResearcherProfile($modal, $state, $scope, $rootScope,  cmResearcherService, cmAuthenticateNihService, $window, nihUrl) {
        var vm = this;
        var persistDarInfo = $state.params.persistInfo;
        vm.eraToken = $state.params.token !== undefined ? $state.params.token : null;
        getNihToken(vm.eraToken);
        vm.saveProfile = saveProfile;
        vm.update = update;
        vm.clearNotRelatedPIFields = clearNotRelatedPIFields;
        vm.clearNoHasPIFields = clearNoHasPIFields;
        vm.clearCommonsFields = clearCommonsFields;
        vm.submit = submit;
        vm.update = update;
        vm.redirectToNihLogin = redirectToNihLogin;
        $scope.formData = {};
        $scope.exists = false;
        $scope.formData.isThePI = true;
        $scope.showValidationMessages = false;
        init();

        function init(){
            if ($rootScope.currentUser !== undefined && $rootScope.currentUser.dacUserId !== null && !persistDarInfo) {
                $scope.formData = cmResearcherService.getPropertiesByResearcherId($rootScope.currentUser.dacUserId).then(
                    function (data) {
                        if (data.completed !== undefined) { $scope.exists = true;}
                        if (data.isThePI !== undefined) { data.isThePI = JSON.parse(data.isThePI);}
                        if (data.havePI !== undefined) { data.havePI = JSON.parse(data.havePI);}
                        if (data.eraStatus !== undefined) { data.eraStatus = JSON.parse(data.eraStatus);}
                        $scope.eraExpirationCount = cmAuthenticateNihService.expirationCount(data.eraDate, data.eraExpiration);
                        $scope.formData = data;
                        $scope.formData.nihUsername = data.nihUsername;

                        $scope.formData.profileName = $rootScope.currentUser.displayName;
                    });
            } else if (persistDarInfo) {
                retrieveTempDarInfo($scope.formData);
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

        function submit(){
             $scope.submit = true;
             $scope.userId = $rootScope.currentUser.dacUserId;
             if($scope.researcherForm.$valid){
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
             }else{
                $scope.showValidationMessages = true;
             }
        }

        function redirectToNihLogin() {
            var landingUrl = nihUrl + $window.location.href + "?token%3D%7Btoken%7D";
            $window.localStorage.setItem("tempDar", JSON.stringify($scope.formData));
            $window.location.href = landingUrl;
        }

        // This method intercepts nih token, validates it and stores it if its ok.
        // Will retrieve form's data before redirection using localStorage "tempDar" key.
        function getNihToken (token) {
            if (token && $window.localStorage.getItem("tempDar") !== null) {
                cmAuthenticateNihService.verifyNihToken(token, $rootScope.currentUser.dacUserId)
                    .then(function(result) {
                        retrieveTempDarInfo(result);
                    });
            }
        }

        // This method also retains form data when the page reloads to show era credentials ui effect after deleting ERA credentials.
        // In order to reload persisting info, a param for this purpose is passed in state.go.
        $scope.deleteNihAccount = function () {
            cmAuthenticateNihService.eliminateAccount($rootScope.currentUser.dacUserId).then(function() {
                $window.localStorage.setItem("tempDar", JSON.stringify($scope.formData));
                $state.go('researcher_profile', {persistInfo: true}, {reload:true});
            });
        };

        // Using local storage, this method retrieves form info data before any redirection from ERA Commons authentication
        // Used Local Storage is cleared after its use.
        function retrieveTempDarInfo (result) {
            if ($window.localStorage.getItem("tempDar") !== null) {
                var tempDar = JSON.parse($window.localStorage.getItem("tempDar"));
                $window.localStorage.clear();
                $scope.formData = tempDar;
                $scope.formData.eraDate = result.eraDate === undefined ? null : result.eraDate;
                $scope.eraExpirationCount = cmAuthenticateNihService.expirationCount(result.eraDate, result.eraExpiration);
                $scope.formData.eraStatus = result.eraStatus;
                $scope.formData.nihUsername = result.nihUsername;
            }
        }

        function clearNoHasPIFields(){
            clearPIData();
            clearCommonsFields();
        }

        function clearNotRelatedPIFields(){
            clearCommonsFields();
            $scope.formData.havePI = null;
            clearPIData();
        }

        function clearPIData(){
            $scope.formData.piName = null;
            $scope.formData.piEmail = null;
        }

        function clearCommonsFields(){
            $scope.formData.eRACommonsID = null;
            $scope.formData.pubmedID = null;
            $scope.formData.scientificURL = null;
        }

        function update(){
            $scope.formData.completed = true;
            cmResearcherService.updateResearcherProperties($scope.formData, $scope.userId, true);
        }
    }

})();
