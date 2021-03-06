(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('DulPreviewResults', DulPreviewResults);

    function DulPreviewResults($sce, apiUrl, $scope, $rootScope, $modal, $state, consent, cmFilesService, electionReview, cmConsentService) {
        $scope.hasAdminRole = $rootScope.hasRole($rootScope.userRoles.admin);
        $scope.consent = consent;
        $scope.election = electionReview.election;
        var showConsent = cmConsentService.getShowConsent();
        var dulName;
        if (typeof electionReview.election === 'undefined' || showConsent) {
            dulName = $scope.consent.dulName;
            $scope.dataUseLetter = $scope.consent.dataUseLetter;
            $scope.structuredDataUseLetter = $sce.trustAsHtml($scope.consent.translatedUseRestriction);

        } else {
            dulName = electionReview.election.dulName;
            $scope.dataUseLetter = electionReview.election.dataUseLetter;
            $scope.structuredDataUseLetter = $sce.trustAsHtml(electionReview.election.translatedUseRestriction);
        }
        $scope.consentName = consent.name;
        $scope.downloadUrl = apiUrl + 'consent/' + $scope.consent.consentId + '/dul';
        $scope.dulName = dulName;
        $scope.consentGroupName = $sce.trustAsHtml(consent.groupName);
        $rootScope.path = 'dul-preview-results';
        $scope.downloadDUL = function(){
            cmFilesService.getDULFile($scope.consent.consentId, $scope.consent.dulName);
        };

    }

})();
