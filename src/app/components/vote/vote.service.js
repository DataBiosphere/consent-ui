(function () {
    'use strict';

    angular.module('cmVote')
        .service('cmVoteService', cmVoteService);

    /* ngInject */
    function cmVoteService(VoteResource, GetAllVotesResource, DarVoteResource) {

        /**
         * Find all votes for the election related to the consentId sent as a parameter
         * @param consentId
         */
        function findAllVotesByConsentId(id){
            return GetAllVotesResource.query({consentId: id}).$promise;
        }

        /**
         * Find a vote for the election related to the consentId sent as a parameter
         * @param consentId(referenceId)
         * @param voteId
         */
        function findVote(referenceId, voteId){
            return VoteResource.get({consentId: referenceId, voteId: voteId}).$promise;
        }

        /**
         * Find a vote for the election related to the requestId sent as a parameter
         * @param requestId(Data Access Request ID)
         * @param voteId
         */
        function findDarVote(referenceId, voteId){
            return DarVoteResource.get({requestId: referenceId, voteId: voteId}).$promise;
        }

        /**
         * Update the vote with the id sent as a parameter
         * @param vote, with the voteId included
         */
        function putVote(consentId, vote){
            var postObject = {};
            postObject.vote = vote.vote;
            postObject.dacUserId = vote.dacUserId;
            postObject.rationale = vote.rationale;
            return VoteResource.update({consentId: consentId, voteId: vote.voteId}, postObject);
        }

        /**
         * Update the vote with the id sent as a parameter
         * @param vote, with the voteId included
         */
        function putDarVote(requestId, vote){
            var postObject = {};
            postObject.vote = vote.vote;
            postObject.dacUserId = vote.dacUserId;
            postObject.rationale = vote.rationale;
            return DarVoteResource.update({requestId: requestId, voteId: vote.voteId}, postObject);
        }

        /**
         * Post the vote with the id sent as a parameter
         * @param vote, with the voteId included
         */
        function postVote(consentId, vote){
            var postObject = {};
            postObject.vote = vote.vote;
            postObject.dacUserId = vote.dacUserId;
            postObject.rationale = vote.rationale;
            return VoteResource.post({consentId: consentId, voteId: vote.voteId}, postObject);
        }

        /**
         * Post the vote with the id sent as a parameter
         * @param vote, with the voteId included
         */
        function postDarVote(requestId, vote){
            var postObject = {};
            postObject.vote = vote.vote;
            postObject.dacUserId = vote.dacUserId;
            postObject.rationale = vote.rationale;
            return DarVoteResource.post({requestId: requestId, voteId: vote.voteId}, postObject);
        }

        return{
            getAllVotes: function(id){
                return findAllVotesByConsentId(id);
            },
            getVote: function(referenceId, voteId){
                return findVote(referenceId, voteId);
            },
            postVote: function(consentId, vote){
                return postVote(consentId, vote);
            },
            updateVote: function(consentId, vote){
                return putVote(consentId, vote);
            },
            getDarVote: function(referenceId, voteId){
                return findDarVote(referenceId, voteId);
            },
            postDarVote: function(consentId, vote){
                return postDarVote(consentId, vote);
            },
            updateDarVote: function(consentId, vote){
                return putDarVote(consentId, vote);
            }
        };
    }

})();
