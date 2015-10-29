(function () {
    'use strict';

    angular.module('cmPendingCase')
        .service('cmPendingCaseService', cmPendingCaseService);

    /* ngInject */
    function cmPendingCaseService(DataRequestPendingCases, ConsentPendingCases, ConsentSummaryCases, DataRequestSummaryCases, ConsentSummaryFile) {

        /**
         * Finding data request pending cases for the specified user id
         * @param userId
         * @param lists
         * @param vm
         */
        function findDataRequestPendingCasesByUser(userId, vm){
            DataRequestPendingCases.List({userId: userId}).$promise.then(
                function(data){
                    vm.electionsList['access'] = data;
                    vm.electionsList['access'].forEach(
                        function countCollectVotes(access) {
                            if (access.alreadyVoted == false) {
                                vm.totalAccessPendingVotes += 1;
                            }
                        }
                    );
                });
         }
        /**
         * Finding consent pending cases  for the specified user id
         * @param userId
         * @param lists
         * @param vm
         */
        function findConsentPendingCasesByUser(userId, vm){
            ConsentPendingCases.List({userId: userId}).$promise.then(
                function(data) {
                    vm.electionsList['dul'] = data;
                    vm.electionsList['dul'].forEach(
                        function countCollectVotes(dul) {
                            if (dul.alreadyVoted == false) {
                                vm.totalDulPendingVotes += 1;
                            }
                        }
                    );
                });
        }

        /**
         * Finding consent summary
         */
        function findSummary(data, vm){
          ConsentSummaryCases.get().$promise.then(function(access) {
                // reviewed cases
                data['dulTotal'][1][1] = access.reviewedPositiveCases + access.reviewedNegativeCases;
                // pending cases
                data['dulTotal'][2][1] = access.pendingCases;
                // positive cases
                data['dulReviewed'][1][1] = access.reviewedPositiveCases;
                // negative cases
                data['dulReviewed'][2][1] = access.reviewedNegativeCases;
                // find data request summary
                DataRequestSummaryCases.get({type: "DataAccess"}).$promise.then(function(dul) {
                    // reviewed cases
                    data['accessTotal'][1][1] = dul.reviewedPositiveCases + dul.reviewedNegativeCases;
                    // pending cases
                    data['accessTotal'][2][1] = dul.pendingCases;
                    // positive cases
                    data['accessReviewed'][1][1] = dul.reviewedPositiveCases;
                    // negative cases
                    data['accessReviewed'][2][1] = dul.reviewedNegativeCases;
                    DataRequestSummaryCases.get({type: "RP"}).$promise.then(function(rp) {
                        // reviewed cases
                        data['RPTotal'][1][1] = rp.reviewedPositiveCases + rp.reviewedNegativeCases;
                        // pending cases
                        data['RPTotal'][2][1] = rp.pendingCases;
                        // positive cases
                        data['RPReviewed'][1][1] = rp.reviewedPositiveCases;
                        // negative cases
                        data['RPReviewed'][2][1] = rp.reviewedNegativeCases;
                        vm.chartData = data;

                    });

                });

            });
        }


        return{
            findDataRequestPendingCasesByUser: function(userId, vm) {
                return findDataRequestPendingCasesByUser(userId, vm);
            },
            findConsentPendingCasesByUser: function(userId, vm){
                return findConsentPendingCasesByUser(userId, vm);
            },
            findSummary: function(data, vm){
                return findSummary(data, vm);
            }
        }
    }

})();
