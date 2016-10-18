(function () {
    'use strict';

    angular.module('cmReviewedCases')
        .controller('ReviewedCases', ReviewedCases);

    /* ngInject */
    function ReviewedCases(reviewedConsents, reviewedDRs, $scope, $rootScope, $stateParams) {

        var vm = this;
        vm.electionsList = {'dul': [], 'access': []};
        
        if($stateParams.menu !== true && $rootScope.currentDulPage !== undefined){
             $scope.currentDulPage = $rootScope.currentDulPage;
             $rootScope.currentDulPage = 1;
        } else{
            $rootScope.currentDulPage = 1;
            $scope.currentDulPage = $rootScope.currentDulPage; 
        }
        
        $scope.$watch('currentDulPage', function(num) {
            $rootScope.currentDulPage = num;
        });
        
        if($stateParams.menu !== true && $rootScope.currentDarPage !== undefined){
             $scope.currentDarPage = $rootScope.currentDarPage;
             $rootScope.currentDarPage = 1;
        } else{
            $rootScope.currentDarPage = 1;
            $scope.currentDarPage = $rootScope.currentDarPage; 
        }
        
        $scope.$watch('currentDarPage', function(num) {
            $rootScope.currentDarPage = num;
        });

        init();

        function init() {
            vm.electionsList.dul = transformElectionResultData(reviewedConsents);
            vm.electionsList.access = transformElectionResultData(reviewedDRs);

        }
    }

    // We need to transform the result data to a string to be able to filter results
    function transformElectionResultData(collection) {
        var dup_array = collection.slice();
        for (var i = 0; i < dup_array.length; i++) {
            if (dup_array[i].finalVote === true) {
                dup_array[i].finalVoteString = 'Yes';
            } else {
                dup_array[i].finalVoteString = 'No';
            }
        }
        return dup_array;
    }

})();
