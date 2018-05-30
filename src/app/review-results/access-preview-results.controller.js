(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('AccessPreviewResults', AccessPreviewResults);

    function AccessPreviewResults($sce, $scope, $rootScope, $modal, $state, cmElectionService, cmLoginUserService, dar, rp, dar_id, consent, apiUrl, cmRPService, cmFilesService, request) {

        $scope.hasAdminRole = $rootScope.hasRole($rootScope.userRoles.admin);
        $scope.dar = dar;
        $scope.request = request;
        $scope.rus = dar.rus;
        $scope.dar_id = dar_id;
        $scope.consent = consent;
        $scope.consentName = consent.name;
        $scope.dataUseLetter = $scope.consent.dataUseLetter;
        $scope.downloadUrl = apiUrl + 'consent/' + $scope.consent.consentId + '/dul';
        $scope.dulName = $scope.consent.dulName;
        $rootScope.path = 'access-preview-results';
        $scope.downloadDUL = function(){
            cmFilesService.getDULFile($scope.consent.consentId, $scope.consent.dulName);
        };

        if ($scope.consent.requiresManualReview) {
            $scope.rp = "This includes sensitive research objectives that requires manual review.";
        } else {
            $scope.rp = $sce.trustAsHtml(rp.translated_restriction);
        }
        $scope.back = function() {
            if($rootScope.pathFrom === 'admin_manage_access') {
                $state.go('admin_manage_access');
            } else if($rootScope.pathFrom === 'chair_onsole') {
                $state.go('chair_onsole');
            }
            $rootScope.pathFrom = undefined;
        };
        var vm = this;
        vm.openApplication = openApplication;
        function openApplication() {
            $scope.dataRequestId = dar_id;
            $scope.electionStatus = 'Open';
            $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/application-summary-modal.html',
                controller: 'ApplicationModal',
                controllerAs: 'ApplicationModal',
                scope: $scope,
                resolve: {
                    darDetails: function () {
                        return cmRPService.getDarModalSummary(dar_id);
                    },
                    dar_id: function(){
                        return dar_id;
                    },
                    calledFromAdmin: function() {
                        // return false;
                        return $rootScope.hasRole($rootScope.userRoles.admin);
                    }
                }
            });
        }

    }
})();
