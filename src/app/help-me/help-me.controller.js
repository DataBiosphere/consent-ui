(function () {
    'use strict';

    angular.module('cmHelpMe')
        .controller('HelpMe', HelpMe);

    /* ngInject */
    function HelpMe($modal, $scope, $http) {

        $scope.reports = []; //declare an empty array
        $http.get("json/help_me.json").success(function(response){
            $scope.reports = response;  //ajax request to fetch data into $scope.data
        });

        var vm = this;

        vm.helpMeModal = helpMeModal;

        init();

        function init() {
        }

        function helpMeModal() {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/help-modal/help-modal.html',
                controller: 'HelpModal',
                controllerAs: 'HelpModal'
            });

            modalInstance.result.then(function () {
                init();
            }, function () {
            });
        }


    }
})();
