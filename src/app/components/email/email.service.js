(function () {
    'use strict';

    angular.module('cmEmail')
        .service('cmEmailService', cmEmailService);

    /* ngInject */
    function cmEmailService(SendReminderEmail) {

        /**
         * Send the email reminder to the owner of the vote identified by the id.
         * @param vote, with the voteId included
         */
        function sendReminderEmail(voteId){
            return SendReminderEmail.post({voteId: voteId});
        }

        return{
            sendReminderEmail: function(vote){
                return sendReminderEmail(vote);
            }
        };
    }

})();
