(function () {
    'use strict';

    angular.module('cmElection')
        .service('cmElectionService', cmElectionService);

    /* ngInject */
    function cmElectionService(DarElectionResource, ElectionReviewAccess, ElectionResource, ElectionUpdateResource, ElectionReviewedConsents, ElectionReviewedDRs, ElectionReviewConsent,openElectionsResource, ElectionReview,LastElectionReview ) {

        /**
         * Find data for the election related to the consentId sent as a parameter
         * @param consentId
         */
        function findElectionByConsentId(id){
            return ElectionResource.get({consentId: id});
        }

        /**
         * Find all data needed to display an election Review for a consent
         * @param consentId
         */
        function findElectionReviewByConsentId(id){
            return ElectionReviewConsent.get({consentId: id});
        }

        /**
         * Find all data needed to display an election Review for an specific election id
         * @param electionId
         */
        function findElectionReviewByElectionId(id){
            return ElectionReview.get({electionId: id});
        }

        /**
         * Find all data needed to display an election Review Access for an specific election id
         * @param electionId
         */
        function getReviewedAccess(id){
            return ElectionReviewAccess.get({electionId: id});
        }

        /**
         * Update the election with the id sent as a parameter
         * @param consentId
         * @param electionId
         */
        function updateElection(election){
            var postObject = new Object();
            postObject.finalVote = election.finalVote;
            postObject.status = election.status;
            postObject.finalRationale = election.finalRationale;
            return ElectionUpdateResource.update({consentId: election.referenceId, electionId: election.electionId}, postObject);
        }

        /**
         * Create election for the specified consent id
         * @param consentId
         * @param electionId
         */
        function createElection(consentId){
            var postElection = new Object();
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

        function openElections(){
            return openElectionsResource.get();
        }

        /**
         * Find closed elections for consents
         */
        function getReviewedConsents(){
            return ElectionReviewedConsents.List().$promise;
        }

        /**
         * Find closed elections for Data Requests
         */
        function getReviewedDRs(){
            return ElectionReviewedDRs.List().$promise;
        }

        /**
         * Find all data needed to display an election Review Access for an specific election id
         * @param electionId
         */
        function findLastElectionReviewByReferenceId(id){
            return LastElectionReview.get({electionId: id});
        }

        return{
            findDarElection: function(id) {
                return findElectionByDarId(id);
            },
            findElection: function(id) {
                return findElectionByConsentId(id);
            },
            findElectionReview: function(id) {
                return findElectionReviewByConsentId(id);
            },
            updateElection: function(election){
                return updateElection(election);
            },

            createElection: function(consentId){
                return createElection(consentId);
            },
            findReviewedConsents: function() {
                return getReviewedConsents();
            },
            findReviewedAccess: function(id) {
                return getReviewedAccess(id);
            },
            findReviewedDRs: function() {
                return getReviewedDRs();
            },
            openElections: function(){
                return openElections();
             },
            findLastElectionReviewByReferenceId: function(id){
                return findLastElectionReviewByReferenceId(id);
            },
            findReviewedElections: function(electionId){
                return findElectionReviewByElectionId(electionId);
        }
      }
    }

})();
