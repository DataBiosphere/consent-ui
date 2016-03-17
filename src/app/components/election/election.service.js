(function () {
    'use strict';

    angular.module('cmElection')
        .service('cmElectionService', cmElectionService);

    /* ngInject */
    function cmElectionService(apiUrl, $http, RPElectionReviewResource, DarElectionResource, ElectionReviewResource, ElectionResource, ElectionUpdateResource, ElectionReviewedConsents, ElectionReviewedDRs, openElectionsResource, ElectionReview, LastElectionReview, DataAccessElectionReviewResource, DataSetElection) {

        /**
         * Find data for the election related to the consentId sent as a parameter
         * @param consentId
         */
        function findElectionByConsentId(id) {
            return ElectionResource.get({consentId: id});
        }

        function findElectionReviewByReferenceId(id, type) {
            return ElectionReviewResource.get({referenceId: id, type: type});

        }

        function findDataAccessElectionReview(id, isFinalAccess) {
            return DataAccessElectionReviewResource.get({electionId: id, isFinalAccess: isFinalAccess});
        }

        function findRPElectionReview(id, isFinalAccess) {
            return RPElectionReviewResource.get({electionId: id, isFinalAccess: isFinalAccess});
        }

        /**
         * Find all data needed to display an election Review for an specific election id
         * @param electionId
         */
        function findElectionReviewByElectionId(id) {
            return ElectionReview.get({electionId: id});
        }

        /**
         * Update the election with the id sent as a parameter
         * @param consentId
         * @param electionId
         */
        function updateElection(election) {
            var postObject = {};
            postObject.finalVote = election.finalVote;
            postObject.status = election.status;
            postObject.finalRationale = election.finalRationale;
            return ElectionUpdateResource.update({electionId: election.electionId}, postObject);
        }

        /**
         * Find the election with the id sent as a parameter
         * @param electionId
         */
        function getElectionById(electionId) {
            return ElectionUpdateResource.get({electionId: electionId});
        }

        /**
         * Create election for the specified consent id
         * @param consentId
         * @param electionId
         */
        function createElection(consentId) {
            var postElection = {};
            postElection.status = 'Open';
            return ElectionResource.post({consentId: consentId}, postElection);
        }

        /**
         * Find data for the election related to the requestId sent as a parameter
         * @param consentId
         */
        function findElectionByDarId(id) {
            return DarElectionResource.get({requestId: id}).$promise;
        }

        /**
         * Create election for the specified data access request
         * @param consentId
         */
        function createDARElection(requestId) {
            var postElection = {};
            postElection.status = 'Open';
            postElection.finalAccessVote = false;
            return DarElectionResource.post({requestId: requestId}, postElection);
        }

        /**
         * Find the related datasets owner votes for an election.
         * @param consentId
         */
        function downloadDatasetVotesForDARElection(requestId) {
            $http({
                url: apiUrl+"dataRequest/"+requestId+"/election/dataSetVotes",
                method: "GET"
            }).
                success(function(data) {
                    var blob = new Blob([data], {type: 'text/plain'});
                    if(blob.size !== 0){
                        var downloadElement = angular.element('<a/>');
                        downloadElement.css({display: 'none'});
                        angular.element(document.body).append(downloadElement);
                        downloadElement.attr({
                            href: (window.URL || window.webkitURL).createObjectURL(blob),
                            target: '_blank',
                            download: 'datasetVotesSummary.txt'
                        })[0].click();
                    }
                });
        }

        function openElections() {
            return openElectionsResource.get();
        }

        /**
         * Find closed elections for consents
         */
        function getReviewedConsents() {
            return ElectionReviewedConsents.List().$promise;
        }

        /**
         * Find closed elections for Data Requests
         */
        function getReviewedDRs() {
            return ElectionReviewedDRs.List().$promise;
        }

        /**
         * Find all data needed to display an election Review Access for an specific election id
         * @param electionId
         */
        function findLastElectionReviewByReferenceId(id) {
            return LastElectionReview.get({electionId: id});
        }


        function isDataSetElectionOpen() {
            return DataSetElection.get();
        }

        return {
            findElectionById: function(electionId){
                return getElectionById(electionId);
            },
            findDarElection: function (id) {
                return findElectionByDarId(id);
            },
            downloadDatasetVotesForDARElection: function(requestId) {
                return downloadDatasetVotesForDARElection(requestId);
            },
            findElection: function (id) {
                return findElectionByConsentId(id);
            },
            findElectionReview: function (referenceId, type) {
                return findElectionReviewByReferenceId(referenceId, type);
            },

            findDataAccessElectionReview: function (referenceId, isFinalAccess) {
                return findDataAccessElectionReview(referenceId, isFinalAccess);
            },
            findRPElectionReview: function (referenceId, isFinalAccess) {
                return findRPElectionReview(referenceId, isFinalAccess);
            },
            updateElection: function (election) {
                return updateElection(election);
            },

            createElection: function (consentId) {
                return createElection(consentId);
            },
            findReviewedConsents: function () {
                return getReviewedConsents();
            },

            findReviewedDRs: function () {
                return getReviewedDRs();
            },
            openElections: function () {
                return openElections();
            },
            findLastElectionReviewByReferenceId: function (id) {
                return findLastElectionReviewByReferenceId(id);
            },
            findReviewedElections: function (electionId) {
                return findElectionReviewByElectionId(electionId);
            },
            createDARElection: function (requestId) {
                return createDARElection(requestId);
            },
            isDataSetElectionOpen: function(){
                return isDataSetElectionOpen();
            }
        };
    }

})();
