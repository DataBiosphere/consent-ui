(function () {
    'use strict';

    angular.module('cmHelpMe')
        .controller('HelpMe', HelpMe);

    /* ngInject */
    function HelpMe($modal, $scope, cmHelpMeReportService, $rootScope, cmAuthenticateService, USER_ROLES) {

        $scope.reports = []; //declare an empty array
        $scope.isAdmin = cmAuthenticateService.isAuthorized(USER_ROLES.admin, $rootScope.currentUser.roles);
         var vm = this;

        vm.helpMeModal = helpMeModal;

        init();

        function init() {
            cmHelpMeReportService.findHelpMeReports($rootScope.currentUser.dacUserId, vm);
        }

        function helpMeModal() {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/help-modal/help-modal.html',
                controller: 'HelpModal',
                controllerAs: 'HelpModal',
                resolve: {
                    report: {}
                }
            });

            modalInstance.result.then(function () {
                init();
            }, function () {
            });
        }


    }
})();
