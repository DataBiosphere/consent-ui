(function () {
    'use strict';

    angular.module('cmElectionTimeout')
        .service('cmElectionTimeoutService', cmElectionTimeoutService);

    /* ngInject */
    function cmElectionTimeoutService(ApprovalExpirationTimeResource, ApprovalExpirationTimeUpdateResource) {

        function findApprovalExpirationTime() {
            return ApprovalExpirationTimeResource.get();
        }

        function updateApprovalExpirationTime(approvalExpirationTime) {
            return ApprovalExpirationTimeUpdateResource.update({id: approvalExpirationTime.id}, approvalExpirationTime);
        }

        function createApprovalExpirationTime(approvalExpirationTime) {
            return ApprovalExpirationTimeResource.post(approvalExpirationTime);
        }

        return {
            findApprovalExpirationTime: function(){
              return findApprovalExpirationTime();
            },
            updateApprovalExpirationTime: function (approvalExpirationTime) {
                return updateApprovalExpirationTime(approvalExpirationTime);
            },
            createApprovalExpirationTime: function (approvalExpirationTime) {
                return createApprovalExpirationTime(approvalExpirationTime);
            }
        };
    }

})();
