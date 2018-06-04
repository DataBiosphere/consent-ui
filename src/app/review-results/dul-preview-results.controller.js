(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('DulPreviewResults', DulPreviewResults);

    function DulPreviewResults($sce, apiUrl, $scope, $rootScope, $modal, $state, consent, cmFilesService) {
        $scope.hasAdminRole = $rootScope.hasRole($rootScope.userRoles.admin);
        $scope.consent = consent;
        $scope.consentName = consent.name;
        $scope.downloadUrl = apiUrl + 'consent/' + $scope.consent.consentId + '/dul';
        $scope.dulName = $scope.consent.dulName;
        $scope.consentGroupName = consent.groupName;
        $scope.dataUseLetter = $scope.consent.dataUseLetter;
        $scope.structuredDataUseLetter = $sce.trustAsHtml($scope.consent.translatedUseRestriction);
        $rootScope.path = 'dul-preview-results';
        $scope.downloadDUL = function(){
            cmFilesService.getDULFile($scope.consent.consentId, $scope.consent.dulName);
        };

    }

})();
