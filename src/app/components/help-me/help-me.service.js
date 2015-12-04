(function () {
    'use strict';

    angular.module('cmHelpMeReport')
        .service('cmHelpMeReportService', cmHelpMeReportService);

    /* ngInject */
    function cmHelpMeReportService(HelpMeResource, HelpMeCreateResource) {

        function findHelpMeReports(userId, vm) {
            return HelpMeResource.List({userId: userId}).$promise.then(
                function (data){
                    vm.reports = data;
                }
            );
        }

        function createHelpMeReport(report) {
            return HelpMeCreateResource.post(report);

        }
        return {
            findHelpMeReports: function (userId, vm) {
                return findHelpMeReports(userId, vm);
            },
            createHelpMeReport: function (report) {
                return createHelpMeReport(report);
            }
        };
    }

})();
