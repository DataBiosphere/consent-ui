(function () {
    'use strict';

    angular.module('cmEmail', [])
        .factory('SendReminderEmail', function($resource, apiUrl){
            return $resource(apiUrl+"emailNotifier/reminderMessage/:voteId", {}, {
                post: {method: 'POST', params: {voteId: '@voteId'}}
            });});
})();
