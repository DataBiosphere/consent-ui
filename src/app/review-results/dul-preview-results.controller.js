(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('DulPreviewResults', DulPreviewResults);

    function DulPreviewResults($sce, apiUrl, $scope, $rootScope, $modal, $state, consent, cmFilesService) {
        $scope.hasAdminRole = $rootScope.hasAdminRole;
        $scope.consent = consent;
        $scope.downloadUrl = apiUrl + 'consent/' + $scope.consent.consentId + '/dul';
        $scope.dulName = $scope.consent.dulName;
        $scope.dataUseLetter = $scope.consent.dataUseLetter;
        $scope.structuredDataUseLetter = $sce.trustAsHtml($scope.consent.translatedUseRestriction);
        $scope.downloadDUL = function(){
            cmFilesService.getDULFile($scope.consent.consentId, $scope.consent.dulName);
        };

    }

})();
